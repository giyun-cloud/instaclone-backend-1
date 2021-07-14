import client from "../client";

export default {
  Mutation: {
    createAccount: async (_, { firstName, lastName, username, email }) => {
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      });
      console.log(existingUser);
    },
  },
};
