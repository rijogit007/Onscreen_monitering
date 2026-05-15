# from django.db import models

# # Create your models here.


# from django.db import models
# from django.forms import ValidationError


# class Course(models.Model):

#     name = models.CharField(
#         max_length=100,
#         unique=True
#     )

#     created_at = models.DateTimeField(
#         auto_now_add=True
#     )

#     def __str__(self):
#         return self.name
    
    
    
    
    
# from django.db import models
# from .models import Course


# class Exam(models.Model):
#     name = models.CharField(max_length=255)

#     course = models.ForeignKey(
#         Course,
#         on_delete=models.CASCADE,
#         null=True,
#         blank=True
#     )

#     is_for_all = models.BooleanField(default=False)

#     start_time = models.DateTimeField()
#     end_time = models.DateTimeField()

#     total_questions = models.IntegerField()
#     total_marks = models.IntegerField()

#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.name


# class Question(models.Model):
#     exam = models.ForeignKey(
#         Exam,
#         on_delete=models.CASCADE,
#         related_name="questions"
#     )

#     question_text = models.TextField()

#     option_a = models.CharField(max_length=255)
#     option_b = models.CharField(max_length=255)
#     option_c = models.CharField(max_length=255)
#     option_d = models.CharField(max_length=255)

#     correct_answer = models.CharField(
#         max_length=1,
#         choices=[
#             ("A", "A"),
#             ("B", "B"),
#             ("C", "C"),
#             ("D", "D"),
#         ]
#     )

#     marks = models.IntegerField(default=1)

#     def __str__(self):
#         return self.question_text



from django.db import models
from django.conf import settings


# ================= COURSE =================
class Course(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# ================= EXAM =================
class Exam(models.Model):
    name = models.CharField(max_length=255)

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    is_for_all = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)

    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    total_questions = models.IntegerField()
    total_marks = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# ================= QUESTION =================
class Question(models.Model):
    exam = models.ForeignKey(
        Exam,
        on_delete=models.CASCADE,
        related_name="questions"
    )

    question_text = models.TextField()

    option_a = models.CharField(max_length=255)
    option_b = models.CharField(max_length=255)
    option_c = models.CharField(max_length=255)
    option_d = models.CharField(max_length=255)

    correct_answer = models.CharField(
        max_length=1,
        choices=[
            ("A", "A"),
            ("B", "B"),
            ("C", "C"),
            ("D", "D"),
        ]
    )

    marks = models.IntegerField(default=1)

    def __str__(self):
        return self.question_text


# ================= NOTIFICATION =================
class Notification(models.Model):

    title = models.CharField(max_length=255)
    message = models.TextField()

    exam = models.ForeignKey(
        Exam,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="notifications"
    )

    is_read = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title