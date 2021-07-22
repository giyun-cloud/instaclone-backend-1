import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
const resolverFn = async (
  _,
  { firstName, lastName, username, email, password, bio, avatar },
  { loggedInUser },
) => {
  console.log(avatar);
  let uglyPassword = null;
  password && (uglyPassword = await bcrypt.hash(password, 10));
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      username,
      email,
      bio,
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
};
export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
