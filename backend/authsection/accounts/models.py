from django.db import models
from django.contrib.auth.models import AbstractUser

from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from dashboard.models import Course
# =========================
# CUSTOM USER MANAGER
# =========================
class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_verified", True)

        return self.create_user(email, password, **extra_fields)


# =========================
# CUSTOM USER MODEL
# =========================
class User(AbstractUser):
    username = None  # ❌ remove username field

    email = models.EmailField(unique=True)
    is_verified = models.BooleanField(default=False)

    uucms_no = models.CharField(max_length=100, null=True, blank=True)
    reg_no = models.CharField(max_length=100, null=True, blank=True)
    # course = models.CharField(max_length=100, null=True, blank=True)
    from dashboard.models import Course

    course = models.ForeignKey(Course,on_delete=models.SET_NULL,null=True,blank=True)
    profile = models.ImageField(upload_to='profiles/', null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = UserManager()
    
class OTP(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
 