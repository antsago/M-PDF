const HtmlWebpackPlugin = require("html-webpack-plugin")
const { transform } = require('@formatjs/ts-transformer')

module.exports = ({ isProd }) => {
  const base = {
    name: "page",
    target: "web",
    entry: {
      page: "./src/index.tsx",
    },
    module: {
      rules: [
        {
          test: /\.[t|j]sx?$/,
          enforce: "pre",
          use: ["source-map-loader"],
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  ["@babel/preset-env", { useBuiltIns: "usage", corejs: 3 }],
                  "@babel/preset-react",
                ],
              },
            },
            {
              loader: "ts-loader",
              options: {
                configFile: "tsconfig.json",
                getCustomTransformers() {
                  return {
                    before: [
                      transform({
                        overrideIdFn: '[sha512:contenthash:base64:6]',
                        removeDefaultMessage: isProd,
                      }),
                    ],
                  }
                },
              },
            },
          ],
          include: `${__dirname}/src`,
        },
        {
          test: /\.(png|jp(e*)g|svg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[hash]-[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      modules: ["./src", "node_modules"],
    },
    output: {
      path: `${__dirname}/dist`,
      filename: "[name].[fullhash].js",
      publicPath: "/",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
  }

  const prodConfig = {
    ...base,
    mode: "production",
    devtool: "source-map",

    output: {
      ...base.output,
      publicPath: "https://antsago.github.io/m-pdf",
    }
  }

  const devConfig = {
    ...base,
    mode: "development",
    devtool: "inline-source-map",
    watchOptions: {
      ignored: '/node_modules/',
    },
    devServer: {
      static: './dist',
      hot: true,
      open: true,
    },
  }

  return isProd ? prodConfig : devConfig
}
