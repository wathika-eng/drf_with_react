from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

"""
Django uses an ORM so it will handle all DB operations
API will use JSON, for communicating with web app and frontend
Will send JSON data to front and back
So serializer will convert the data to json format
"""


class UserSerializer(serializers.ModelSerializer):  # inherit from a class already made
    class Meta:
        model = User  # the model
        fields = ["id", "username", "password"]  # what to serialize
        extra_kwargs = {
            "password": {"write_only": True}
        }  # only accepts password when creating a new user, don't allow user to see it when seeing their info

    def create(self, validated_data):
        # A method to create a user if data is valid split kwargs from a dict
        user = User.objects.create_user(**validated_data)
        return user


class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}

    # def create(self, validated_data):
    #     note = Note.objects.create_note(**validated_data)
    #     return note


# Go to views after here
