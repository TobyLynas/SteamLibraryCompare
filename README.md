# SteamLibaryCompare

## Scripts

### Shared scripts

* `npm run dev`  
  Builds the project (watching for changes) and starts a development server.

* `npm run build`  
  Builds the project.

* `npm run start`  
  Runs the project in production mode. Compile with `npm run build` script first.

* `npm run lint`  
  Runs eslint.


## API:
To run the API server, navigate to the `api/` directory and run `npm run dev`. The server will start at [http://localhost:9000](http://localhost:9000).

Requires environent variables to be configured (see [api/.env.example](./api/.env.example)).

### Authentication

For API clients, authentication consists of:

1. Opening a frame at `[..]/auth/steam` that redirects to a `steampowered.com` sign-in page.
2. User enters credentials and completes the OpenID sign-in process.
3. Frame is redirected to return url at `[..]/auth/steam/return` and identifier is verified.
4. Return URL route response serves a page script with an embedded JWT. This is sent via postMessage <small>(format: `{ token: "..." }`)</small> for the web client, but could be manually parsed from the raw response source.
5. Provide JWT via `Authorization: Bearer <token>` header to authenticate subsequent API requests.
   
Minimal authenticated request example:

 ```http
 GET /proxy/steamworks/IPlayerService/GetOwnedGames/v1/?steamid=xxxxxxxxxxxxxxxxx HTTP/1.1
 Host: localhost:9000
 Connection: keep-alive
 Authorization: Bearer <token>
```

### APIs
#### `/proxy/steamworks`
`GET` `/proxy/steamworks/:path`
|Name|Type|Required|Description|
|-|-|-|-|
|path|`string`|`true`|Path (with query params) for original Steam interface/method to be proxied.|

Make a Steamworks Web API request via the API server. The Steam API key param is overridden in the proxied request, so does not require one to be passed by the consumer.


## Client:
To run the React client, enter the `client/` directory and run `npm run dev`. The client server will then run on [http://localhost:3000](http://localhost:3000).
