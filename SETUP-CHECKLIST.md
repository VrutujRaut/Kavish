# Kavish Birthday Website Checklist

## Personalize the content

- [ ] Replace the sample timeline copy in `index.html` with your real memories.
- [ ] Replace the inside jokes in the classified cards.
- [ ] Edit the birthday message inside `script.js`.
- [ ] Update the final signature in `index.html`.

## Add photos

- [ ] Put your `.jpg`, `.jpeg`, `.png`, or `.webp` files in `assets/photos/`.
- [ ] Add each filename to `birthdayConfig.photos` in `script.js`.
- [ ] Keep paths relative, for example: `assets/photos/memory-01.jpg`.
- [ ] Use short filenames without spaces where possible.

## Add music

- [ ] Add a legally obtained `.mp3` file to `assets/music/`.
- [ ] Change the `<source src="...">` path in `index.html` to match it.
- [ ] Change `birthdayConfig.music` in `script.js` to the same path.
- [ ] Test the music button after clicking Enter; browsers block automatic audio playback.

## Test locally

- [ ] Open `index.html` in a browser.
- [ ] Test the Enter button, music button, navigation, lightbox, games, wish button, and secret button.
- [ ] Test the layout on a phone-sized viewport.
- [ ] Confirm every photo loads and the music file plays.

## Publish on GitHub Pages

- [ ] Create a GitHub repository.
- [ ] Upload `index.html`, `style.css`, `script.js`, `404.html`, `assets/`, and this checklist.
- [ ] Open repository Settings → Pages.
- [ ] Select the main branch and root folder.
- [ ] Open the generated GitHub Pages URL.
