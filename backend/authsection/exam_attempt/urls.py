
    
from django.urls import path
from .import views 

urlpatterns = [
    path("start-exam/<int:exam_id>/", views.start_exam),
    path("submit-exam/<int:attempt_id>/", views.submit_exam),
    path("save-answer/<int:attempt_id>/", views.save_answer),
    path("exams-list/", views.exams_list),
    path("student-results/<int:student_id>/", views.student_results),
    path("publish-results/<int:exam_id>/", views.publish_results),
    path("log-malpractice/<int:attempt_id>/", views.log_malpractice),
    path("student-reports/<int:student_id>/", views.student_reports),
    path("recent-malpractice/", views.recent_malpractice),
]