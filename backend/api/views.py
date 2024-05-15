from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Note
from rest_framework import generics
from .serializers import UserSerializer, NotesSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


class NoteListCreate(generics.ListAPIView):
    serializer_class = NotesSerializer
    permission_classes = [IsAuthenticated]
    """
    Views notes based on a specific user
    filter notes based on a user
    """

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    """
    override creating notes, method override
    if the data is valid, seriealze the data and add author
    """

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDestroy(generics.DestroyAPIView):
    serializer_class = NotesSerializer
    permission_classes = [IsAuthenticated]

    # only delete notes created by you
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)


# inherit from generics so as to create api
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()  # this ensure only new users can be created
    serializer_class = UserSerializer  # which data to accept
    permission_classes = [AllowAny]  # who can create users, allow everybody


class CreateNoteView(generics.CreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NotesSerializer
    permission_classes = [IsAuthenticated]


# Go to urls.py
