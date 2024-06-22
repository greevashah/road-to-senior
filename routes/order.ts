import { FastifyInstance, FastifyRequest, RouteShorthandOptions } from "fastify";
import { Order, BodyType } from "../type";
import { getAllProducts, getProductFromId, updateProductFromId } from "../handlers/product";
import { getOrderFromId, createOrder } from "../handlers/order";
import { sendError } from "../common/error";


// const opts: RouteShorthandOptions = {
//     schema: {
//         body: {
//             type: 'array',
//             items: {
//                 type: 'object',
//                 required: ['id', 'quantity'],
//                 properties: {
//                     id: {
//                         type: 'number',
//                     },
//                     quantity: {
//                         type: 'number',
//                     }
//                 }
//             }
//         }
//     }
// }

type ParamsType = { id: string }

const orderRoutes = async (fastify: FastifyInstance) => {
    fastify.get("/order/:id", {}, async (request: FastifyRequest<{Params: ParamsType}>, reply) => {
        const {id} = request.params;
        try {
            const order = await getOrderFromId(id);
            reply.code(200);
            reply.send(order);
        }
        catch(err){
            sendError(reply, err);
        }
    });

    fastify.post("/order", {}, async (request: FastifyRequest<{ Body: BodyType[] }>, reply) => {
        const requestedProducts: BodyType[] = request.body; // Now TypeScript knows that request.body is of type BodyType[]
        try{    
            const finalOrder = await createOrder(requestedProducts);
            reply.code(201);
            reply.send(finalOrder);
        } catch (err) {
            sendError(reply, err);
        }
    })

}

export default orderRoutes;
