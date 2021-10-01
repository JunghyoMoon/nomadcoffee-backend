import { gql } from "apollo-server";

export default gql`
    type CreateCoffeeResult {
        ok: Boolean!
        id: Int
        error: String
    }

    type Mutation {
        createCoffee(
            name: String!
            taste: String
            country: String
        ): CreateCoffeeResult!
    }
`;
