const HtmlWebpackPlugin = require("html-webpack-plugin")

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
              },
            },
          ],
          include: `${__dirname}/src`,
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
      publicPath: "https://antsago.github.io/MPDF",
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
