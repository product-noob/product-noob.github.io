#!/bin/bash
# Script to convert images to WebP format
# Prerequisites: cwebp needs to be installed
# You can install it with: brew install webp

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
  echo "cwebp is not installed. Please install it using: brew install webp"
  exit 1
fi

# Create directory if it doesn't exist
mkdir -p scripts

# Convert all jpg, png, and jpeg files in the images directory to webp
find ./images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | while read -r file; do
  # Get the file name without the extension
  filename=$(basename -- "$file")
  name="${filename%.*}"
  directory=$(dirname "$file")
  
  # Set the output path
  output="$directory/$name.webp"
  
  # Skip if the WebP version already exists
  if [ -f "$output" ]; then
    echo "Skipping $file, $output already exists"
    continue
  fi
  
  echo "Converting $file to $output"
  
  # Convert to WebP with 80% quality
  cwebp -q 80 "$file" -o "$output"
done

echo "Conversion complete!"
