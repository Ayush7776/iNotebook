from rest_framework import serializers
from account.models import User,Note
from django.utils.encoding import smart_str,force_bytes,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework.serializers import ModelSerializer
from account.utils import Utils

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2=serializers.CharField(style={'input_type':'password'},write_only=True)
    class Meta:
        model=User
        fields=['id','email','name','password','password2','tc']
        extra_kwargs={
            'password':{'write_only':True}
        }
    def validate(self,attrs):
        password=attrs.get('password')
        password2=attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("Password And Confirm PassWord Does Not Match")
        return attrs
        
    def create(self,validate_data):
        return User.objects.create_user(**validate_data)
    

class UserLoginSerializer(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=250)

    class Meta:
        model=User
        fields=['email','password']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','email','name']

class ChangePasswordSerializer(serializers.Serializer):
    password=serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    password2=serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    
    class Meta:
        fields=['password','password2']
    def validate(self, attrs):
        password=attrs.get('password')
        password2=attrs.get('password2')
        user=self.context.get('user')
        if password !=password2:
            raise serializers.ValidationError("Password And Confirm Password Does Not Match")
        user.set_password(password)
        user.save()
        return attrs
class ResetPasswordEmailSerailizer(serializers.Serializer):
    email=serializers.CharField(max_length=255)
    class Meta:
        fields=['email']  
    def validate(self,attrs):
        email=attrs.get('email')
        if User.objects.filter(email=email).exists():
            user=User.objects.get(email=email)
            uid= urlsafe_base64_encode(force_bytes(user.id))
            print("Encoded UID",uid)
            token=PasswordResetTokenGenerator().make_token(user)
            print("Password reset Token",token)
            link=('http://127.0.0.1:8000/api/user/resetpassword/'+uid+'/'+token)
            # Send Email To User
            print('password Reset Link',link)
            body="Click Below Link To Reset Your Password"+link
            data={
                'subject':'Reset Your PassWord',
                'body':body,
                'to_email':user.email
            }
            # Sending An Email
            # Utils.send_email(data=data)
            return attrs
        else:
            raise serializers.ValidationError('You Are Not Register User')

class ResetPasswordByLinkSerializer(serializers.Serializer):
    password=serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    password2=serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    
    class Meta:
        fields=['password','password2']
    def validate(self,attrs):
        try:
            password=attrs.get('password')
            password2=attrs.get('password2')
            if password !=password2:
                raise serializers.ValidationError("Password And Confirm Password Not Matched")
            
            
            uid=self.context.get('uid')
            token=self.context.get('token')
            id=smart_str(urlsafe_base64_decode(uid))
            user=User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user,token):
                raise serializers.ValidationError("Token Is Not Valid Or Expired")
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as identifire:
            PasswordResetTokenGenerator().check_token(user,token)
            raise serializers.ValidationError("Token Is Not Valid Or Expired")
            

class NoteSerilaizer(ModelSerializer):
    class Meta:
        model=Note
        fields='__all__'

class AddNotesSerializer(ModelSerializer):
    note=serializers.CharField()

    class Meta:
        model=Note
        fields=['note']
    def validate(self, attrs):
        user=self.context.get('user')
        note=attrs.get('note')
        if user:
            Note.objects.create(user=user,note=note)
        else:
            raise serializers.ValidationError("User Not Found")
        return attrs
    