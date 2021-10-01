import client from "../../client";

export default {
    Mutation: {
        updateCoffee: async (_, { id, name, taste, country }) => {
            try {
                const updatedCoffee = await client.coffee.update({
                    where: {
                        id,
                    },
                    data: {
                        name,
                        taste,
                        country,
                    },
                });

                return {
                    ok: true,
                    id: updatedCoffee.id,
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
