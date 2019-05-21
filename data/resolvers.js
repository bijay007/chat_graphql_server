// Contains function that resolve the graph queries, mutations and subscriptions

import chalk from 'chalk';
import pubsub from './pubsub';

// defaults
const chatsArr = [];
const CHAT_SUBSCRIPTION_CHANNEL = 'CHAT_CHANNEL';

const resolvers = {
  Query: {
    getMockChat: () => {
      const date = new Date();
      const mockChat = {
        id: '_' + Date.now(),
        created: date.toLocaleString(),
        sender: 'Bijay',
        message: 'Hope this works :D'
      }
      console.log(`${chalk.green.bold('QUERY : getChats')} : TRIGGERED`)
      return mockChat
    },
    getChats: () => chatsArr
  },

  Mutation: {
    createMessage(parent, {sender, message}, { pubsub }) {
      const date = new Date();
      console.log('DATE ORGINAL: ', date);
      const newChatAdded = {
        id: '_' + Date.now(),
        created: date.toLocaleString(),
        sender, message
      }
      chatsArr.push(newChatAdded);
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
