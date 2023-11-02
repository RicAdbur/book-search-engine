const { GraphQLError } = require("graphql")
const { User } = require("../models")
const { signToken } = require("../utils/auth")

const resolvers = {
  Query: {
    me: async (parent, args, context, index) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
        return userData
      }
      throw new GraphQLError("Login required")
    }
  },
  Mutation: {
    login: async (parent, { email, password }, context, index) => {
      const user = await User.findOne({ email })
      console.log(user)
      if (!user) {
        throw new GraphQLError("No user detected")
      }

      const verifiedPW = await user.isCorrectPassword(password)
      console.log(verifiedPW)
      if (!verifiedPW) {
        throw new GraphQLError("Password not verified")
      }

      const token = signToken(user)
      return { user, token }
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { BookData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: BookData } },
          { new: true }
        );
        return updatedUser;
      }
      throw new GraphQLError("Login required");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Login required");
    },
  },
}

module.exports = resolvers