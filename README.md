# SteamLibaryCompare

## Scripts

### Shared scripts

* `npm run dev`  
  Builds the project (watching for changes) and starts a development server.

* `npm run build`  
  Builds the project.

### API scripts

* `npm run start`  
  Runs the project in production mode. Compile with `npm run build` script first.

* `npm run lint`  
  Runs eslint.

### Client scripts

* `npm run test`  
  Runs tests.


## Server:

### Setup

Before running the API server, generate a TLS certificate with OpenSSL, ensuring that the output paths match the cert/key file variables set in [`.env`](./.env):
```sh
openssl req -newkey rsa:2048 -nodes -keyout tls/key.pem -x509 -days 365 -out tls/cert.pem
```
Above outputs:
* `tls/cert.pem` (TLS_CERT_FILE)
* `tls/key.pem` (TLS_KEY_FILE)

### Running

To run the API server, navigate to the `api/` directory and run `npm run dev`. The server will start at [https://localhost:9000](https://localhost:9000).

Requires environment variables to be configured (see [`api/.env.example`](./api/.env.example)).

For additional info, see [`api/README.md`](api/README.md).



## Client:
To run the React client, enter the `client/` directory and run `npm run dev`. The client server will then run on [http://localhost:3000](http://localhost:3000).

Requires environent variables to be configured (see [api/.env.example](./client/.env.example)).
