# Monochrome Flow - Project Setup

## Directory Structure

```
monochrome-flow/
├── .eleventy.js              # Eleventy config
├── package.json              # Dependencies
├── .gitignore
├── netlify.toml              # Netlify config
├── src/
│   ├── _data/
│   │   └── site.json         # Site metadata
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk      # Base HTML template
│   │   │   └── portrait.njk  # Individual portrait page
│   │   └── components/
│   │       ├── header.njk
│   │       ├── footer.njk
│   │       └── gallery-grid.njk
│   ├── portraits/            # ⭐ YOUR PHOTOS GO HERE
│   │   ├── portrait-01.md
│   │   ├── portrait-01.jpg
│   │   ├── portrait-02.md
│   │   ├── portrait-02.jpg
│   │   └── ...
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   │       └── gallery.js
│   └── index.njk             # Homepage/gallery
└── _site/                    # Generated output (ignored)
```

## How to Use

### Adding a New Portrait

1. **Add your photo** to `src/portraits/`:
   - Example: `urban-solitude.jpg`

2. **Create a matching markdown file** with the same name:
   - Example: `urban-solitude.md`

3. **Fill in the metadata**:

```markdown
---
title: Urban Solitude
date: 2024-03-15
mood: 
  - contemplative
  - urban
  - minimal
recipe: Classic Chrome +2
camera: Fuji X-T4
lens: XF 56mm f/1.2
aperture: f/2.0
shutter: 1/250s
iso: 400
featured: true
---

Optional description or story about this photograph...
```

That's it! The site will automatically pick up the image and metadata.

## Setup Instructions

### 1. Initialize Project

```bash
# Clone your repo
git clone https://github.com/yourusername/monochrome-flow.git
cd monochrome-flow

# Install dependencies
npm install
```

### 2. Development

```bash
# Run local dev server
npm run dev

# Visit http://localhost:8080
```

### 3. Deploy to Netlify

- Connect your GitHub repo to Netlify
- Build command: `npm run build`
- Publish directory: `_site`
- Auto-deploys on every push to main branch

## Metadata Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Portrait title |
| `date` | Yes | Shooting date (YYYY-MM-DD) |
| `mood` | No | Array of mood tags |
| `recipe` | No | Film simulation recipe |
| `camera` | No | Camera body |
| `lens` | No | Lens used |
| `aperture` | No | f-stop |
| `shutter` | No | Shutter speed |
| `iso` | No | ISO value |
| `featured` | No | Show on homepage (true/false) |

## Image Recommendations

- **Format**: JPG (JPEG)
- **Color**: Already converted to B&W
- **Size**: 2400px on long edge (resized from X-T4 originals)
- **Orientation**: Portrait (3:4 ratio works best)
- **File size**: Under 2MB per image

## Customization

- **Colors**: Edit `src/assets/css/style.css`
- **Layout**: Modify templates in `src/_includes/`
- **Site info**: Update `src/_data/site.json`

## Next Steps

1. Copy the configuration files (next artifacts)
2. Run `npm install`
3. Add your first portrait + markdown file
4. Test locally with `npm run dev`
5. Push to GitHub and deploy via Netlify