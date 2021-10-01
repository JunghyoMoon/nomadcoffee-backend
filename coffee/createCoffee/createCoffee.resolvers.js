import client from "../../client";

export default {
    Mutation: {
        createCoffee: async (_, { name, taste, country }) => {
            try {
                const coffee = await client.coffee.create({
                    data: { name, taste, country },
                });
                return {
                    ok: true,
                    id: coffee.id,
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
