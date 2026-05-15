from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, OTP


# =========================
# CUSTOM USER ADMIN
# =========================
class CustomUserAdmin(UserAdmin):
    model = User

    list_display = ('email', 'first_name', 'last_name', 'is_verified', 'is_staff')
    list_filter = ('is_verified', 'is_staff', 'is_superuser')

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'uucms_no', 'reg_no', 'course', 'profile')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'is_verified', 'groups', 'user_permissions')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )

    search_fields = ('email',)
    ordering = ('email',)


# register user
admin.site.register(User, CustomUserAdmin)

# register OTP (optional but useful)
admin.site.register(OTP)