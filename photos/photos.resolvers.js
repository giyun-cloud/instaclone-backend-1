import client from "../client";

export default {
  Photo: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }) =>
      client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      }),
  },
  Hashtag: {
    photos: ({ id }, { page }, { loggedInUser }) => {
      if (!loggedInUser) return null;
      return client.photo.findMany({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
        take: 1,
        skip: (page - 1) * 1,
      });
    },
    totalPhotos: ({ id }) =>
      client.photo.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
