# from django.utils import timezone
# from datetime import timedelta

# from django.contrib.auth import get_user_model

# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework.response import Response

# from rest_framework_simplejwt.tokens import RefreshToken

# from .models import OTP
# from .serializers import RegisterSerializer
# from .utils import generate_otp, send_otp_email
# User = get_user_model()

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def register(request):

#     email = request.data.get("email")
#     uucms_no = request.data.get("uucms_no")
#     reg_no = request.data.get("reg_no")

#     if not email:
#         return Response(
#             {"error": "Email required"},
#             status=400
#         )

#     # 🔥 VERIFIED EMAIL CHECK
#     if User.objects.filter(
#         email=email,
#         is_verified=True
#     ).exists():

#         return Response({
#             "email": ["Email already exists"]
#         }, status=400)

#     # 🔥 VERIFIED UUCMS CHECK
#     if User.objects.filter(
#         uucms_no=uucms_no,
#         is_verified=True
#     ).exists():

#         return Response({
#             "uucms_no": ["UUCMS number already exists"]
#         }, status=400)

#     # 🔥 VERIFIED REG NO CHECK
#     if User.objects.filter(
#         reg_no=reg_no,
#         is_verified=True
#     ).exists():

#         return Response({
#             "reg_no": ["Register number already exists"]
#         }, status=400)

#     # check old unverified user
#     old_user = User.objects.filter(
#         email=email,
#         is_verified=False
#     ).first()

#     # delete old unverified account
#     if old_user:
#         old_user.delete()

#     # create new user
#     serializer = RegisterSerializer(
#         data=request.data
#     )

#     if serializer.is_valid():

#         user = serializer.save()

#     else:

#         return Response(
#             serializer.errors,
#             status=400
#         )

#     # reset old otp
#     OTP.objects.filter(email=email).delete()

#     # create new otp
#     otp = generate_otp()

#     OTP.objects.create(
#         email=email,
#         otp=otp
#     )

#     # send otp
#     send_otp_email(email, otp)

#     return Response({
#         "message": "OTP sent successfully"
#     })


# @api_view(['POST'])
# @permission_classes([AllowAny])
# def verify_otp(request):

#     email = request.data.get("email")
#     otp = str(request.data.get("otp")).strip()

#     otp_obj = OTP.objects.filter(email=email).order_by('-created_at').first()

#     if not otp_obj:
#         return Response({"error": "OTP not found"}, status=400)

#     if otp_obj.otp != otp:
#         return Response({"error": "Invalid OTP"}, status=400)

#     user = User.objects.filter(email=email).first()

#     if not user:
#         return Response({"error": "User not found"}, status=400)

#     user.is_verified = True
#     user.save()

#     otp_obj.delete()

#     return Response({"message": "Verified successfully"})




# # ======================================
# # LOGIN
# # ======================================
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def login(request):

#     email = request.data.get("email")
#     password = request.data.get("password")

#     try:
#         user = User.objects.get(email=email)

#     except User.DoesNotExist:

#         return Response({
#             "error": "Invalid credentials"
#         }, status=400)

#     # password check
#     if not user.check_password(password):

#         return Response({
#             "error": "Invalid credentials"
#         }, status=400)

#     # email verification check
#     if not user.is_verified:

#         return Response({
#             "error": "Verify your email first"
#         }, status=400)
        
#     if not user.is_active:

#         return Response({
#             "error": "Account blocked by admin"
#         }, status=403)    

#     # JWT token generation
#     refresh = RefreshToken.for_user(user)

#     return Response({

#         "refresh": str(refresh),
#         "access": str(refresh.access_token),

#         "user": {
#             # "id": user.id,
#             # "first_name": user.first_name,
#             # "last_name": user.last_name,
#             # "email": user.email,
#             # "course": user.course,
#             # "uucms_no": user.uucms_no,
#             # "reg_no": user.reg_no,
            
#             # "profile": request.build_absolute_uri(user.profile.url) if user.profile else None
#             "id": user.id,

#     "first_name": user.first_name,

#     "last_name": user.last_name,

#     "email": user.email,

