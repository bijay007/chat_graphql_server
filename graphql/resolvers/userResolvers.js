// Contains function that resolve the graph queries, mutations and subscriptions

import chalk from 'chalk';
import bcrypt from 'bcrypt';

// db
import UserModel from '/database/schema/user/user';
import dbLogger from '/helpers/logger';

const userResolvers = {
  Query: {
    getMockUser: () => {
      const mockUserId = `_${Math.random().toString(36).substr(2, 9)}`;
      const mockUser = new UserModel({
        id: mockUserId,
        name: 'Bijay',
        email: 'bjtimi.007@gmail.com',
        publicChats: [
          {
            id: 'random_unique_id',
            created: 'just now',
            senderId: mockUserId,
            senderName: 'Bijay',
            message: 'Hello eveyone',
          },
        ],
        privateChats: [
          {
            id: 'unique id generated using sender and receiver ids',
            senderId: mockUserId,
            senderName: 'Bijay',
            receiverId: 'abc123',
            receiverName: 'Bijay v2',
            message: 'Hello myself :)',
            created: 'sometime in the future from a parallel universe'
          }
        ]
      });
      console.log(`${chalk.green.bold('QUERY : getMockUser')} : TRIGGERED`);
      return mockUser;
    },
    getUser: async (_, args) => {
      const user = await UserModel.findOne({ name: args.userName });
      if (!user) throw new Error('User doesn\'t exist.');
      const validPassword = await bcrypt.compare(args.password, user.password);
      if (!validPassword) throw new Error('Invalid username or password');
      return user;
    },
    getUsers: () => UserModel.find(dbLogger.bind(null, 'FIND')),
  },

  Mutation: {
    async createUser(parent, {
      name, email, id, password,
    }) {
      const userExists = await UserModel.findOne({ email });
      const hashedPassword = await bcrypt.hash(password, 10);
      if (userExists) throw new Error('A user with the email already exists');
      const newUserAdded = new UserModel({
        name, email, password: hashedPassword, id,
      });
      console.log(`${chalk.green.bold('MUTATION : createUser')} : TRIGGERED`);
      newUserAdded.save()
        .then((data) => console.log(`User '${chalk.green.bold(name)}' added to the database`))
        .catch((err) => console.log('Error saving to db: ', err));
      return newUserAdded;
    },
  }
};

export default userResolvers;
