from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="notes"
    )

    # autofil with user information, one to many, one user many notes, link them
    # on deleting, also deleted linked notes
    # on user, you access .notes
    def __str__(self):
        return self.title


# now serialize this
