from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status,generics
from account.serializer import UserRegistrationSerializer,UserLoginSerializer,ProfileSerializer,ChangePasswordSerializer,ResetPasswordEmailSerailizer,ResetPasswordByLinkSerializer,NoteSerilaizer,AddNotesSerializer,UpdateNotesSerializer
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Note


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


# class Nots(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request,format=None):
        user=request.user
        notes=user.note_set.all()
        serializer=NoteSerilaizer(notes,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer=AddNotesSerializer(data=request.data,context={'user':request.user})
        serializer.is_valid(raise_exception=True)
        return Response({'msg':'Note Added Sucessesfully'},status=status.HTTP_200_OK)
    
    def put(self,request):
        
        serializer=UpdateNotesSerializer(data=request.data,context={'user':request.user})
        serializer.is_valid(raise_exception=True)
        return Response({'msg':'Note Updated Sucessesfully'},status=status.HTTP_200_OK)

class NoteListCreateView(generics.ListCreateAPIView):
    permission_classes=[IsAuthenticated]
    serializer_class=NoteSerilaizer

    def get_queryset(self):
        print(self.request.user)
        return Note.objects.filter(user=self.request.user)

    def perform_create(self,serializer):
        print(self.request.user)
        serializer.save(user=self.request.user)

class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerilaizer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)
 