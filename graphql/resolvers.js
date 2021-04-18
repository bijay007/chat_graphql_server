// Contains function that resolve the graph queries, mutations and subscriptions

import chalk from 'chalk';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';

// db
import PublicChatModel from '../database/schema/chats/publicChat';
import PrivateChatModel from '../database/schema/chats/privateChat';
import UserModel from '../database/schema/user';
import dbLogger from '../helpers/logger';

const PUBLIC_CHAT_SUBSCRIPTION_CHANNEL = 'PUBLIC_CHAT_CHANNEL';
const PRIVATE_CHAT_SUBSCRIPTION_CHANNEL = 'PRIVATE_CHAT_CHANNEL';

const resolvers = {
  Query: {
    getPublicMockChat: () => {
      const date = new Date();
      const publicMockChat = new PublicChatModel({
        id: '_' + Date.now(),
        created: date.toLocaleString(),
        senderId: '_' + Math.random().toString(36).substr(2, 9),
        senderName: 'Administrator',
        message: 'This is a test message !!'
      })
      console.log(`${chalk.green.bold('QUERY : getPublicMockChat')} : TRIGGERED`)
      process.env.HOSTNAME === 'localhost'
        ? publicMockChat.save((err, data) => dbLogger('SAVE', err, data))
        : null
      return publicMockChat;
    },
    getPrivateMockChat: (_, args) => {
      const date = new Date();
      const privateMockChat = new PrivateChatModel({
        id: '_' + Date.now(),
        created: date.toLocaleString(),
        senderId: '_' + Math.random().toString(36).substr(2, 9),
        senderName: args.senderName,
        receiverId: '_' + Math.random().toString(36).substr(2, 9),
        receiverName: args.receiverName,
        message: 'Hope only you see this message :D'
      })
      console.log(`${chalk.green.bold('QUERY : getPrivateMockChat')} : TRIGGERED`)
      process.env.HOSTNAME === 'localhost'
        ? privateMockChat.save((err, data) => dbLogger('SAVE', err, data))
        : null
      return privateMockChat;
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
    getUser: async (_, args) => {
      const user = await UserModel.findOne({ name: args.userName });
      if (!user) throw new Error('User doesn\'t exist.');
      const validPassword = await bcrypt.compare(args.password, user.password);
      if (!validPassword) throw new Error('Invalid username or password');
      return user;
    },
    getPublicChats: () => PublicChatModel.find(dbLogger.bind(null, 'FIND')),
    getUsers: () => UserModel.find(dbLogger.bind(null, 'FIND'))
  },

  Mutation: {
    createPublicMessage(parent, {senderId, senderName, message}, { pubsub }) {
/*       receiverId
        ? this.createPublicMessage()
        : this.createOneToOneMessage() */
      const date = new Date();
      const newChatAdded = new PublicChatModel({
        id: '_' + Date.now(),
        created: dayjs(date).format('D MMM, HH:mm A'),
        senderId, senderName, message
      })
      console.log(`${chalk.green.bold('MUTATION : createPublicMessage')} : TRIGGERED`)
      newChatAdded.save()
        .then(data => pubsub.publish('CHAT_CHANNEL', { getMessage: data }))
        .catch(err => console.log('Error saving to db: ', err))
      return newChatAdded;
    },
    async createUser(parent, { name, email, id, password }) {
      const userExists = await UserModel.findOne({ email });
      const hashedPassword = await bcrypt.hash(password, 10);
      if (userExists) throw new Error('A user with the email already exists');
      const newUserAdded = new UserModel({ name, email, password: hashedPassword, id })
      console.log(`${chalk.green.bold('MUTATION : createUser')} : TRIGGERED`)
      newUserAdded.save()
        .then(data => console.log(`User '${chalk.green.bold(name)}' added to the database`))
        .catch(err => console.log('Error saving to db: ', err))
      return newUserAdded;
    }
  },

  Subscription: {
    getPublicMessage: {
      subscribe: (parent, args, { pubsub }) => {
        console.log(`${chalk.green.bold('SUBSCRIPTION : getPublicMessage')} : TRIGGERED`)
        return pubsub.asyncIterator(PUBLIC_CHAT_SUBSCRIPTION_CHANNEL)
      }
    }
  }
}

export default resolvers;
