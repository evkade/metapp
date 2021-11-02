import path from "path";

const loaders = [];

loaders.push({
  // tests: /\.jsx?$/,
  exclude: /node_modules/,
  use: "babel-loader",
});

loaders.push({
  test: /\.s[ac]ss$/i,
  use: [
    { loader: "style-loader" },
    { loader: "css-loader" },
    { loader: "sass-loader" },
  ],
});

loaders.push({
  test: /\.(png|jpe?g|gif|\.ico$|)$/i,
  use: [
    "file-loader",
    {
      loader: "image-webpack-loader",
      options: {
        bypassOnDebug: true, // webpack@1.x
        disable: true, // webpack@2.x and newer
      },
    },
  ],
});

loaders.push({
  test: /\.(t|j)sx?$/,
  loader: "ts-loader",
  exclude: /node_modules/,
});

loaders.push({
  enforce: "pre",
  test: /\.js$/,
  loader: "source-map-loader",
  exclude: /node_modules/,
});

export default {
  entry: {
    app: "./src/app.tsx",
  },
  resolve: {
    alias: {
      components: path.resolve(path.resolve(), "/components"),
      images: path.resolve(path.resolve(), "/components/images"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: loaders,
  },
  output: {
    filename: "main.bundle.js",
    // dist is all the code that we want the browser to be able to reach
    // join: combine two strings into a path
    // resolve: give the current path that you are in
    path: path.resolve(path.resolve(), "dist"),
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/socket.io": {
        target: "http://127.0.0.1:5000",
        ws: true,
      },
    },
  },
};
