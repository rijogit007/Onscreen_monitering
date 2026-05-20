

from django.core.mail import send_mail

from django.conf import settings

from django.contrib.auth import get_user_model

from rest_framework.decorators import (
    api_view,
    permission_classes
)

from rest_framework.permissions import (
    IsAuthenticated,
    AllowAny
)

from rest_framework.response import Response

from .models import Course

from .serializers import (

    CourseSerializer,

    DashboardSerializer,

    StudentSerializer,

    UpdateStudentSerializer,

    EmailSerializer,

    CourseEmailSerializer,
    
    AllEmailSerializer
)

User = get_user_model()


# ======================================
# STUDENT DASHBOARD
# ======================================

from django.utils import timezone
from .models import Course, Exam
from exam_attempt.models import MalpracticeLog

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_dashboard(request):
    if not request.user.is_superuser:
        return Response({
            "error": "Only admin allowed"
        }, status=403)

    total_students = User.objects.filter(
        is_superuser=False
    ).count()

    active_students = User.objects.filter(
        is_superuser=False,
        is_active=True
    ).count()

    blocked_students = User.objects.filter(
        is_superuser=False,
        is_active=False
    ).count()

    total_courses = Course.objects.count()
    
    active_exams = Exam.objects.filter(is_published=True).count()
    
    today = timezone.now().date()
    malpractice_today = MalpracticeLog.objects.filter(timestamp__date=today).count()

    return Response({
        "admin": request.user.first_name,
        "total_students": total_students,
        "active_students": active_students,
        "blocked_students": blocked_students,
        "total_courses": total_courses,
        "active_exams": active_exams,
        "malpractice_today": malpractice_today
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])

def dashboard_data(request):

    data = {

        "message": "Welcome to dashboard",

        "email": request.user.email,

        "name": request.user.first_name,

        "alerts": 0
    }

    serializer = DashboardSerializer(data)

    return Response(serializer.data)


# ======================================
# GET COURSES
# ======================================

@api_view(['GET'])
@permission_classes([AllowAny])
def get_courses(request):

    courses = Course.objects.all()

    serializer = CourseSerializer(
        courses,
        many=True
    )

    return Response(serializer.data)


# ======================================
# ADD COURSE
# ======================================

@api_view(['POST'])
@permission_classes([IsAuthenticated])

def add_course(request):

    if not request.user.is_superuser:

        return Response({

            "error": "Only admin allowed"

        }, status=403)

    serializer = CourseSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response({

            "message": "Course added",

            "course": serializer.data
        })

    return Response(
        serializer.errors,
        status=400
    )


# ======================================
# ALL STUDENTS
# ======================================

@api_view(['GET'])
@permission_classes([IsAuthenticated])

def all_students(request):

    if not request.user.is_superuser:

        return Response({

            "error": "Only admin allowed"

        }, status=403)

    students = User.objects.filter(
        is_superuser=False
    )

    serializer = StudentSerializer(

        students,

        many=True,

        context={
            "request": request
        }
    )

    return Response(serializer.data)


# ======================================
# COURSE STUDENTS
# ======================================

@api_view(['GET'])
@permission_classes([IsAuthenticated])

def course_students(request, course_id):

    if not request.user.is_superuser:

        return Response({

            "error": "Only admin allowed"

        }, status=403)

    try:

        course = Course.objects.get(
            id=course_id
        )

    except Course.DoesNotExist:

        return Response({

            "error": "Course not found"

        }, status=404)

    students = User.objects.filter(
        course=course
    )

    serializer = StudentSerializer(

        students,

        many=True,

        context={
            "request": request
        }
    )

    return Response({

        "course": course.name,

        "students": serializer.data
    })


# ======================================
# DELETE STUDENT
# ======================================

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])

def delete_student(request, student_id):

    if not request.user.is_superuser:

        return Response({

            "error": "Only admin allowed"

        }, status=403)

    try:

        student = User.objects.get(

            id=student_id,

            is_superuser=False
        )

    except User.DoesNotExist:

        return Response({

            "error": "Student not found"

        }, status=404)

    student.delete()

    return Response({

        "message": "Student deleted successfully"
    })


# ======================================
# TOGGLE STUDENT STATUS
# ======================================

@api_view(['PUT'])
@permission_classes([IsAuthenticated])

