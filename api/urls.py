from django.urls import path, include
from rest_framework import routers
from .views import (
    get_note,
    CustomTokenObtainPairView,
    get_users,
    CustomTokenRefreshView,
    logout,
    is_authenticated,
    register,
    create_note,
    delete_note,
    edit_note,
)

# router = routers.DefaultRouter()
# router.register(r"users", UsersViewSet)
# router.register(r"token", NoteViewSet)

urlpatterns = [
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),
    path("notes/", get_note),
    path("users/", get_users),
    path("logout/", logout),
    path("authenticated/", is_authenticated),
    path("register/", register),
    path("create/", create_note),
    path("delete/", delete_note),
    path("edit/", edit_note),
    # path("", include(router.urls)),
]
