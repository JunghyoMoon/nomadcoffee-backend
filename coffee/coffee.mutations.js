import client from "../client";

export default {
    Mutation: {
        createCoffee: (_, { name, taste, country }) =>
            client.coffee.create({
                data: { name, taste, country },
            }),
        deleteCoffee: (_, { id }) => client.coffee.delete({ where: { id } }),
        updateCoffee: (_, { id, name, taste, country }) =>
            client.coffee.update({
                where: {
                    id,
                },
                data: {
                    name,
                    taste,
                    country,
                },
            }),
    },
};
