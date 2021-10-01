import { gql } from "apollo-server";

export default gql`
    type DeleteCoffeeResult {
        ok: Boolean!
        deletedId: Int
        error: String
    }

    type Mutation {
        deleteCoffee(id: Int!): DeleteCoffeeResult!
    }
`;
