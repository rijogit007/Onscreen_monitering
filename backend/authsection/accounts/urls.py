from django.urls import path
from .views import register, verify_otp, login
from django.conf import settings
from django.conf.urls.static import static
from . import views
from django.contrib import admin
urlpatterns = [
    path('register/',views.register),
    path('verify-otp/', views.verify_otp),
    path('login/', views.login),
    # path('dashboard/', views.dashboard_data),
    path('admin/', admin.site.urls),  
    path('forgot-password/',views.forgot_password),
    path('reset-password/',views.reset_password),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)