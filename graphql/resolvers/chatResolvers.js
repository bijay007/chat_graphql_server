// Contains function that resolve the graph queries, mutations and subscriptions

import chalk from 'chalk';
import dayjs from 'dayjs';

// db
import PublicChatModel from '/database/schema/chats/publicChat';
import PrivateChatModel from '/database/schema/chats/privateChat';
import dbLogger from '/helpers/logger';

const PUBLIC_CHAT_SUBSCRIPTION_CHANNEL = 'PUBLIC_CHAT_CHANNEL';
const PRIVATE_CHAT_SUBSCRIPTION_CHANNEL = 'PRIVATE_CHAT_CHANNEL';

const chatResolvers = {
  Query: {
    getPublicMockChat: () => {
      const date = new Date();
      const publicMockChat = new PublicChatModel({
        id: `_${Date.now()}`,
        created: date.toLocaleString(),
        senderId: `_${Math.random().toString(36).substr(2, 9)}`,
        senderName: 'Administrator',
        message: 'This is a test message !!',
      });
      console.log(`${chalk.green.bold('QUERY : getPublicMockChat')} : TRIGGERED`);
      process.env.HOSTNAME === 'localhost'
        ? publicMockChat.save((err, data) => dbLogger('SAVE', err, data))
        : null;
      return publicMockChat;
    },
    getPrivateMockChat: (_, args) => {
      const date = new Date();
      const privateMockChat = new PrivateChatModel({
        id: `_${Date.now()}`,
        created: date.toLocaleString(),
        senderId: `_${Math.random().toString(36).substr(2, 9)}`,
        senderName: args.senderName,
        receiverId: `_${Math.random().toString(36).substr(2, 9)}`,
        receiverName: args.receiverName,
        message: 'Hope only you see this message :D',
      });
      console.log(`${chalk.green.bold('QUERY : getPrivateMockChat')} : TRIGGERED`);
      process.env.HOSTNAME === 'localhost'
        ? privateMockChat.save((err, data) => dbLogger('SAVE', err, data))
        : null;
      return privateMockChat;
    },
    getPublicChats: () => PublicChatModel.find(dbLogger.bind(null, 'FIND'))
  },

  Mutation: {
    createPublicMessage(parent, { senderId, senderName, message }, { pubsub }) {
      /*       receiverId
        ? this.createPublicMessage()
        : this.createOneToOneMessage() */
      const date = new Date();
      const newChatAdded = new PublicChatModel({
        id: `_${Date.now()}`,
        created: dayjs(date).format('D MMM, HH:mm A'),
        senderId,
        senderName,
        message,
      });
      console.log(`${chalk.green.bold('MUTATION : createPublicMessage')} : TRIGGERED`);
      newChatAdded.save()
        .then((data) => pubsub.publish('CHAT_CHANNEL', { getMessage: data }))
        .catch((err) => console.log('Error saving to db: ', err));
      return newChatAdded;
    }
  },

  Subscription: {
    getPublicMessage: {
      subscribe: (parent, args, { pubsub }) => {
        console.log(`${chalk.green.bold('SUBSCRIPTION : getPublicMessage')} : TRIGGERED`);
        return pubsub.asyncIterator(PUBLIC_CHAT_SUBSCRIPTION_CHANNEL);
      }
    }
  }
};

export default chatResolvers;
