import { gql } from "apollo-server";

export default gql`
    type UpdateCoffeeResult {
        ok: Boolean!
        id: Int
        error: String
    }

    type Mutation {
        updateCoffee(
            id: Int!
            name: String
            taste: String
            country: String
        ): UpdateCoffeeResult!
    }
`;
