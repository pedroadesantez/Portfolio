# Assets Directory

This directory contains placeholder files for your portfolio assets. Replace these with your actual content:

## Required Files

### Images

- `avatar.png` - Your profile photo (300x300px recommended)
- `og-image.jpg` - Social media preview image (1200x630px)
- `project-1.jpg` through `project-4.jpg` - Project screenshots
- `testimonial-1.jpg` and `testimonial-2.jpg` - Testimonial photos

### Documents

- `resume.pdf` - Your resume/CV in PDF format

## Image Specifications

- **Profile photos**: 300x300px or 500x500px (square)
- **Project screenshots**: 800x600px or 1200x900px (4:3 ratio)
- **OG Image**: 1200x630px (for social media)
- **Testimonial photos**: 150x150px (will be displayed as circles)

## Fallback Behavior

The portfolio includes fallback handling:

- Missing project images won't break the layout
- Missing profile photos will show initials
- Components gracefully handle missing assets

## Quick Setup

You can create placeholder files with:

```bash
# Create empty placeholder files (replace with your actual content)
touch public/assets/avatar.png
touch public/assets/og-image.jpg
touch public/assets/project-{1..4}.jpg
touch public/assets/testimonial-{1..2}.jpg
touch public/assets/resume.pdf
```

Remember to optimize your images before uploading for best performance!
