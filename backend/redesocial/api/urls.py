from django.urls import path, include
from rest_framework import routers
from .views import get_note, CustomTokenObtainPairView, get_users
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

# router = routers.DefaultRouter()
# router.register(r"users", UsersViewSet)
# router.register(r"token", NoteViewSet)

urlpatterns = [
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("notes/", get_note),
    path("users/", get_users),
    # path("", include(router.urls)),
]
