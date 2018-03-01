require('dotenv').config();
const express = require('express');
const next = require('next');

const PORT = process.env.PORT || 8080;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/metadata/update/:resource', (req, res) =>
    app.render(req, res, '/metadata/update', {
      ...req.query,
      resource: req.params.resource
    })
  );

  server.get('/feeds/:context', (req, res) =>
    app.render(req, res, '/feeds/context', {
      ...req.query,
      context: req.params.context
    })
  );

  server.get('*', (req, res) => {
    handle(req, res);
  });

  server.listen(PORT, err => {
    if (err) {
      throw err;
    }
    console.log(`Listening on port ${PORT}`); // eslint-disable-line
  });
});
