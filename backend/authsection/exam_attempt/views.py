from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import timedelta

from dashboard.models import Exam, Question
from .models import ExamAttempt, Answer, MalpracticeLog
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
from django.utils.html import strip_tags

User = get_user_model()


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def start_exam(request, exam_id):

    exam = Exam.objects.get(id=exam_id)

    now = timezone.now()

    unlock_time = exam.start_time - timedelta(minutes=10)

    if now < unlock_time:
        return Response(
            {"error": "Exam not yet available"},
            status=status.HTTP_403_FORBIDDEN
        )

    attempts = ExamAttempt.objects.filter(
        student=request.user,
        exam=exam,
        submitted=False
    )
    
    if attempts.exists():
        attempt = attempts.first()
        created = False
    else:
        attempt = ExamAttempt.objects.create(
            student=request.user,
            exam=exam,
            submitted=False
        )
        created = True

    questions = exam.questions.all()

    # Get previously saved answers
    saved_answers = {}
    if not created:
        for ans in attempt.answers.all():
            saved_answers[ans.question.id] = ans.selected_answer

    return Response({
        "attempt_id": attempt.id,
        "exam": exam.name,
        "start_time": exam.start_time,
        "end_time": exam.end_time,
        "saved_answers": saved_answers,
        "questions": [
            {
                "id": q.id,
                "text": q.question_text,
                "a": q.option_a,
                "b": q.option_b,
                "c": q.option_c,
                "d": q.option_d,
            }
            for q in questions
        ]
    })

# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def start_exam(request, exam_id):

#     exam = Exam.objects.get(id=exam_id)

#     attempt = ExamAttempt.objects.create(
#         student=request.user,
#         exam=exam
#     )

#     questions = exam.questions.all()

