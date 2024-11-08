from django.contrib import admin
from .models import User,Note
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Register your models here.

class UserAdmin(BaseUserAdmin):


    list_display = ["id","email", "name", "is_admin","tc"]
    list_filter = ["is_admin"]
    fieldsets = [
        ("User Credentials", {"fields": ["email", "password",]}),
        ("Personal info", {"fields": ["name"]}),
        ("Permissions", {"fields": ["is_admin"]}),
    ]
    
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "name","tc", "password1", "password2"],
            },
        ),
    ]
    search_fields = [""]
    ordering = ["email","id"]
    filter_horizontal = []


class NoteAdmin(admin.ModelAdmin):
    list_display = ["id","user","note",]
    list_filter = ["user"]
    ordering = ["user","id"]
    search_fields = ["note","id"]


# Now register the new UserAdmin...
admin.site.register(User, UserAdmin)
admin.site.register(Note,NoteAdmin)