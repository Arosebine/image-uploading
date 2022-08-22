Http/2 express server
[ ] Image upload using cloudinary

---

#### Create and sign https certificate on localhost

## how to serve https locally from your machine

> Install chocolatey on your windows machine

> install Install mkcert.

`choco install mkcert`

> Create a locally trusted CA with `mkcert -install`

> Generate an SSL certificate with `mkcert localhost`

> Init npm project

```javascript
import express from 'express';
import https from 'https';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Express routes here
// ...

// Listen with SSL
const server = https.createServer(
  {
    key: fs.readFileSync(`${__dirname}/certs/key.pem`, 'utf8'),
    cert: fs.readFileSync(`${__dirname}/certs/cert.pem`, 'utf8'),
  },
  app
);

server.listen(443, (_) => {
  console.log('App listening at https://localhost');
});
```