#     return Response({
#         "attempt_id": attempt.id,
#         "exam": exam.name,
#         "questions": [
#             {
#                 "id": q.id,
#                 "text": q.question_text,
#                 "a": q.option_a,
#                 "b": q.option_b,
#                 "c": q.option_c,
#                 "d": q.option_d,
#             }
#             for q in questions
#         ]
#     })
    
    
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def save_answer(request, attempt_id):
    try:
        attempt = ExamAttempt.objects.get(id=attempt_id, student=request.user)
    except ExamAttempt.DoesNotExist:
        return Response({"error": "Attempt not found"}, status=status.HTTP_404_NOT_FOUND)
        
    if attempt.submitted:
        return Response({"error": "Exam already submitted"}, status=status.HTTP_400_BAD_REQUEST)
        
    question_id = request.data.get("question_id")
    selected_answer = request.data.get("selected")
    
    try:
        question = Question.objects.get(id=question_id)
    except Question.DoesNotExist:
        return Response({"error": "Question not found"}, status=status.HTTP_404_NOT_FOUND)
        
    is_correct = (question.correct_answer == selected_answer)
    
    # Update or create answer
    ans, created = Answer.objects.update_or_create(
        attempt=attempt,
        question=question,
        defaults={
            "selected_answer": selected_answer,
            "is_correct": is_correct
        }
    )
    
    return Response({"message": "Answer saved"})
    
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def submit_exam(request, attempt_id):

    attempt = ExamAttempt.objects.get(id=attempt_id, student=request.user)

    if attempt.submitted:
        return Response({"error": "Exam already submitted"}, status=status.HTTP_400_BAD_REQUEST)

    score = 0
    for ans in attempt.answers.all():
        if ans.is_correct:
            score += ans.question.marks

    attempt.score = score
    attempt.submitted = True
    attempt.save()

    return Response({
        "message": "Exam submitted successfully"
    })
    
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def exams_list(request):
    exams = Exam.objects.filter(is_published=True).order_by("-id")

    response_data = []
    for e in exams:
        is_submitted = ExamAttempt.objects.filter(student=request.user, exam=e, submitted=True).exists()
        response_data.append({
            "id": e.id,
            "name": e.name,
            "start_time": e.start_time,
            "end_time": e.end_time,
            "is_submitted": is_submitted
        })

    return Response(response_data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def student_results(request, student_id):
    if not request.user.is_superuser:
        return Response({"error": "Only admin allowed"}, status=403)

    try:
        student = User.objects.get(id=student_id)
    except User.DoesNotExist:
        return Response({"error": "Student not found"}, status=404)

    from django.db.models import Q
    if student.course:
        exams = Exam.objects.filter(Q(is_for_all=True) | Q(course=student.course))
    else:
        exams = Exam.objects.filter(is_for_all=True)

    results = []
    for exam in exams:
        # Prioritize submitted attempts and the most recent ones
        attempt = ExamAttempt.objects.filter(student=student, exam=exam).order_by("-submitted", "-id").first()
        
        if attempt:
            if attempt.submitted:
                status_text = "Submitted"
                score = attempt.score
            else:
                status_text = "In Progress"
                score = 0
        else:
            status_text = "Not Attended"
            score = 0

        results.append({
            "exam_name": exam.name,
            "total_marks": exam.total_marks,
            "score": score,
            "status": status_text
        })

    return Response(results)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def publish_results(request, exam_id):
    if not request.user.is_superuser:
        return Response({"error": "Only admin allowed"}, status=403)

    try:
        exam = Exam.objects.get(id=exam_id)
    except Exam.DoesNotExist:
        return Response({"error": "Exam not found"}, status=404)

    # Get all submitted attempts for this exam
    attempts = ExamAttempt.objects.filter(exam=exam, submitted=True)
    
    if not attempts.exists():
        return Response({"message": "No submitted attempts to publish."}, status=200)

    for attempt in attempts:
        student = attempt.student
        if not student.email:
            continue

        subject = f"Your Results for {exam.name}"
        html_message = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 10px; border: 1px solid #e0e0e0;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="color: #2c3e50;">Exam Results Published!</h2>
            </div>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <p style="font-size: 16px; color: #333;">Hi <strong>{student.first_name} {student.last_name}</strong>,</p>
                <p style="font-size: 16px; color: #333;">Your results for the recent exam have been published. Here are the details:</p>
                
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; color: #555;"><strong>Exam Name:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">{exam.name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; color: #555;"><strong>Start Time:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">{exam.start_time.strftime('%Y-%m-%d %H:%M')}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; color: #555;"><strong>End Time:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">{exam.end_time.strftime('%Y-%m-%d %H:%M')}</td>
                    </tr>
                </table>
                
                <div style="text-align: center; margin-top: 30px; padding: 15px; background-color: #e8f4f8; border-radius: 8px;">
                    <h3 style="margin: 0; color: #2980b9; font-size: 24px;">Your Score</h3>
                    <p style="margin: 10px 0 0 0; font-size: 32px; font-weight: bold; color: #2c3e50;">{attempt.score} / {exam.total_marks}</p>
                </div>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #7f8c8d; font-size: 12px;">
                <p>This is an automated message from your Onscreen Monitoring System.</p>
            </div>
        </div>
        """
        plain_message = strip_tags(html_message)
        
        send_mail(
            subject=subject,
            message=plain_message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[student.email],
            fail_silently=True,
            html_message=html_message
        )

    return Response({"message": "Results published to students successfully!"})

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def log_malpractice(request, attempt_id):
    try:
        attempt = ExamAttempt.objects.get(id=attempt_id, student=request.user)
    except ExamAttempt.DoesNotExist:
        return Response({"error": "Attempt not found"}, status=404)
        
    description = request.data.get("description", "Unknown Malpractice")
    screenshot = request.data.get("screenshot", "")
    
    MalpracticeLog.objects.create(
        attempt=attempt,
        description=description,
        screenshot=screenshot
    )
    
    return Response({"message": "Malpractice logged successfully."})

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def student_reports(request, student_id):
    if not request.user.is_superuser:
        return Response({"error": "Only admin allowed"}, status=403)
        
    try:
        student = User.objects.get(id=student_id)
    except User.DoesNotExist:
        return Response({"error": "Student not found"}, status=404)
        
    logs = MalpracticeLog.objects.filter(attempt__student=student).order_by("-timestamp")
    
    response_data = []
    for log in logs:
        response_data.append({
            "id": log.id,
            "exam_name": log.attempt.exam.name,
            "timestamp": log.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
            "description": log.description,
            "screenshot": log.screenshot
        })
        
    return Response(response_data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def recent_malpractice(request):
    if not request.user.is_superuser:
        return Response({"error": "Only admin allowed"}, status=403)
        
    # Get logs from the last 1 minute (or just the latest 10 logs)
    # For simplicity, we just return the latest 10 logs so the frontend can check if there are new ones.
    logs = MalpracticeLog.objects.order_by("-timestamp")[:10]
    
    response_data = []
    for log in logs:
        response_data.append({
            "id": log.id,
            "student_name": f"{log.attempt.student.first_name} {log.attempt.student.last_name}",
            "exam_name": log.attempt.exam.name,
            "timestamp": log.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
            "description": log.description,
            "screenshot": log.screenshot
        })
        
    return Response(response_data)