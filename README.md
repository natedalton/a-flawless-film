# A Flawless Film, LLC Website

Professional landing page for Niki McElroy's production company.

## Features

- **Hero Section** - Dynamic slideshow with film posters as background
- **About Section** - Bio for Niki McElroy with photo and trust badges
- **Services Section** - Full production pipeline showcase (writing through distribution)
- **Films Section** - Showcases all three films with:
  - Movie posters
  - Clickable YouTube trailer thumbnails
  - Streaming links (Tubi, BET+, YouTube, Prime Video)
  - IMDb pages
- **Contact Form** - Professional inquiry form
- **Responsive Design** - Works on mobile, tablet, and desktop

## Films Included

1. **Soul of a Sister** (2025) - BET+ Original Drama
   - Trailer: https://www.youtube.com/watch?v=_JfFCumJWww
   - Streaming: BET+

2. **Haunted House of Pancakes** (2025) - Horror-Comedy
   - Trailer: https://www.youtube.com/watch?v=lLBAOYRpLP0
   - Streaming: Tubi, YouTube

3. **Shady Grove** (2022) - Occult Horror-Thriller (Best Feature Winner)
   - Trailer: https://www.youtube.com/watch?v=18njbzzRIWs
   - Streaming: Tubi, YouTube, Prime Video

## Quick Start

### Local Testing

Simply open `index.html` in a web browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (if you have http-server installed)
npx http-server
```

Then visit http://localhost:8000

## Deployment

### GitHub Pages (Free)
1. Create a GitHub repository
2. Upload all files
3. Enable GitHub Pages in Settings → Pages
4. Select main branch as source

### Netlify (Free)
1. Go to [netlify.com](https://www.netlify.com)
2. Drag and drop the folder

### Vercel (Free)
1. Go to [vercel.com](https://www.vercel.com)
2. Import project or drag and drop

### Traditional Hosting
Upload all files to your web host's public directory.

## Customization

### To add Niki's photo:

The photo is currently set to a placeholder. To use a real photo:

1. Place your photo in the `assets/` folder (e.g., `niki-headshot.jpg`)
2. Update `index.html` line ~62:
   ```html
   <img src="assets/niki-headshot.jpg" alt="Niki McElroy - Writer, Producer, Actress">
   ```

### To update film information:

Edit `js/data.js` to add, remove, or modify films. Each film object contains:
- `title`: Film name
- `year`: Release year
- `trailer`: YouTube URL
- `description`: Film synopsis
- `poster`: Image URL (can be local file in assets/)
- `streaming`: Array of streaming platforms
- `imdb`: IMDb URL

### To update contact email:

The contact form currently logs to console and shows an alert. To make it functional:

1. **Formspree** (simple free tier):
   - Sign up at formspree.io
   - Update the form tag in index.html:
     ```html
     <form action="https://formspree.io/f/your-id" method="POST">
     ```

2. **EmailJS**:
   - Sign up at emailjs.com
   - Follow their integration guide

3. **Custom backend**:
   - Modify the `setupContactForm()` function in `js/main.js`
   - Send data to your server endpoint

### To update bio/about text:
Edit the About section in `index.html` (lines ~47-88).

## File Structure

```
a-flawless-film/
├── index.html          # Main page
├── css/
│   └── style.css       # All styles
├── js/
│   ├── data.js         # Film data (add/modify films here)
│   └── main.js         # Interactive functionality
├── assets/             # Add your images here (Niki's photo, etc.)
└── README.md           # This file
```

## Dynamic Features

- **Hero Slideshow**: Automatically cycles through film poster images every 8 seconds with subtle zoom effect
- **YouTube Trailers**: Clickable thumbnails that open trailers in new tab
- **Scroll Animations**: Elements fade in as you scroll
- **Mobile Menu**: Hamburger menu for smaller screens

## Assets To Add

Consider adding these to the `assets/` folder:

- Niki McElroy's professional headshot
- Company logo (update nav logo if desired)
- Additional film stills or behind-the-scenes photos
- Social media links (currently placeholder in footer)

## Current Links

**Soul of a Sister:**
- Trailer: https://www.youtube.com/watch?v=_JfFCumJWww
- BET+: https://www.bet.plus/
- IMDb: https://www.imdb.com/title/tt23777476/

**Haunted House of Pancakes:**
- Trailer: https://www.youtube.com/watch?v=lLBAOYRpLP0
- Tubi: https://tubitv.com/movies/100050803/haunted-house-of-pancakes
- IMDb: https://www.imdb.com/title/tt30274534/

**Shady Grove:**
- Trailer: https://www.youtube.com/watch?v=18njbzzRIWs
- Tubi: https://tubitv.com/movies/705483/shady-grove
- IMDb: https://www.imdb.com/title/tt15262652/
