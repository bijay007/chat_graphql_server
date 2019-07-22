// Contains function that resolve the graph queries, mutations and subscriptions

import chalk from 'chalk';
import dayjs from 'dayjs'

// db
import ChatModel from '../database/schema/chat';
import UserModel from '../database/schema/user';
import dbLogger from '../helpers/logger';

const CHAT_SUBSCRIPTION_CHANNEL = 'CHAT_CHANNEL';

const resolvers = {
  Query: {
    getMockChat: () => {
      const date = new Date();
      const mockChat = new ChatModel({
        id: '_' + Date.now(),
        created: date.toLocaleString(),
        senderId: '_' + Math.random().toString(36).substr(2, 9),
        senderName: 'Bijay',
        message: 'Hope this works :D'
      })
      console.log(`${chalk.green.bold('QUERY : getMockChat')} : TRIGGERED`)
      process.env.HOSTNAME === 'localhost'
        ? mockChat.save((err, data) => dbLogger('SAVE', err, data))
        : null
      return mockChat;
    },
    getMockUser: () => {
      const mockUserId = '_' + Math.random().toString(36).substr(2, 9);
      const mockUser = new UserModel({
        id: mockUserId,
        name: 'Bijay',
        email: 'bjtimi.007@gmail.com',
        chats: [
          {
            id: 'random_unique_id',
            created: 'just now',
            senderId: mockUserId,
            senderName: 'Bijay',
            message: 'Message from me to myself'
          }
        ]
      });
      console.log(`${chalk.green.bold('QUERY : getMockUser')} : TRIGGERED`)
      return mockUser;
    },
    getUser: (_, arg) => {
      return new Promise((resolve, reject) => {
        UserModel.findOne({ name: arg.userName }, (err, data) => {
          if (err) reject(err);
          resolve(data);
        })
      })
    },
    getChats: () => ChatModel.find(dbLogger.bind(null, 'FIND')),
    getUsers: () => UserModel.find(dbLogger.bind(null, 'FIND'))
  },

  Mutation: {
    createMessage(parent, {senderId, senderName, message}, { pubsub }) {
      const date = new Date();
      const newChatAdded = new ChatModel({
        id: '_' + Date.now(),
        created: dayjs(date).format('D MMM, HH:mm A'),
        senderId, senderName, message
      })
      console.log(`${chalk.green.bold('MUTATION : createMessage')} : TRIGGERED`)
      newChatAdded.save()
        .then(data => pubsub.publish('CHAT_CHANNEL', { getMessage: data }))
        .catch(err => console.log('Error saving to db: ', err))
      return newChatAdded;
    },
    async createUser(parent, { name, email, id, password }) {
      const checkIfUserExists = UserModel.findOne({ email });
      return checkIfUserExists.then(data => {
        if (data) {
          throw new Error('A user with the email already exists');
        }
        const newUserAdded = new UserModel({ name, email, password, id })
        console.log(`${chalk.green.bold('MUTATION : createUser')} : TRIGGERED`)
        newUserAdded.save()
          .then(data => console.log(`User '${chalk.green.bold(name)}' added to the database`))
          .catch(err => console.log('Error saving to db: ', err))
        return newUserAdded;
      })
      .catch(err => err);
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