def toggle_student_status(request, student_id):

    if not request.user.is_superuser:

        return Response({

            "error": "Only admin allowed"

        }, status=403)

    try:

        student = User.objects.get(

            id=student_id,

            is_superuser=False
        )

    except User.DoesNotExist:

        return Response({

            "error": "Student not found"

        }, status=404)

    student.is_active = not student.is_active

    student.save()

    return Response({

        "message": "Status updated",

        "is_active": student.is_active
    })


# ======================================
# UPDATE STUDENT
# ======================================

@api_view(['PUT'])
@permission_classes([IsAuthenticated])

def update_student(request, student_id):

    if not request.user.is_superuser:

        return Response({

            "error": "Only admin allowed"

        }, status=403)

    try:

        student = User.objects.get(

            id=student_id,

            is_superuser=False
        )

    except User.DoesNotExist:

        return Response({

            "error": "Student not found"

        }, status=404)

    serializer = UpdateStudentSerializer(

        student,

        data=request.data,

        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response({

            "message": "Student updated"
        })

    return Response(
        serializer.errors,
        status=400
    )


# ======================================
# SEND SINGLE EMAIL
# ======================================

@api_view(['POST'])
@permission_classes([IsAuthenticated])

def send_email(request):
    
    if not request.user.is_superuser:

        return Response({
        "error": "Only admin allowed"
    }, status=403)

    serializer = EmailSerializer(
        data=request.data
    )

    if serializer.is_valid():

        email = serializer.validated_data["email"]

        subject = serializer.validated_data["subject"]

        message = serializer.validated_data["message"]

        send_mail(

            subject,

            message,

            settings.EMAIL_HOST_USER,

            [email],

            fail_silently=False
        )

        return Response({

            "message": "Email sent"
        })

    return Response(
        serializer.errors,
        status=400
    )


# ======================================
# SEND ALL EMAILS
# ======================================

@api_view(['POST'])
@permission_classes([IsAuthenticated])

def send_all_emails(request):
    
    if not request.user.is_superuser:

        return Response({
        "error": "Only admin allowed"
    }, status=403)

    serializer = AllEmailSerializer(
        data=request.data
    )

    if serializer.is_valid():

        subject = serializer.validated_data["subject"]

        message = serializer.validated_data["message"]

        students = User.objects.filter(
            is_superuser=False
        )

        emails = [

            student.email

            for student in students

            if student.email
        ]

        for email in emails:
            send_mail(
                subject,
                message,
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently=True
            )

        return Response({
            "message": "Emails sent to all"
        })

    return Response(
        serializer.errors,
        status=400
    )


# ======================================
# SEND COURSE EMAIL
# ======================================

@api_view(['POST'])
@permission_classes([IsAuthenticated])

def send_course_email(request):
    
    if not request.user.is_superuser:

        return Response({
        "error": "Only admin allowed"
    }, status=403)

    serializer = CourseEmailSerializer(
        data=request.data
    )

    if serializer.is_valid():

        course = serializer.validated_data["course"]

        subject = serializer.validated_data["subject"]

        message = serializer.validated_data["message"]

        students = User.objects.filter(
            course__name=course
        )

        emails = [

            student.email

            for student in students

            if student.email
        ]

        for email in emails:
            send_mail(
                subject,
                message,
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently=True
            )

        return Response({
            "message": f"Emails sent to {course}"
        })

    return Response(
        serializer.errors,
        status=400
    )
    
 
 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Exam, Question
from .serializers import (
    ExamSerializer,
    CreateExamSerializer,
    QuestionSerializer
)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_exam(request):

    if not request.user.is_superuser:
        return Response({"error": "Only admin allowed"}, status=403)

    data = request.data.copy()

    # RULE: course required if NOT for all
    if not data.get("is_for_all"):
        if not data.get("course"):
            return Response(
                {"error": "Course is required when exam is not for all students"},
                status=400
            )

    # RULE: if for all → ignore course
    if data.get("is_for_all"):
        data["course"] = None

    serializer = ExamSerializer(data=data)

    if serializer.is_valid():
        exam = serializer.save()

        return Response({
            "message": "Exam created",
            "exam": ExamSerializer(exam).data
        })

    return Response(serializer.errors, status=400)
# # ================= CREATE EXAM =================
# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def create_exam(request):

#     if not request.user.is_superuser:
#         return Response({"error": "Only admin allowed"}, status=403)

#     serializer = CreateExamSerializer(data=request.data)

#     if serializer.is_valid():
#         exam = serializer.save()

#         return Response({
#             "message": "Exam created",
#             "exam": ExamSerializer(exam).data
#         })

#     return Response(serializer.errors, status=400)


# ================= CREATE QUESTION =================
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_question(request):

    if not request.user.is_superuser:
        return Response({"error": "Only admin allowed"}, status=403)

    exam_id = request.data.get("exam")

    try:
        exam = Exam.objects.get(id=exam_id)
    except Exam.DoesNotExist:
        return Response({"error": "Exam not found"}, status=404)

    serializer = QuestionSerializer(data=request.data)

    if serializer.is_valid():
        question = serializer.save()

        return Response({
            "message": "Question added",
            "question": QuestionSerializer(question).data
        })

    return Response(serializer.errors, status=400)


# ================= GET QUESTIONS =================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_exam_questions(request, exam_id):
    
    if not request.user.is_superuser:
        return Response({"error": "Only admin allowed"}, status=403)

    questions = Question.objects.filter(exam_id=exam_id)

    serializer = QuestionSerializer(questions, many=True)

    return Response(serializer.data) 


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_exams(request):
    if not request.user.is_superuser:
        return Response({"error": "Only admin allowed"}, status=403)
    exams = Exam.objects.all().order_by("-id")
    serializer = ExamSerializer(exams, many=True)
    return Response(serializer.data)














# ================= DELETE QUESTION =================
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_question(request, id):

    if not request.user.is_superuser:
        return Response({"error": "Only admin allowed"}, status=403)

    try:
        question = Question.objects.get(id=id)
    except Question.DoesNotExist:
        return Response({"error": "Question not found"}, status=404)

    question.delete()

    return Response({"message": "Question deleted"})





# ================= UPDATE QUESTION =================
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_question(request, id):

    if not request.user.is_superuser:
        return Response({"error": "Only admin allowed"}, status=403)

    try:
        question = Question.objects.get(id=id)
    except Question.DoesNotExist:
        return Response({"error": "Question not found"}, status=404)

    serializer = QuestionSerializer(
        question,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)





@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_exam(request, exam_id):

    if not request.user.is_superuser:

        return Response({
            "error": "Only admin allowed"
        }, status=403)

    try:
        exam = Exam.objects.get(id=exam_id)

    except Exam.DoesNotExist:

        return Response({
            "error": "Exam not found"
        }, status=404)

    exam.delete()

    return Response({
        "message": "Exam deleted"
    })
    
    
    
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_exam(request, exam_id):

    if not request.user.is_superuser:

        return Response({
            "error": "Only admin allowed"
        }, status=403)

    try:
        exam = Exam.objects.get(id=exam_id)

    except Exam.DoesNotExist:

        return Response({
            "error": "Exam not found"
        }, status=404)

    serializer = ExamSerializer(
        exam,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(serializer.errors, status=400)








from  dashboard.models import Notification


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def publish_exam(request, exam_id):

    if not request.user.is_superuser:
        return Response({
            "error": "Only admin allowed"
        }, status=403)

    try:
        exam = Exam.objects.get(id=exam_id)

    except Exam.DoesNotExist:

        return Response({
            "error": "Exam not found"
        }, status=404)

    exam.is_published = True
    exam.save()

    # ================= SEND NOTIFICATIONS =================

    if exam.is_for_all:

        students = User.objects.filter(
            is_superuser=False,
            is_active=True
        )

    else:

        students = User.objects.filter(
            course=exam.course,
            is_superuser=False,
            is_active=True
        )

    notifications = []

    for student in students:

        notifications.append(
            Notification(
                title="New Exam Published",

                message=f"{exam.name} exam is now available.",

                exam=exam,

                user=student
            )
        )

    Notification.objects.bulk_create(notifications)

    return Response({
        "message": "Exam published successfully"
    })
    
    
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def student_notifications(request):

    notifications = Notification.objects.filter(
        user=request.user
    ).order_by("-created_at")

    data = []

    for n in notifications:

        data.append({
            "id": n.id,
            "title": n.title,
            "message": n.message,
            "is_read": n.is_read,
            "created_at": n.created_at,
            "exam_id": n.exam.id if n.exam else None
        })

    return Response(data)