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
`;
