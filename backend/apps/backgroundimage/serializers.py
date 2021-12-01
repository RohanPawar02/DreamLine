from .models import BackgroundImg
from rest_framework import serializers


class BackgroundImgSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=True)
    name = serializers.CharField(required=True)

    class Meta:
        model = BackgroundImg
        fields = '__all__'
