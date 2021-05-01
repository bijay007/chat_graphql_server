// Contains function that resolve the graph queries, mutations and subscriptions

import chalk from 'chalk';
import dayjs from 'dayjs';

// db
import PublicChatModel from '/database/schema/chat/publicChat';
import PrivateChatModel from '/database/schema/chat/privateChat';
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
    createPublicChat(parent, { senderId, senderName, message }, { pubsub }) { // TODO: Refactor to use helper function that creates chat based on params
      const date = new Date();
      const newPublicChat = new PublicChatModel({
        id: `_${Date.now()}`,
        created: dayjs(date).format('D MMM, HH:mm A'),
        senderId,
        senderName,
        message,
      });
      console.log(`${chalk.green.bold('MUTATION : createPublicChat')} : TRIGGERED`);
      newPublicChat.save()
        .then((data) => pubsub.publish('PUBLIC_CHAT_CHANNEL', { getPublicChats: data }))
        .catch((err) => console.log('Error saving to db: ', err));
      return newPublicChat;
    },
    createPrivateChat(parent, { senderId, senderName, receiverId, receiverName, message }, { pubsub }) {
      const date = new Date();
      const newPrivateChat = new PrivateChatModel({
        id: `_${Date.now()}`,
        created: dayjs(date).format('D MMM, HH:mm A'),
        senderId,
        senderName,
        receiverId,
        receiverName,
        message,
      });
      console.log(`${chalk.green.bold('MUTATION : createPrivateChat')} : TRIGGERED`);
      newPrivateChat.save()
        .then((data) => pubsub.publish('PRIVATE_CHAT_CHANNEL', { getPrivateChats: data }))
        .catch((err) => console.log('Error saving to db: ', err));
      return newPrivateChat;
    }
  },

  Subscription: {
    getPublicChats: {
      subscribe: (parent, args, { pubsub }) => {
        console.log(`${chalk.green.bold('SUBSCRIPTION : getPublicChats')} : TRIGGERED`);
        return pubsub.asyncIterator(PUBLIC_CHAT_SUBSCRIPTION_CHANNEL);
      }
    },
    getPrivateChats: {
      subscribe: (parent, args, { pubsub }) => {
        console.log(`${chalk.green.bold('SUBSCRIPTION : getPrivateChats')} : TRIGGERED`);
        return pubsub.asyncIterator(PRIVATE_CHAT_SUBSCRIPTION_CHANNEL);
      }
    }
  }
};

export default chatResolvers;
