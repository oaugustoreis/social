from rest_framework_simplejwt.authentication import JWTAuthentication


class CookiesJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get("HTTP_AUTHORIZATION")

        if not auth_header or not auth_header.startswith("Bearer "):
            return None

        access_token = auth_header.split(" ")[1]

        validated_token = self.get_validated_token(access_token)

        try:
            user = self.get_user(validated_token)
        except Exception as e:
            return None

        return (user, validated_token)
