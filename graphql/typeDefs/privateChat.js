module.exports = `
  type PrivateChat {
    id: ID!
    created: String!
    senderId: ID!
    senderName: String!
    receiverId: String!
    receiverName: String!
    message: String!
  }
  type Query {
    getPrivateMockChat(senderName: String!, receiverName: String!): PrivateChat,
    getPrivateChats: [PrivateChat],
  }
  type Mutation {
    createPrivateChat(senderId: ID!, senderName: String!,
      receiverId: String!, receiverName: String!, message: String!
    ): PrivateChat
  }
  type Subscription {
    getPrivateChats: PrivateChat
  }
`;
