# Crunchyroll Intro Skipper

![build](https://github.com/rquitales/crunchyroll-intro-skipper/actions/workflows/ci.yml/badge.svg)

[![crunchyroll-intro-skipper](https://github.com/rquitales/crunchyroll-intro-skipper/raw/main/src/assets/images/large_icon.png)](https://github.com/rquitales/crunchyroll-intro-skipper)

---

This extension has been tested on the following titles:

- One Piece
- Naruto

The extension parses through the episode comments to determine if there any intro timestamps posted. If the extension is unable to determine a valid timestamp from the comments, it will fallback to using Crunchyroll's ad locations to determine the best position to skip forwards to.

Please [file an issue](https://github.com/rquitales/crunchyroll-intro-skipper/issues) if this extension does not work on other titles.

---

## Requirements

- [Node.js](https://nodejs.org/) (>=v10.16)
- Chrome (preferred), Opera, Edge or Firefox browser

## Dependencies

### Prod

- [Chrome Extension Types](https://www.npmjs.com/package/@types/chrome)

### Dev

- TypeScript
- Webpack
- [npm-run-all](https://www.npmjs.com/package/npm-run-all)

## Project Structure

- `src/`: TypeScript source files
- `src/assets`: Static files
- `dist`: Compiled Chrome Extension directory

## Build and Run

```sh
# Install node_modules
npm ci
# Compile Typescript source
npm run build
```

## Load Browser Extension (developer mode)

After compiling to javascript, you can then load the extension into your browser through the browser's extension tools page:

- Chrome/Opera:
  1. Type `chrome://extensions` in your address bar to bring up the extensions page.
  2. Enable developer mode (checkbox)
  3. Click the "Load unpacked extension" button, navigate to the `dist` folder of your local extension instance, and click "Ok".
- Firefox
  1. Type `about:debugging` in your address bar to bring up the add-ons page.
  2. Click the `Load Temporary Add-on` button, navigate to the `dist/manifest.json` file, and "Open".

## Contribute

Code contributions are welcome! Please commit any pull requests against the `main` branch.
