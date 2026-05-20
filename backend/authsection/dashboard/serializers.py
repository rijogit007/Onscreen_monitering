# from rest_framework import serializers
# from .models import Course


# class CourseSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Course
#         fields = "__all__"



from rest_framework import serializers

from django.contrib.auth import get_user_model

from .models import Course

User = get_user_model()


# ======================================
# COURSE SERIALIZER
# ======================================

class CourseSerializer(serializers.ModelSerializer):

    class Meta:

        model = Course

        fields = "__all__"


# ======================================
# DASHBOARD SERIALIZER
# ======================================

class DashboardSerializer(serializers.Serializer):

    message = serializers.CharField()

    email = serializers.EmailField()

    name = serializers.CharField()

    alerts = serializers.IntegerField()


# ======================================
# STUDENT SERIALIZER
# ======================================

class StudentSerializer(serializers.ModelSerializer):

    name = serializers.SerializerMethodField()

    course = serializers.SerializerMethodField()

    profile = serializers.SerializerMethodField()

    class Meta:

        model = User

        fields = [

            "id",

            "name",

            "email",

            "uucms_no",

            "reg_no",

            "is_active",

            "course",

            "profile"
        ]

    def get_name(self, obj):

        return f"{obj.first_name} {obj.last_name}"

    def get_course(self, obj):

        if obj.course:

            return obj.course.name

        return None

    def get_profile(self, obj):

        request = self.context.get("request")

        if obj.profile:

            return request.build_absolute_uri(
                obj.profile.url
            )

        return None


# ======================================
# UPDATE STUDENT SERIALIZER
# ======================================

class UpdateStudentSerializer(serializers.ModelSerializer):

    class Meta:

        model = User

        fields = [

            "first_name",

            "last_name",

            "email",

            "uucms_no",

            "reg_no"
        ]


# ======================================
# EMAIL SERIALIZER
# ======================================

class EmailSerializer(serializers.Serializer):

    email = serializers.EmailField()

    subject = serializers.CharField()

    message = serializers.CharField()


# ======================================
# COURSE EMAIL SERIALIZER
# ======================================

class CourseEmailSerializer(serializers.Serializer):

    course = serializers.CharField()

    subject = serializers.CharField()

    message = serializers.CharField()

# ======================================
# ALL EMAIL SERIALIZER
# ======================================

class AllEmailSerializer(serializers.Serializer):

    subject = serializers.CharField()

    message = serializers.CharField()
    
    








from rest_framework import serializers
from .models import Exam, Question


from rest_framework import serializers
from .models import Exam


from rest_framework import serializers
from .models import Exam

class ExamSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source="course.name", read_only=True)

    class Meta:
        model = Exam
        fields = "__all__"

    def validate(self, data):
        is_for_all = data.get("is_for_all")
        course = data.get("course")

        if not is_for_all and not course:
            raise serializers.ValidationError(
                "Course is required when exam is not for all students"
            )

        if is_for_all and course:
            raise serializers.ValidationError(
                "Course must be empty when exam is for all students"
            )

        return data

# from rest_framework import serializers
# from .models import Exam, Question


# from rest_framework import serializers
# from .models import Exam

# class ExamSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Exam
#         fields = "__all__"

#     def validate(self, data):
#         is_for_all = data.get("is_for_all")
#         course = data.get("course")

#         if not is_for_all and not course:
#             raise serializers.ValidationError(
#                 "Course is required when exam is not for all students"
#             )

#         if is_for_all and course:
#             raise serializers.ValidationError(
#                 "Course must be empty when exam is for all students"
#             )

#         return data


class CreateExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = [
            "id",
            "name",
            "course",
            "is_for_all",
            "start_time",
            "end_time",
            "total_questions",
            "total_marks",
        ]


# ================= QUESTION =================
class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"