from .models import Users, Note
from rest_framework import serializers
from django.contrib.auth import get_user_model

from django.contrib.auth.models import User, AbstractUser


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
        ]

    def create(self, validated_data):
        user = User(
            username=validated_data["username"],
            email=validated_data["email"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = "__all__"


class NoteSerializer(serializers.ModelSerializer):
    owner_name = serializers.CharField(
        source="owner.username", read_only=True
    )  # ou 'owner.name' se o campo for 'name'

    class Meta:
        model = Note
        fields = "__all__"
