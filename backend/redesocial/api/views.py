from django.shortcuts import render
from .serializers import NoteSerializer, UsersSerializer, UserRegistrationSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
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
            access_token = tokens["access"]
            refresh_token = tokens["refresh"]
            res = Response()
            res.data = {
                "success": True,
                "access_token": access_token,
                "refresh_token": refresh_token,
            }
            res.set_cookie(
                key="access_token",
                value=access_token,
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

            return Response({"success": False})


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get("refresh_token")
            request.data["refresh"] = refresh_token

            response = super().post(request, *args, **kwargs)
            tokens = response.data
            access_token = tokens["access"]
            res = Response()
            res.data = {"refreshed": True}
            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/",
            )
            return res
        except:
            return Response({"refreshed": False})


@api_view(["POST"])
@permission_classes([AllowAny])
def logout(request):
    try:
        res = Response()
        res.data = {"success": True}
        res.delete_cookie("refresh_token", path="/", samesite="None")
        res.delete_cookie("access_token", path="/", samesite="None")
        return res
    except:
        res = Response({"success": False})
        return res


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    return Response({"authenticated": True})


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_note(request):
    user = request.user
    notes = Note.objects.filter(owner=user)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def delete_note(request):
    try:
        noteid = request.data["id"]
        print(noteid)
        note = Note.objects.get(id=request.data["id"])
        note.delete()
        return Response({"success": True})
    except Note.DoesNotExist:
        return Response({"success": False, "error": "Note not found"}, status=404)
    except Exception as e:
        return Response({"success": False, "error": str(e)}, status=500)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_users(request):
    users = Users.objects.all()
    serializer = UsersSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_note(request):
    try:
        user = request.user
        data = request.data
        data["owner"] = user.id
        serializer = NoteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
    except:
        return Response({"success": False})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def edit_note(request):
    try:
        note_id = request.data.get("id")
        note = Note.objects.get(id=note_id["id"])
        note.description = request.data.get("description")
        note.save()
        return Response({"success": True})
    except Note.DoesNotExist:
        return Response({"success": False, "error": "Note not found"}, status=404)
    except Exception as e:
        return Response({"success": False, "error": str(e)}, status=500)
