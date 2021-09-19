# Authentication

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

# API docs

## `/polls`

### 🔒 `POST` `/polls`  

Creates a poll and returns the ID.  
Example post body:
```json
{
    "name": "Example Poll",
    "options": [
        { "content": "Game One" }
        { "content": "Game Two" }
    ]
}
```

**Note:** Must be authenticated to call this API.


### 🔒 `DELETE` `/polls/:pollId`
|Name|Type|Required|Description|
|-|-|-|-|
|`pollId`|`string`|`true`|ID of poll to delete.|

Deletes a poll. May only be called by the user that authored the poll.

**Note:** Must be authenticated to call this API.

### `GET` `/polls/:pollId`
|Name|Type|Required|Description|
|-|-|-|-|
|`pollId`|`string`|`true`|ID of poll to fetch details for.|

Returns a poll object if found.  
Example response:
```json
{
    "id": "xxxxxxxx",
    "name": "Example Poll",
    "authorId": "xxxxxxxxxxxxxxxxx",
    "options": [
        {
            "content": "Game One",
            "votes": []
        },
        {
            "content": "Game Two",
            "votes": [
                {
                  "voterIp": "::ffff:127.0.0.1"
                }
            ]
        },
  ]
}
```

Vote objects will contain a `voterId` property if the vote was cast by an authenticated user.

### `PUT` `/polls/vote/:pollId/:optionIndex`
|Name|Type|Required|Description|
|-|-|-|-|
|`pollId`|`string`|`true`|ID of poll to vote on.|
|`optionIndex`|`number`|`true`|Index of the poll option to vote for. Must be an integer.|

Votes for a poll option. A vote on a given poll may be cast only once per-IP address (or Steam ID for authenticated users).

<hr />

## `/proxy/steamworks`

### `GET` `/proxy/steamworks/:path`
|Name|Type|Required|Description|
|-|-|-|-|
|`path`|`string`|`true`|Path (with query params) for original Steam interface/method to be proxied.|

Make a Steamworks Web API request via the API server. The Steam API key param is overridden in the proxied request, so does not require one to be passed by the consumer.
