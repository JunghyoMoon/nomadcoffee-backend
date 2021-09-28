import { gql } from "apollo-server";

export default gql`
    type Coffee {
        id: Int!
        name: String!
        taste: String
        country: String
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        coffees: [Coffee]
        coffee(id: Int!): Coffee
    }

    type Mutation {
        createCoffee(name: String!, taste: String, country: String): Coffee
        deleteCoffee(id: Int!): Coffee
        updateCoffee(
            id: Int!
            name: String
            taste: String
            country: String
        ): Coffee
    }
`;
