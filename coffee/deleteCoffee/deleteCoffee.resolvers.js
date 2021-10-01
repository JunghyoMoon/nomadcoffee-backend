import client from "../../client";

export default {
    Mutation: {
        deleteCoffee: async (_, { id }) => {
            try {
                const deletedCoffee = await client.coffee.delete({
                    where: { id },
                });
                return {
                    ok: true,
                    deletedId: deletedCoffee.id,
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
