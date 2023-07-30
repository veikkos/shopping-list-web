# Shopping List Web frontend with React

[![Node.js CI](https://github.com/veikkos/shopping-list-web/actions/workflows/node.js.yml/badge.svg)](https://github.com/veikkos/shopping-list-web/actions/workflows/node.js.yml)

[**Live at github.io**](https://veikkos.github.io/shopping-list-web)

[![Screenshot](https://raw.githubusercontent.com/veikkos/shopping-list-web/master/media/cover.png)](https://veikkos.github.io/shopping-list-web)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

AWS back-end implementation at https://github.com/veikkos/shopping-list-backend.

Implementation uses [Auth0](https://auth0.com/) for authentication.

## Prerequisites

Application needs configured backend and following environment variables:

* `REACT_APP_AUTH0_CLIENT_ID`
* `REACT_APP_AUTH0_DOMAIN`
* `REACT_APP_BACKEND_URL`
* `REACT_APP_SOURCE_CODE_URL`

## Available Scripts

In the project directory, you can run:

### `npm run start:dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It bundles React in production mode and optimizes the build for the best performance.

### `npm start`

Serve built app in production mode.
