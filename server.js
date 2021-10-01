import dotenv from "dotenv";
dotenv.config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import { graphqlUploadExpress } from "graphql-upload";

const PORT = process.env.PORT;

const startApolloServer = async (typeDefs, resolvers) => {
    const apollo = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req }) => {
            return {
                loggedInUser: await getUser(req.headers.token),
            };
        },
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });

    await apollo.start();

    const app = express();

    app.use(logger("tiny"));
    app.use("/static", express.static("uploads"));
    app.use(graphqlUploadExpress());

    apollo.applyMiddleware({ app });

    await new Promise((resolve) => app.listen({ port: PORT }, resolve));
    console.log(`Your server is running on http://localhost:${PORT}/ 🚀`);
};

startApolloServer(typeDefs, resolvers);
