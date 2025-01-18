from .models import Users, Note
from rest_framework import serializers


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = "__all__"


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"
