import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, username, email, password },
    ) => {
      let uglyPassword = null;
      password && (uglyPassword = await bcrypt.hash(password, 10));
      const updatedUser = await client.user.update({
        where: {
          id: 1,
        },
        data: {
          firstName,
          lastName,
          username,
          email,
          ...(uglyPassword && { password: uglyPassword }),
        },
      });
      if (updatedUser) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "Could not find user",
        };
      }
    },
  },
};
