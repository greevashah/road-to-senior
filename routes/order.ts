import { FastifyInstance, FastifyRequest, RouteShorthandOptions } from "fastify";
import { Order } from "../type";
import { getAllProducts, getProductFromId, updateProductFromId } from "../handlers/product";
import { orders } from "../db/order"
import { getOrderFromId } from "../handlers/order";
import { uuid } from 'uuidv4';


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
interface BodyType { id: number, quantity: number }

const orderRoutes = async (fastify: FastifyInstance) => {
    fastify.get("/order/:id", {}, async (request: FastifyRequest<{Params: ParamsType}>, reply) => {
        const {id} = request.params;
        try {
            const order = await getOrderFromId(id);
            console.log("Order: ", order);
            reply.code(200);
            reply.send(order);
        }
        catch(err){
            throw err
        }
    });

    fastify.post("/order", {}, async (request: FastifyRequest<{ Body: BodyType[] }>, reply) => {
        const requestedProducts: BodyType[] = request.body; // Now TypeScript knows that request.body is of type BodyType[]
        const finalOrder: Order = { id: uuid(), price: 0, products: [], address: "" };
        const products = await getAllProducts();
        const ids: number[] = products.map((p) => p.id);
        try {
        await Promise.all(requestedProducts.map(async (p) => {
            if (ids.includes(p.id)) {
                const matchedProduct = await getProductFromId(p.id); // on reject, catch will be called
                if (!matchedProduct.quantity) {
                    throw new Error("Quantity of requested product is 0");
                }
                else if (!matchedProduct.isActive) {
                    throw new Error("Requested product is inactive")
                }
                matchedProduct.quantity -= 1;
                await updateProductFromId(p.id, matchedProduct);
                finalOrder.products.push(p);
            }
        }));
        orders.push(finalOrder);
        reply.code(201);
        reply.send(finalOrder);
        } catch (err) {
            throw err;
        }
    })

}

export default orderRoutes;
