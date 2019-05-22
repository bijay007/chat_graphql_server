// Contains function that resolve the graph queries, mutations and subscriptions

import chalk from 'chalk';
import dayjs from 'dayjs'
import pubsub from './pubsub';

// db
import { ChatModel } from '../database/schema';
import dbLogger from '../helpers/logger';

const CHAT_SUBSCRIPTION_CHANNEL = 'CHAT_CHANNEL';

const resolvers = {
  Query: {
    getMockChat: () => {
      const date = new Date();
      const mockChat = new ChatModel({
        id: '_' + Date.now(),
        created: date.toLocaleString(),
        sender: 'Bijay',
        message: 'Hope this works :D'
      })
      mockChat.save((err, data) => dbLogger('SAVE', err, data));
      console.log(`${chalk.green.bold('QUERY : getChats')} : TRIGGERED`)
      return mockChat;
    },
    getChats: () => ChatModel.find((err, data) => dbLogger('FIND', err, data))
  },

  Mutation: {
    createMessage(parent, {sender, message}, { pubsub }) {
      const date = new Date();
      const newChatAdded = new ChatModel({
        id: '_' + Date.now(),
        created: dayjs(date).format('D MMM, HH:mm A'),
        sender, message
      })
      ChatModel.save(newChatAdded, dbLogger.bind(null, 'SAVE'));
      pubsub.publish('CHAT_CHANNEL', { getMessage: newChatAdded });
      console.log(`${chalk.green.bold('MUTATION : createMessage')} : TRIGGERED`)
      return newChatAdded;
    }
  },

  Subscription: {
    getMessage: {
      subscribe: (parent, args, { pubsub }) => {
        console.log(`${chalk.green.bold('SUBSCRIPTION : getMessage')} : TRIGGERED`)
        return pubsub.asyncIterator(CHAT_SUBSCRIPTION_CHANNEL)
      }
    }
  }
}

export default resolvers;
