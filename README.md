# Academic Website + Blog (GitHub Pages)

This repository is ready to deploy to `https://guillemram.github.io`.

## Structure

- Main site: `/`
- Blog site: `/blog/`

## What to edit (easy content updates)

### Main website
- Profile/introduction: `data/profile.json`
- Publications: `data/publications.json`
- News: `data/news.json`
- Replace placeholder images in `assets/` and update JSON paths.

### Blog website
- Blog title/description: `blog/data/config.json`
- Blog posts list: `blog/data/posts.json`

## Deploy to GitHub Pages (User/Org site)

1. Create or use repo named exactly `guillemram.github.io`.
2. Upload all files in this folder to the root of that repo.
3. In GitHub repo settings:
   - `Pages` -> `Build and deployment`
   - `Source`: `Deploy from a branch`
   - Branch: `main` and folder `/ (root)`
4. Wait ~1 minute and open:
   - `https://guillemram.github.io`
   - `https://guillemram.github.io/blog/`

## Notes

- No build step needed: plain HTML/CSS/JS.
- Content is loaded from JSON files, so editing text is easy.
