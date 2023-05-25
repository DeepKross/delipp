import z from "zod";

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";

const orderInput = z.object({
    name: z.string(),
    email: z.string().email().trim(),
    phone: z.string().min(10).trim(),
    address: z.string().min(1).trim(),
    items: z.array(
        z.object({
            productId: z.string(),
            quantity: z.number(),
        }),
    ),
});


export const orderRouter = createTRPCRouter({
    create: publicProcedure
        .input(orderInput)
        .mutation(async ({ ctx, input }) => {
            // Create a new order
            console.log("orderRouter create input: ", input)
            // Return the created order
            return await ctx.prisma.order.create({
                data: {
                    name: input.name,
                    email: input.email,
                    phone: input.phone,
                    address: input.address,
                    items: {
                        create: input.items.map(item => ({
                            productId: item.productId,
                            quantity: item.quantity,
                        })),
                    },
                },
                include: {
                    items: true,
                },
            });
        }),
});
