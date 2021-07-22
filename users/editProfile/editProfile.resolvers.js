import client from "../../client";
import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import { GraphQLUpload } from "graphql-upload";
import { protectedResolver } from "../users.utils";
const resolverFn = async (
  _,
  { firstName, lastName, username, email, password, bio, avatar },
  { loggedInUser },
) => {
  let avatarUrl = null;
  if (avatar) {
    const { filename, createReadStream } = await avatar;
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      process.cwd() + "/uploads/" + newFilename,
    );
    readStream.pipe(writeStream);
    avatarUrl = `http://localhost:4000/static/${newFilename}`;
  }
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
      ...(avatarUrl && { avatar: avatarUrl }),
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
  Upload: GraphQLUpload,
};
