import cv2
import numpy as np
import io
from PIL import Image
import base64


def convertToBlob(frame):
    # Encode the frame as a binary string
    _, img_bytes = cv2.imencode(".png", frame)

    # Create a BytesIO object from the binary string
    img_io = io.BytesIO(img_bytes)

    # Create a blob URL from the image using base64 encoding
    blob_url = "data:image/png;base64," + base64.b64encode(img_bytes).decode()

    return blob_url
