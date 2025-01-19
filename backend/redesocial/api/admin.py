from django.contrib import admin
from .models import Users, Note


# Register your models here.
admin.site.register(Note)


@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = (
        "nome",
        "email",
        "telefone",
        "endereco",
        "criacao",
        "atualizacao",
        "ativo",
    )
