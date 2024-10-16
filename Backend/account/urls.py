from django.urls import path,include
from account.views import UserRegistrationView,UserLoginView,ProfileView,ChangePasswordView,ResetPasswordEmailView,ResetPasswordByLinkView,Nots
urlpatterns = [
    path('register', UserRegistrationView.as_view(),name='register'),
    path('login',UserLoginView.as_view(),name='login'),
    path('profile',ProfileView.as_view(),name='profile'),
    path('changepassword',ChangePasswordView.as_view(),name='changepassword'),
    path('reset-password',ResetPasswordEmailView.as_view(),name='reset-password'),
    path('resetpassword/<uid>/<token>',ResetPasswordByLinkView.as_view(),name='resetpassword'),
    path('notes',Nots.as_view(),name='notes')
    
         
    
]
