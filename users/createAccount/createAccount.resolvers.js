import bcrypt from "bcrypt";
import client from "../../client";

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
                    return {
                        ok: false,
                        error: "this username/email have been taken already.",
                    };
                }
                const uglyPassword = await bcrypt.hash(password, 10);
                const createdUser = await client.user.create({
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
                return {
                    ok: true,
                    id: createdUser.id,
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                };
            }
        },
    },
};
