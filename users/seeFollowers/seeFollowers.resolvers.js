import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const takeCount = 5;
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok)
        return {
          ok: false,
          error: "Can't find username",
        };

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
          take: takeCount,
          skip: (page - 1) * takeCount,
        });
      const totalFollowers = await client.user.count({
        where: {
          following: {
            some: {
              username,
            },
          },
        },
      });
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / takeCount),
      };
    },
  },
};
