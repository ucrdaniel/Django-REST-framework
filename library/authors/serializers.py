from rest_framework.relations import StringRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer,ModelSerializer


from  .models import Author,Biography,Book

class AuthorModelSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class AuthorCustomModelSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = ('first_name',)


class BiographyHyperlinkedModelSerializer(ModelSerializer):

    class Meta:
        model = Biography
        fields = '__all__'


class BookModelSerializer(ModelSerializer):


    class Meta:
        model = Book
        fields = '__all__'

class BookCustomModelSerializer(ModelSerializer):
    authors = AuthorModelSerializer()
    class Meta:
        model = Book
        fields = '__all__'