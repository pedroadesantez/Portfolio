# Placeholder Assets Guide

This project includes references to several assets that you'll need to replace with your own content. Here's what you need to add:

## Required Images

### Profile & Personal
- `public/assets/avatar.png` - Your profile photo (300x300px recommended)
- `public/assets/og-image.jpg` - Open Graph image for social media (1200x630px)

### Project Screenshots
- `public/assets/project-1.jpg` - HarmonyBot project screenshot
- `public/assets/project-2.jpg` - EcoTracker project screenshot  
- `public/assets/project-3.jpg` - DevFlow project screenshot
- `public/assets/project-4.jpg` - FinanceAI project screenshot

### Testimonials
- `public/assets/testimonial-1.jpg` - Sarah Johnson's photo (150x150px)
- `public/assets/testimonial-2.jpg` - Michael Chen's photo (150x150px)

## Documents
- `public/assets/resume.pdf` - Your resume/CV in PDF format

## Image Specifications

### Optimal Sizes
- **Profile photos**: 300x300px or 500x500px (square)
- **Project screenshots**: 800x600px or 1200x900px (4:3 ratio)
- **OG Image**: 1200x630px (for social media)
- **Testimonial photos**: 150x150px (circular display)

### Format Recommendations
- **Photos**: JPEG or WebP (optimized for web)
- **Screenshots**: PNG for UI elements, JPEG for photos
- **Icons/Graphics**: SVG when possible for scalability

## How to Add Your Images

1. **Replace placeholder images** in the `public/assets/` directory
2. **Update image paths** in `src/data/site-data.json` if you change filenames
3. **Optimize images** using tools like [TinyPNG](https://tinypng.com/) or Next.js automatic optimization

## Fallback Behavior

If images are missing, the components include fallback behavior:
- Project cards will hide broken images automatically
- Profile sections will show initials or default avatars
- OG images will fallback to default Next.js behavior

## Quick Setup Command

Create the required directories and placeholder files:

```bash
mkdir -p public/assets
touch public/assets/avatar.png
touch public/assets/og-image.jpg
touch public/assets/project-{1..4}.jpg
touch public/assets/testimonial-{1..2}.jpg
touch public/assets/resume.pdf
```

## Image Generation Tools

### For Professional Photos
- [Canva](https://canva.com) - Design templates
- [Unsplash](https://unsplash.com) - Stock photos
- [Pexels](https://pexels.com) - Free stock images

### For Screenshots & Mockups
- [Cleanshot](https://cleanshot.com) - Mac screenshot tool
- [Figma](https://figma.com) - Design mockups
- [Screely](https://screely.com) - Browser mockups

### For Optimization
- [TinyPNG](https://tinypng.com) - Image compression
- [Squoosh](https://squoosh.app) - Image optimization
- [ImageOptim](https://imageoptim.com) - Mac image optimizer

Remember to update the alt text and descriptions in the components to match your actual images!