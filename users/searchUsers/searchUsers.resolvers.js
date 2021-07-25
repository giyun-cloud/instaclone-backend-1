import client from "../../client";

export default {
  Query: {
    searchUsers: (_, { keyword, page }) => {
      return client.user.findMany({
        where: {
          username: {
            startsWith: keyword,
          },
        },
        take: 3,
        skip: (page - 1) * 3,
      });
    },
  },
};
