import { Configuration } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"

const config = ({ isProd }: Record<"isProd", boolean>): Configuration => {
  const base: Configuration = {
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
                configFile: "tsconfig.page.json",
              },
            },
          ],
          include: `${__dirname}/src`,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      modules: ["src", "node_modules"],
    },
    output: {
      path: `${__dirname}/dist`,
      filename: "[name].[hash].js",
      publicPath: "/",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
  }

  const prodConfig: Configuration = {
    ...base,
    mode: "production",
    devtool: "source-map",
  }

  const devConfig: Configuration = {
    ...base,
    mode: "development",
    devtool: "inline-source-map",
  }

  return isProd ? prodConfig : devConfig
}

export default config