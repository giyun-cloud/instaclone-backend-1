import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: (_, { username, password }) => {
      const user = client.user.findFirst({ where: { username } });
      if (!user)
        return {
          ok: false,
          error: "User not found.",
        };
      const passwordOk = bcrypt.compare(password, user.password);
      if (!passwordOk)
        return {
          ok: false,
          error: "Incorrect password.",
        };
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};