#     "is_admin": user.is_superuser,

#     "course":
#         user.course.name
#         if user.course
#         else None,

#     "uucms_no": user.uucms_no,

#     "reg_no": user.reg_no,

#     "profile":
#         request.build_absolute_uri(user.profile.url)
#         if user.profile
#         else None
#         }
#     })


#     # ======================================
# # FORGOT PASSWORD -> SEND OTP
# # ======================================

# @api_view(['POST'])
# @permission_classes([AllowAny])

# def forgot_password(request):

#     email = request.data.get("email")

#     if not email:

#         return Response({
#             "error": "Email is required"
#         }, status=400)

#     user = User.objects.filter(
#         email=email
#     ).first()

#     if not user:

#         return Response({
#             "error": "User not found"
#         }, status=404)

#     # delete old otp
#     OTP.objects.filter(
#         email=email
#     ).delete()

#     # create new otp
#     otp = generate_otp()

#     OTP.objects.create(
#         email=email,
#         otp=otp
#     )

#     # send otp mail
#     send_otp_email(email, otp)

#     return Response({
#         "message": "OTP sent successfully"
#     })
    
    
#     # ======================================
# # RESET PASSWORD
# # ======================================

# @api_view(['POST'])
# @permission_classes([AllowAny])

# def reset_password(request):

#     email = request.data.get("email")

#     otp = str(
#         request.data.get("otp")
#     ).strip()

#     password = request.data.get("password")

#     if not email or not otp or not password:

#         return Response({
#             "error": "All fields are required"
#         }, status=400)

#     otp_obj = OTP.objects.filter(
#         email=email
#     ).order_by('-created_at').first()

#     if not otp_obj:

#         return Response({
#             "error": "OTP not found"
#         }, status=400)

#     # OTP check
#     if otp_obj.otp != otp:

#         return Response({
#             "error": "Invalid OTP"
#         }, status=400)

#     # OTP expiry check
#     if timezone.now() > otp_obj.created_at + timedelta(minutes=5):

#         otp_obj.delete()

#         return Response({
#             "error": "OTP expired"
#         }, status=400)

#     user = User.objects.filter(
#         email=email
#     ).first()

#     if not user:

#         return Response({
#             "error": "User not found"
#         }, status=404)

#     # change password
#     user.set_password(password)

#     user.save()

#     # delete used otp
#     otp_obj.delete()

#     return Response({
#         "message": "Password reset successful"
#     })

# # ======================================
# # DASHBOARD
# # ======================================
# # @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# # def dashboard_data(request):

# #     return Response({
# #         "message": "Welcome to dashboard",
# #         "email": request.user.email,
# #         "name": request.user.first_name,
# #         "alerts": 0
# #     })






from django.utils import timezone
from datetime import timedelta

from django.contrib.auth import get_user_model

from rest_framework.decorators import (
    api_view,
    permission_classes
)

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)

from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken

from .models import OTP

from .serializers import (

    RegisterSerializer,

    LoginUserSerializer,

    StudentSerializer,

    UpdateStudentSerializer,

    DashboardSerializer
)

from .utils import (
    generate_otp,
    send_otp_email
)

User = get_user_model()


# ======================================
# REGISTER
# ======================================

@api_view(['POST'])
@permission_classes([AllowAny])

def register(request):

    email = request.data.get("email")

    uucms_no = request.data.get("uucms_no")

    reg_no = request.data.get("reg_no")

    if not email:

        return Response({

            "error": "Email required"

        }, status=400)

    if User.objects.filter(
        email=email,
        is_verified=True
    ).exists():

        return Response({

            "email": ["Email already exists"]

        }, status=400)

    if User.objects.filter(
        uucms_no=uucms_no,
        is_verified=True
    ).exists():

        return Response({

            "uucms_no": ["UUCMS already exists"]

        }, status=400)

    if User.objects.filter(
        reg_no=reg_no,
        is_verified=True
    ).exists():

        return Response({

            "reg_no": ["Register number already exists"]

        }, status=400)

    old_user = User.objects.filter(
        email=email,
        is_verified=False
    ).first()

    if old_user:

        old_user.delete()

    serializer = RegisterSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

    else:

        return Response(
            serializer.errors,
            status=400
        )

    OTP.objects.filter(
        email=email
    ).delete()

    otp = generate_otp()

    OTP.objects.create(

        email=email,

        otp=otp
    )

    send_otp_email(email, otp)

    return Response({

        "message": "OTP sent successfully"

    })


