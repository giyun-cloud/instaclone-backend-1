import client from "../client";

export default {
  User: {
    totalFollowers: ({ id }) => {
      return client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      });
    },
    totalFollowing: ({ id }) => {
      return client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      });
    },
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      const exist = await client.user.count({
        where: {
          id: loggedInUser.id,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exist);
    },
  },
};
