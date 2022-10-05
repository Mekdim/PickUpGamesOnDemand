const express = require('express');
const path = require('path');
const fs = require('fs');
const expressStaticGzip = require('express-static-gzip');

const app = express();
app.disable('x-powered-by');
const port = process.env.PORT || '9000';
app.set('port', port);

app.use(
  '/',
  expressStaticGzip(path.join(__dirname, '../build'), {
    enableBrotli: true, // only if you have brotli files too
  })
);
app.use(express.static(path.join(__dirname, '../build')));
app.get('/*', (req, res) => {
  res.setHeader('Cache-Control', 'max-age=31536000');
  //res.setHeader("Content-Encoding", "br");
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
  // res.sendFile(path.join(__dirname, "../kuas.tar.gz", "index.html"));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Example app listening on port 9000!\n');
});
