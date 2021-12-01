import os
from secrets import token_hex
from config.settings import BASE_DIR, MEDIA_URL
from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw
from django.core.files.storage import FileSystemStorage
from apps.backgroundimage.serializers import BackgroundImgSerializer
from apps.backgroundimage.models import BackgroundImg
from rest_framework import generics
from rest_framework.response import Response


X_DEFAULT_VALUE = 12
Y_DEFAULT_VALUE = 12
LINE_DEFAULT_WIDTH = 200
MAX_TRANSPARENT_ALPHA = 255
COLOR_WHITE = "#FFFFFF"


def resize_image(logo, background_height):
    # Set basehight 15% of image background
    baseheight = int(background_height * 0.10)
    width, height = logo.size

    # Resize width base on image height
    width_resize = int((baseheight * float(width)/height))
    return width_resize, baseheight


def load_font():
    raleway_bold = ImageFont.truetype(font=os.path.abspath(
        os.path.join(BASE_DIR, 'fonts/Raleway-Bold.ttf')), size=18)
    raleway_medium = ImageFont.truetype(font=os.path.abspath(
        os.path.join(BASE_DIR, 'fonts/Raleway-Medium.ttf')), size=16)
    return raleway_bold, raleway_medium


def get_filename(extension):
    return "generated-background-{ramdom_string}.{extension}".format(
        ramdom_string=token_hex(16),
        extension=extension
    )


def generate_background_color(background_image):
    draw = ImageDraw.Draw(background_image, 'RGBA')
    width, height = background_image.size

    # Get 60% Height of Image Background Height
    gradian_height = int(height*0.6)

    # Set RGB Color
    r, g, b = 38, 79, 88

    # Loop through gradian_height to draw line with Gradian Transparent Color
    for i in range(gradian_height):
        # Maximum Transparent Alpha
        alpha = MAX_TRANSPARENT_ALPHA

        # Make sure start line is with Maximum Transparent Alpha
        if i > 0:

            # decrement as percentage of Transparent Alpha
            alpha = (gradian_height-i)/gradian_height * MAX_TRANSPARENT_ALPHA

        # Draw line from Top to Bottom to make Transparent Image Background
        draw.line((0, i, width, i), fill=(int(r), int(g), int(b), int(alpha)))

    return draw


class BackgroundImgList(generics.ListAPIView):
    queryset = BackgroundImg.objects.all()
    serializer_class = BackgroundImgSerializer


class BackgroundImgAdd(generics.CreateAPIView):
    queryset = BackgroundImg.objects.all()

    def post(self, request, *args, **kwargs):
        # Get uploaded file logo
        image_file = request.data['image']

        # Save and get open url
        fss = FileSystemStorage()
        file = fss.save(image_file.name, image_file)

        # Replace first '/' because open function doesn't support /uploads/images
        file_url = fss.url(file).replace('/', '', 1)

        # Open image logo
        new_image = Image.open(file_url)

        # Need to convert to RGB in order to change file extension
        if new_image.mode != "RGB":
            new_image = new_image.convert("RGB")

        # Get new filename
        filename = "background-{ramdom_string}.jpg".format(
            ramdom_string=token_hex(16))

        # Save new image with jpg extension
        new_image.save(MEDIA_URL+str(filename))

        # Remove old file
        if os.path.exists(MEDIA_URL+str(file)) is True:
            os.remove(MEDIA_URL+str(file))

        # Save to database
        new_background_image = BackgroundImg.objects.create(
            image=filename,
            name=request.data['name'],
        )

        # Convert Model to Serializer
        serializer = BackgroundImgSerializer(new_background_image)

        # Response data as Dict
        return Response(serializer.data)
