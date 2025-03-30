#!/bin/bash
# Script to create an optimized thumbnail version of the avatar image
# Requires cwebp command (install with: brew install webp)

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
  echo "cwebp is not installed. Please install it using: brew install webp"
  exit 1
fi

# Source image
SRC_IMAGE="/Users/prince.jain/Downloads/Blog/temp_repo/images/my-image.webp"
# Thumbnail output
OUT_IMAGE="/Users/prince.jain/Downloads/Blog/temp_repo/images/avatar-thumbnail.webp"

echo "Creating optimized avatar thumbnail..."

# Create a 140x140 thumbnail (2x for retina displays)
# First convert to png using dwebp, resize, then convert back to webp
if command -v dwebp &> /dev/null && command -v convert &> /dev/null; then
  # If ImageMagick is available, use it for best quality
  echo "Using ImageMagick for high-quality thumbnail generation..."
  dwebp "$SRC_IMAGE" -o temp.png
  convert temp.png -resize 140x140^ -gravity center -extent 140x140 temp-resized.png
  cwebp -q 90 temp-resized.png -o "$OUT_IMAGE"
  rm temp.png temp-resized.png
else
  # Fallback: directly use cwebp with resize option (less ideal)
  echo "Using cwebp for basic thumbnail generation..."
  cwebp -q 90 -resize 140 140 "$SRC_IMAGE" -o "$OUT_IMAGE"
fi

# Check if creation was successful
if [ -f "$OUT_IMAGE" ]; then
  echo "✅ Avatar thumbnail created successfully at $OUT_IMAGE"
  echo "Size of original: $(wc -c < "$SRC_IMAGE") bytes"
  echo "Size of thumbnail: $(wc -c < "$OUT_IMAGE") bytes"
else
  echo "❌ Failed to create thumbnail"
fi
