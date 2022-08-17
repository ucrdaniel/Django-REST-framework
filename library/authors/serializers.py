from rest_framework.relations import StringRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer,ModelSerializer


from  .models import Author,Biography,Book

class AuthorModelSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'
        #fields = ('first_name','last_name')
        #exclude = ('first_name')

class BiographyHyperlinkedModelSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = Biography
        fields = '__all__'


class BookModelSerializer(ModelSerializer):

    # authors = StringRelatedField(many=True)

    class Meta:
        model = Book
        fields = '__all__'