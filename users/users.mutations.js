import bcrypt from "bcryptjs";
import client from "../client";

export default {
    Mutation: {
        createAccount: async (
            _,
            {
                username,
                email,
                name,
                location,
                password,
                avatarURL,
                githubUsername,
            }
        ) => {
            try {
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [{ username }, { email }],
                    },
                });
                if (existingUser) {
                    throw new Error(
                        "this username/email have been taken already."
                    );
                }
                const uglyPassword = await bcrypt.hash(password, 10);
                const user = await client.user.create({
                    data: {
                        username,
                        email,
                        name,
                        location,
                        password: uglyPassword,
                        avatarURL,
                        githubUsername,
                    },
                });
                // how to return "ok: true/false..?"
                return user;
            } catch (error) {
                return error;
            }
        },
    },
};
