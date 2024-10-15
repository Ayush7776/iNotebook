from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from account.serializer import UserRegistrationSerializer,UserLoginSerializer,ProfileSerializer,ChangePasswordSerializer,ResetPasswordEmailSerailizer,ResetPasswordByLinkSerializer,NoteSerilaizer,AddNotesSerializer
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken



def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserRegistrationView(APIView):
    
    def post(self,request,format=None):
        serilizer=UserRegistrationSerializer(data=request.data)
        if serilizer.is_valid(raise_exception=True):
            user=serilizer.save()
            token=get_tokens_for_user(user)
            return Response({'msg':"Registration  Sucess",'token':token},status=status.HTTP_200_OK)
        return Response(serilizer.errors,status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):

    def post(self,request,format=None):
        serializer=UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email= serializer.data.get('email')
        password= serializer.data.get('password')
        user= authenticate(email=email,password=password)
        if user:
            print(user)
            token=get_tokens_for_user(user)
            return Response({'msg':'Login Sucessfully','token':token},status=status.HTTP_200_OK)
        else:
            return Response({'msg':'Enter Valid Email Or PassWord'},status=status.HTTP_404_NOT_FOUND)        
                

class ProfileView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request,format=None):
        serializer=ProfileSerializer(request.user)
        return Response(serializer.data,status=status.HTTP_200_OK)

class ChangePasswordView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        serializer=ChangePasswordSerializer(data=request.data,context={'user':request.user})
        serializer.is_valid(raise_exception=True)
        return Response({'msg':'Password Change SucessFully'},status=status.HTTP_200_OK)
        
        
class ResetPasswordEmailView(APIView):
    def post(self,request):
        serializer=ResetPasswordEmailSerailizer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'msg':'Responce Has Been Set To Registar Email'},status=status.HTTP_200_OK)
        

class ResetPasswordByLinkView(APIView):
    def post(self,request,uid,token):
        serializer=ResetPasswordByLinkSerializer(data=request.data,context={'uid':uid,'token':token})
        serializer.is_valid(raise_exception=True)
        return Response({'msg':'Password Reset SucessFully'},status=status.HTTP_200_OK)


class Nots(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request,format=None):
        user=request.user
        notes=user.note_set.all()
        serializer=NoteSerilaizer(notes,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer=AddNotesSerializer(data=request.data,context={'user':request.user})
        serializer.is_valid(raise_exception=True)
        return Response({'msg':'Not Added Sucessesfully'},status=status.HTTP_200_OK)



