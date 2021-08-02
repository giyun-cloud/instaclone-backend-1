import client from "../../client";

export default {
  Query: {
    seePhotoComments: (_, { id, page }) =>
      client.comment.findMany({
        where: {
          photoId: id,
        },
        orderBy: {
          createdAt: "asc",
        },
        take: 10,
        skip: (page - 1) * 10,
      }),
  },
};
