import path from 'path';
import webpack from 'webpack';
import pkg from './package.json';

const rootDir = path.resolve(__dirname);

export default ({ config }) => {
  console.log(config);
  return {
    ...config,
    entry: {
      grapesjs: config.entry,
      'plugins/grapesjs-hanbiro': `${rootDir}/plugins/hanbiro/src/index`
    },
    output: {
      ...config.output,
      library: '[name]',
      filename: '[name].min.js',
      libraryExport: 'default',
    },
    devServer: {
      headers: { 'Access-Control-Allow-Origin': '*' },
      disableHostCheck: true,
    },
    module: {
      rules: [
        // Disable AMD in vendors
        { test: /\.js$/, parser: { amd: false } },
        ...config.module.rules,
      ],
    },
    resolve: {
      modules: ['src', 'node_modules'],
      alias: {
        jquery: 'cash-dom',
        backbone: `${rootDir}/node_modules/backbone`,
        underscore: `${rootDir}/node_modules/underscore`,
      }
    },
    plugins: [
      new webpack.DefinePlugin({ __GJS_VERSION__: `'${pkg.version}'` }),
      ...config.plugins,
    ]
  }

};
