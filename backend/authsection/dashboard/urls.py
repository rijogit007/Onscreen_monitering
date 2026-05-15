# # from django.urls import path
# # from .views import dashboard_data
# # from django.urls import path

# # from django.conf import settings
# # from django.conf.urls.static import static
# # from . import views
# # from django.contrib import admin
# # urlpatterns = [
# #     path('', views.dashboard_data),
# # ]

# from django.urls import path
# from . import views

# urlpatterns = [

#     path('dashboard/', views.dashboard_data),

#     path('courses/', views.get_courses),

#     path('add-course/', views.add_course),

#     path('students/', views.all_students),

#     path('course/<int:course_id>/', views.course_students),
# ]


from django.urls import path
from . import views

urlpatterns = [

    path('dashboard/', views.dashboard_data),
    # path('admin-dashboard/', views.admin_dashboard),
    path(
        "admin-dashboard/",views.admin_dashboard
    ),

    path('courses/', views.get_courses),

    path('add-course/', views.add_course),

    path('students/', views.all_students),

    path(
        'course/<int:course_id>/',
        views.course_students
    ),

    path(
        'students/delete/<int:student_id>/',
        views.delete_student
    ),

    path(
        'students/status/<int:student_id>/',
        views.toggle_student_status
    ),

    path(
        'students/update/<int:student_id>/',
        views.update_student
    ),
    
     path(
        "send-email/",
        views.send_email
    ),

    path(
        "send-all-emails/",
        views.send_all_emails
    ),

    path(
        "send-course-email/",
        views.send_course_email
    ),
    
    path("create-exam/", views.create_exam),

    # CREATE QUESTION
    path("create-question/", views.create_question),

    # GET ALL EXAMS
    path("exams/", views.get_exams),

    # GET QUESTIONS OF A SINGLE EXAM
    path("exam/<int:exam_id>/questions/", views.get_exam_questions),
    
    path("delete-question/<int:id>/", views.delete_question),
    path("update-question/<int:id>/", views.update_question),
    
    path("publish-exam/<int:exam_id>/", views.publish_exam),
    path("delete-exam/<int:exam_id>/", views.delete_exam),
    path("update-exam/<int:exam_id>/", views.update_exam),
    path("student-notifications/", views.student_notifications),
]