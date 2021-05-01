# Simple graphQL server for the [frontend chat app](https://github.com/bijay007/chat_react_client)
To run the app locally on port 4000, you just need to run the following scripts (written in bold)
-   **yarn** - installs all dependencies
-   **yarn serve** - build the app package and serves it from the local dist folder

This app was build with **graphql-yoga**. Main reasons being:
- Build on-top of express (node based web-server)
- Built-in support for graphQL subscription using websockets (pubsub pattern)
- Works quite nicely with the front-end chat app built with Apollo.
- Graphql playground to test your resolvers.
## Mock testing in graphQL playground
Once the project and is listening to port 4000, you can open up `localhost:4000` on your browser and tests many mock services (aka resolvers functions) in the playground.

for eg. A request as given below:

```js
query {
  getMockUser {
    name
    email
    privateChats {
      senderName
      receiverName
      message
    }
    publicChats {
      senderName
      message
      created
    }
  }
}
```
will return a response as below.
```js
{
  "data": {
    "getMockUser": {
      "name": "Bijay",
      "email": "xyz@gmail.com",
      "privateChats": [
        {
          "senderName": "Bijay",
          "receiverName": "Bijay v2",
          "message": "Hello myself :)"
        }
      ],
      "publicChats": [
        {
          "senderName": "Bijay",
          "message": "Hello eveyone",
          "created": "01/03/2021"
        }
      ]
    }
  }
}
```
