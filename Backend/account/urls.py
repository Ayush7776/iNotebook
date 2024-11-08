from django.urls import path,include
from account.views import UserRegistrationView,UserLoginView,ProfileView,ProfileEditView,ChangePasswordView,ResetPasswordEmailView,ResetPasswordByLinkView,NoteListCreateView,NoteDetailView

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('register', UserRegistrationView.as_view(),name='register'),
    path('login',UserLoginView.as_view(),name='login'),
    path('profile',ProfileView.as_view(),name='profile'),
    path('editprofile',ProfileEditView.as_view(),name='editprofile'),
    path('changepassword',ChangePasswordView.as_view(),name='changepassword'),
    path('reset-password',ResetPasswordEmailView.as_view(),name='reset-password'),
    path('resetpassword/<uid>/<token>',ResetPasswordByLinkView.as_view(),name='resetpassword'),
    path('notes/',NoteListCreateView.as_view(), name='note-list-create'),
    path('notes/<int:pk>/',NoteDetailView.as_view(), name='note-detail'),

    # path('notes',Nots.as_view(),name='notes')
    
         
    
]
