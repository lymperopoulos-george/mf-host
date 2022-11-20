const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { resolve } = require('path');
const ModuleFederationPlugin =
  require('webpack').container.ModuleFederationPlugin;
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const deps = require('./package.json').dependencies;

const moduleFederationConfig = new ModuleFederationPlugin({
  name: 'host-app',
  shared: {
    react: { singleton: true, eager: true, requiredVersion: deps.react },
    'react-dom': {
      singleton: true,
      eager: true,
      requiredVersion: deps['react-dom'],
    },
  },
});

const factory = (env, argv) => {
  const tsLoaderTransformers = [];

  if (argv.hot) {
    tsLoaderTransformers.push(ReactRefreshTypeScript());
  }
  const config = {
    target: 'web',
    mode: 'development',
    entry: ['./src/index'],
    output: {
      path: resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      publicPath: 'auto',
      clean: true,
    },
    devServer: {
      port: 8080,
      historyApiFallback: true,
      client: {
        overlay: true,
      },
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      plugins: [new TsconfigPathsPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.m?js/,
          use: ['source-map-loader'],
        },
        {
          test: /\.(pdf|xml)$/i,
          type: 'asset/inline',
        },
        {
          test: /\.(svg|png|jpg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                getCustomTransformers() {
                  return {
                    before: tsLoaderTransformers,
                  };
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new ESLintPlugin(),
      moduleFederationConfig,
    ],
  };
  return new Promise((resolve) => {
    if (argv.hot) {
      config.output.filename = '[name].[fullhash].js';
      config.plugins.push(new ReactRefreshWebpackPlugin());
    }
    config.devtool = 'inline-source-map';
    config.plugins.push(new CopyPlugin({ patterns: [{ from: 'public' }] }));
    config.entry.unshift('./resources/mocks/index');
    return resolve(config);
  });
};

module.exports = factory;
