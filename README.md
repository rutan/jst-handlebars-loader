# jst-handlebars-loader

## install

```
npm install @rutan/jst-handlebars-loader
```

## Usage

install [handlebars](https://handlebarsjs.com/) and this loader.

```
npm install --dev handlebars @rutan/jst-handlebars-loader
```

add settings to `webpack.config.js`

```
// webpack.config.js

module.exports = {
  module: {
    loaders: [
      {
        test: /\.hbs$/,
        loader: '@rutan/jst-handlebars-loader',
        options: { ... }
      }
    ]
  },
  resolve: {
    alias: {
      'handlebars' : 'handlebars/dist/handlebars.js'
    }
  }
};
```

### Options

#### name
- Type: `(relativeFilePath: string, absoluteFilePath: string) => string` | `undefined`
- Default: `undefined`

#### basePath
- Type: `string`
- Default: `.`

#### global
- Type: `string`
- Default: `global`
