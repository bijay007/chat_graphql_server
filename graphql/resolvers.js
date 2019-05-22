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
    getChats: () => ChatModel.find(dbLogger.bind(null, 'FIND'))
  },

  Mutation: {
    createMessage(parent, {sender, message}, { pubsub }) {
      const date = new Date();
      const newChatAdded = new ChatModel({
        id: '_' + Date.now(),
        created: dayjs(date).format('D MMM, HH:mm A'),
        sender, message
      })
      console.log(`${chalk.green.bold('MUTATION : createMessage')} : TRIGGERED`)
      ChatModel.save(newChatAdded)
        .then((err, data) => {
          console.log('Data sent to db: ', newChatAdded);
          console.log('Data saved in db: ', data);
          dbLogger('SAVE', err, data);
          pubsub.publish('CHAT_CHANNEL', { getMessage: newChatAdded });
        })
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
