from django.db import models
from django.conf import settings
from dashboard.models import Exam, Question


# ---------------- EXAM ATTEMPT ----------------
class ExamAttempt(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    exam = models.ForeignKey(
        Exam,
        on_delete=models.CASCADE
    )

    start_time = models.DateTimeField(auto_now_add=True)
    submitted = models.BooleanField(default=False)
    score = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.student} - {self.exam}"


# ---------------- ANSWER ----------------
class Answer(models.Model):
    attempt = models.ForeignKey(
        ExamAttempt,
        on_delete=models.CASCADE,
        related_name="answers"
    )

    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    selected_answer = models.CharField(max_length=1)
    is_correct = models.BooleanField(default=False)

# ---------------- MALPRACTICE LOG ----------------
class MalpracticeLog(models.Model):
    attempt = models.ForeignKey(
        ExamAttempt,
        on_delete=models.CASCADE,
        related_name="malpractice_logs"
    )
    timestamp = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=255)
    screenshot = models.TextField(blank=True, null=True) # Base64 image

    def __str__(self):
        return f"{self.attempt.student.username} - {self.description}"