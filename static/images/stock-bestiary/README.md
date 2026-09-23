# stock-bestiary image conventions

- **Format:** JPEG
- **Max dimensions:** 600×600px (aspect ratio preserved)
- **Compression quality:** 85
- **Metadata:** stripped on processing
- **Naming:** lowercase company name, e.g. `haleon.jpg`

Process new images with Pillow:
```python
from PIL import Image
img = Image.open("raw.jpg")
img.thumbnail((600, 600), Image.LANCZOS)
clean = Image.new(img.mode, img.size)
clean.putdata(list(img.getdata()))
clean.save("output.jpg", "JPEG", quality=85, optimize=True)
```
