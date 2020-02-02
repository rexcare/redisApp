/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
import { dependencies as externals } from '../app/package.json';

const MONACO_DIR = path.resolve(__dirname, './node_modules/monaco-editor');

export default {
  externals: [...Object.keys(externals || {})],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css$/,
        include: MONACO_DIR,
        use: ['css-loader']
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  },

  output: {
    path: path.join(__dirname, '..', 'app'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [path.join(__dirname, '..', 'app'), 'node_modules']
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),

    new webpack.NamedModulesPlugin(),

    new MonacoWebpackPlugin({
      languages: ['redis']
    })
  ]
};
