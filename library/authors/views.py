from django.contrib.auth.models import User
from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import renderer_classes
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer

from rest_framework.viewsets import ModelViewSet

from .models import Author, Biography, Book
from .serializers import AuthorModelSerializer,BookModelSerializer,BiographyHyperlinkedModelSerializer,\
    BookCustomModelSerializer,AuthorCustomModelSerializer
from rest_framework.permissions import AllowAny, BasePermission

class SuperUserOnly(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_superuser

class AuthorModelViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer,BrowsableAPIRenderer]
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return AuthorCustomModelSerializer
        return AuthorModelSerializer


class BiographyModelViewSet(ModelViewSet):

    queryset = Biography.objects.all()
    serializer_class = BiographyHyperlinkedModelSerializer

class BookModelViewSet(ModelViewSet):

    queryset = Book.objects.all()
    serializer_class = BookModelSerializer
    permission_classes = [SuperUserOnly]

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return BookCustomModelSerializer
        return BookModelSerializer