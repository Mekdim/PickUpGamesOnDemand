/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();
const config = require("../webpack.dev");

const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

// Serve the files on port 3000.
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log("Example app listening on port 3000!\n");
});
