import z from "zod";

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";

const getByShopInput = z.object({
    shopId: z.string(),
});

export const productRouter = createTRPCRouter({
        getAll: publicProcedure.query(({ctx}) => {
            return ctx.prisma.product.findMany();
        }),
        getByShop: publicProcedure.input(
            z.object(
                {
                    shopId: z.string()
                }
            )
        ).query(({ctx, input}) => {
                return ctx.prisma.product.findMany({
                    where: {
                        shopId: input.shopId
                    }
                });
            }
        ),

        getShops: publicProcedure.query
        (({ctx}) => {
            return ctx.prisma.shop.findMany();
        }),
    })
;
