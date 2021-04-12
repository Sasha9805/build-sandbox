const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = (env) => {

  const { mode = 'development' } = env;

  const isProd = mode === 'production';
  const isDev = mode === 'development';

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader'
    ];
  };

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        title: 'Hello World',
        buildTime: new Date().toISOString(),
        template: "public/index.html"
      }),
      new CleanWebpackPlugin()
    ];

    if (isProd) {
      plugins.push(new MiniCssExtractPlugin({
        filename: 'main-[hash:8].css'
      }));
    }

    return plugins;
  };

  return {
    mode: isProd ? 'production' : isDev && 'development',

    target: "web",

    output: {
      filename: isProd ? 'main-[hash:8].js' : undefined,
      path: path.resolve(process.cwd(), 'dist')
    },

    devServer: {
      open: true
    },

    module: {
      rules: [

        // Loading Babel
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },

        // Loading Images
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: '[name]-[sha1:hash:7].[ext]'
              }
            }
          ]
        },

        // Loading fonts
        {
          test: /\.(eot|ttf|woff|woff2|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
                name: '[name].[ext]'
              }
            }
          ]
        },

        // Loading CSS
        {
          test: /\.(css)$/,
          use: getStyleLoaders()
        },

        // Loading SCSS/SASS
        {
          test: /\.(s[ac]ss)$/,
          use: [
            ...getStyleLoaders(),
            'sass-loader'
          ]
        }
      ]
    },

    plugins: getPlugins()
  };
};