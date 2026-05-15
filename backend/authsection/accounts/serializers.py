
# from rest_framework import serializers
# from .models import User
# from django.contrib.auth.hashers import make_password


# class RegisterSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = User

#         fields = [
#             'first_name',
#             'last_name',
#             'email',
#             'password',
#             'uucms_no',
#             'reg_no',
#             'course',
#             'profile'
#         ]

#         extra_kwargs = {
#             'password': {'write_only': True},
#         }

#     def create(self, validated_data):

#         validated_data['password'] = make_password(
#             validated_data['password']
#         )

#         return User.objects.create(
#             **validated_data
#         )



from rest_framework import serializers

from django.contrib.auth import get_user_model

User = get_user_model()


# ======================================
# REGISTER SERIALIZER
# ======================================

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True
    )

    class Meta:

        model = User

        fields = [

            "first_name",
            "last_name",
            "email",
            "password",
            "course",
            "uucms_no",
            "reg_no",
            "profile"
        ]

    def create(self, validated_data):

        password = validated_data.pop("password")

        user = User(**validated_data)

        user.set_password(password)

        user.save()

        return user


# ======================================
# LOGIN USER SERIALIZER
# ======================================

class LoginUserSerializer(serializers.ModelSerializer):

    course = serializers.SerializerMethodField()

    profile = serializers.SerializerMethodField()

    is_admin = serializers.SerializerMethodField()

    class Meta:

        model = User

        fields = [

            "id",

            "first_name",

            "last_name",

            "email",

            "is_admin",

            "course",

            "uucms_no",

            "reg_no",

            "profile"
        ]

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

    def get_is_admin(self, obj):

        return obj.is_superuser


# ======================================
# STUDENT SERIALIZER
# ======================================

class StudentSerializer(serializers.ModelSerializer):

    course = serializers.SerializerMethodField()

    profile = serializers.SerializerMethodField()

    name = serializers.SerializerMethodField()

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
# DASHBOARD SERIALIZER
# ======================================

class DashboardSerializer(serializers.Serializer):

    message = serializers.CharField()

    email = serializers.EmailField()

    name = serializers.CharField()

    alerts = serializers.IntegerField()