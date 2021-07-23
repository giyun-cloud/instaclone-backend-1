import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      // 방법-1
      // const followers = client.user.findMany({
      //   where: {
      //     following: {
      //       some: {
      //         username,
      //       },
      //     },
      //   },
      //   take: 3,
      //   skip: (page - 1) * 3,
      // });

      // 방법*2 방법1,2 둘다 같은 역활을함
      const followers = client.user
        .findUnique({
          where: {
            username,
          },
        })
        .followers({
          take: 5,
          skip: (page - 1) * 5,
        });
      return {
        ok: true,
        followers,
      };
    },
  },
};
