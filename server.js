import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import schema from "./schema";

const PORT = process.env.PORT;

const app = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

app.listen(PORT).then(() =>
    console.log(`Your app is running on "http://localhost:${PORT}"🚀`)
);
