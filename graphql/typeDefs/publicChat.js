module.exports = `
  type PublicChat {
    id: ID!
    created: String!
    senderId: ID!
    senderName: String!
    message: String!
  }
  type Query {
    getPublicMockChat: PublicChat,
    getPublicChats: [PublicChat],
  }
  type Mutation {
    createPublicMessage(senderId: ID!, senderName: String!, message: String!): PublicChat
  }
  type Subscription {
    getPublicMessage: PublicChat,
  }
`;