# ======================================
# VERIFY OTP
# ======================================

@api_view(['POST'])
@permission_classes([AllowAny])

def verify_otp(request):

    email = request.data.get("email")

    otp = str(
        request.data.get("otp")
    ).strip()

    otp_obj = OTP.objects.filter(
        email=email
    ).order_by('-created_at').first()

    if not otp_obj:

        return Response({

            "error": "OTP not found"

        }, status=400)

    if timezone.now() > otp_obj.created_at + timedelta(minutes=5):

        otp_obj.delete()

        return Response({

            "error": "OTP expired"

        }, status=400)

    if otp_obj.otp != otp:

        return Response({

            "error": "Invalid OTP"

        }, status=400)

    user = User.objects.filter(
        email=email
    ).first()

    if not user:

        return Response({

            "error": "User not found"

        }, status=404)

    user.is_verified = True

    user.save()

    otp_obj.delete()

    return Response({

        "message": "Verified successfully"

    })


# ======================================
# LOGIN
# ======================================

@api_view(['POST'])
@permission_classes([AllowAny])

def login(request):

    email = request.data.get("email")

    password = request.data.get("password")

    try:

        user = User.objects.get(
            email=email
        )

    except User.DoesNotExist:

        return Response({

            "error": "Invalid credentials"

        }, status=400)

    if not user.check_password(password):

        return Response({

            "error": "Invalid credentials"

        }, status=400)

    if not user.is_verified:

        return Response({

            "error": "Verify your email first"

        }, status=400)

    if not user.is_active:

        return Response({

            "error": "Account blocked by admin"

        }, status=403)

    refresh = RefreshToken.for_user(user)

    serializer = LoginUserSerializer(

        user,

        context={
            "request": request
        }
    )

    return Response({

        "refresh": str(refresh),

        "access": str(
            refresh.access_token
        ),

        "user": serializer.data
    })


# ======================================
# FORGOT PASSWORD
# ======================================

@api_view(['POST'])
@permission_classes([AllowAny])

def forgot_password(request):

    email = request.data.get("email")

    if not email:

        return Response({

            "error": "Email required"

        }, status=400)

    user = User.objects.filter(
        email=email
    ).first()

    if not user:

        return Response({

            "error": "User not found"

        }, status=404)

    OTP.objects.filter(
        email=email
    ).delete()

    otp = generate_otp()

    OTP.objects.create(

        email=email,

        otp=otp
    )

    send_otp_email(email, otp)

    return Response({

        "message": "OTP sent successfully"

    })


# ======================================
# RESET PASSWORD
# ======================================

@api_view(['POST'])
@permission_classes([AllowAny])

def reset_password(request):

    email = request.data.get("email")

    otp = str(
        request.data.get("otp")
    ).strip()

    password = request.data.get("password")

    if not email or not otp or not password:

        return Response({

            "error": "All fields required"

        }, status=400)

    otp_obj = OTP.objects.filter(
        email=email
    ).order_by('-created_at').first()

    if not otp_obj:

        return Response({

            "error": "OTP not found"

        }, status=400)

    if otp_obj.otp != otp:

        return Response({

            "error": "Invalid OTP"

        }, status=400)

    if timezone.now() > otp_obj.created_at + timedelta(minutes=5):

        otp_obj.delete()

        return Response({

            "error": "OTP expired"

        }, status=400)

    user = User.objects.filter(
        email=email
    ).first()

    if not user:

        return Response({

            "error": "User not found"

        }, status=404)

    user.set_password(password)

    user.save()

    otp_obj.delete()

    return Response({

        "message": "Password reset successful"

    })


# ======================================
# DASHBOARD
# ======================================

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