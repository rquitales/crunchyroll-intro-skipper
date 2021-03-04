<p align="center">
  <a src="https://github.com/rquitales/crunchyroll-intro-skipper">
    <img src="https://github.com/rquitales/crunchyroll-intro-skipper/raw/main/src/assets/images/large_icon.png" width="75" height="75"/>
  </a>
</p>

<h1 align="center">Crunchyroll Intro Skipper</h1>

![build](https://github.com/rquitales/crunchyroll-intro-skipper/actions/workflows/ci.yml/badge.svg)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/rquitales/crunchyroll-intro-skipper)
![GitHub issues](https://img.shields.io/github/issues-raw/rquitales/crunchyroll-intro-skipper)
![GitHub](https://img.shields.io/github/license/rquitales/crunchyroll-intro-skipper)
![dependencies](https://status.david-dm.org/gh/rquitales/crunchyroll-intro-skipper.svg)
![devDependencies](https://status.david-dm.org/gh/rquitales/crunchyroll-intro-skipper.svg?type=dev)

#### Browser Extensions

<a href="https://chrome.google.com/webstore/detail/crunchyroll-intro-skipper/enphflaephhmabkpchhgkhkfcblbhiip" target="_blank"><img src="https://imgur.com/3C4iKO0.png" width="64" height="64"></a>
<a href="https://addons.mozilla.org/en-US/firefox/addon/crunchyroll-intro-skipper/" target="_blank"><img src="https://imgur.com/ihXsdDO.png" width="64" height="64"></a>

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
