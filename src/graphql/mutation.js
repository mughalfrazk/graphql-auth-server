import { userDAO } from "../components/user/userDAO";

export const Mutation = {
  // Create User Mutation
  createUser: async (parent, args) => {
    return await userDAO.createUser(args.input);
  },
  // Login Mutation
  login: async (parent, args) => {
    return await userDAO.login(args.input);
  },

  verifyEmail: async (parent, args) => {
    return await userDAO.verifyEmail(args.input.token);
  },
};
