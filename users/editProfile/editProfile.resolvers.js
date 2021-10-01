import { createWriteStream } from "fs";
import GraphQLUpload from "graphql-upload";
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Upload: GraphQLUpload,

    Mutation: {
        editProfile: protectedResolver(
            async (
                _,
                {
                    username,
                    email,
                    name,
                    location,
                    password: newPassword,
                    avatarURL,
                    githubUsername,
                },
                { loggedInUser }
            ) => {
                let newAvatarUrl = null;
                if (avatarURL) {
                    const { filename, createReadStream } = await avatarURL;
                    const newFilename = `${
                        loggedInUser.id
                    }-${Date.now()}-${filename}`;
                    const readStream = createReadStream();
                    const writeStream = createWriteStream(
                        `${process.cwd()}/uploads/${newFilename}`
                    );
                    readStream.pipe(writeStream);
                    newAvatarUrl = `http://localhost:${process.env.PORT}/static/${newFilename}`;
                }

                let uglyPassword = null;

                if (newPassword) {
                    uglyPassword = await bcrypt.hash(newPassword, 10);
                }

                const updatedUser = await client.user.update({
                    where: { id: loggedInUser.id },
                    data: {
                        username,
                        email,
                        name,
                        location,
                        githubUsername,
                        ...(uglyPassword && { password: uglyPassword }),
                        ...(newAvatarUrl && { avatarURL: newAvatarUrl }),
                    },
                });

                if (updatedUser.id) {
                    return { ok: true };
                } else {
                    return {
                        ok: false,
                        error: "Couldn't update profile.",
                    };
                }
            }
        ),
    },
};
