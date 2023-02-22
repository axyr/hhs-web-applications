# Collection Vuejs Web Application

This is the vue js version of the Collection Web Application.

This version is written in plain HTMl, CSS and Javascript.

A live version of the application can be tested on:

[https://hhs-web-vue-applications.tcc.rocks/](https://hhs-web-vue-applications.tcc.rocks/)

If you want to run this code locally, you will need to setup a local domain.

When you use PHPStorm or another intelij editor, you can open the index.html file from there in a browser.

The reason that a hostname is required, is that javascript fetch() requires same site origin, which is not suppored when opening index.html with a system file path.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
