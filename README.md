# Book-store :books:

## Installation

1. Use the package manager [yarn](https://yarnpkg.com/) to install packages.

2. Just type in terminal:

```bash
yarn install
```

and after all packages will downloaded:

```bash
yarn start
```

3. Enjoy!


## Commands

Start project:

```bash
yarn start
```

Watch DB:

```bash
yarn db
```

Start only Webpack Dev without DB:

```bash
yarn start-webpack-dev-server
```

Build project:

```bash
yarn build
```

Test project:

```bash
yarn test
yarn test:coverage
yarn test:watch
```
Lint project:

```bash
yarn lint
yarn fix
```

Typescript problems check project:

```bash
yarn tsc
```

Format code with Prettier:

```bash
yarn pretty
```

## Techs

1. React
    1. Redux
       1. React-Redux
       2. Redux-logger & Redux-devtools-extension
       3. Redux-saga & Redux-saga-test-plan
2. Babel
3. Enzyme & Jest
4. Webpack
5. Typescript
6. Less
7. Normalize.css
8. Eslint
9. Prettier
10. FontAwesome
11. Axios
12. Json-server


## Usage
You can change server port in this way:

```js
// config/webpack.dev.js
{
    host: "0.0.0.0", // you can set your IP address here for viewing on you local devices
    port: 8080,
  },
```

Also if you need, you can change the db port:

```json
// ./package.json
"db": "json-server --watch db.json --port 4000", // - change the port here
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Links

  - [Instagram](https://www.instagram.com/_daniels11/)
  - [Facebook](https://www.facebook.com/nightly.ds)
