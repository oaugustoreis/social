from django.shortcuts import render
from .serializers import NoteSerializer, UsersSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Note, Users
from rest_framework.response import Response

from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


# Create your views here.
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data
            acess_token = tokens["access"]
            refresh_token = tokens["refresh"]
            res = Response()
            res.data = {"sucess": True}
            res.set_cookie(
                key="access_token",
                value=acess_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/",
            )
            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/",
            )
            return res
        except Exception as e:

            return Response({"sucess": False})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_note(request):
    user = request.user
    notes = Note.objects.filter(owner=user)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_users(request):
    users = Users.objects.all()
    serializer = UsersSerializer(users, many=True)
    return Response(serializer.data)


# class UsersViewSet(viewsets.ModelViewSet):
#     queryset = Users.objects.all()
#     serializer_class = UsersSerializer


# class NoteViewSet(viewsets.ModelViewSet):
#     queryset = Note.objects.all()
#     serializer_class = NoteSerializer
