import { FastifyInstance, FastifyRequest, RouteShorthandOptions } from "fastify";
import { getAllProducts, getProductFromId, updateProductFromId } from "../handlers/product";
import { Product } from "../type"
import { sendError } from "../common/error";

const opts: RouteShorthandOptions = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'number',
                        },
                        name: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                        },
                        isActive: {
                            type: 'boolean'
                        },
                        quantity: {
                            type: 'number'
                        }
                    }
                }
            }
        }
    }
}
type ParamsType = { id: 'string' }

const productRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/products', {}, async (request, reply) => {
        const products = await getAllProducts();
        reply.send(products);
    });

    fastify.get('/products/:id', {}, async (request: FastifyRequest<{ Params: ParamsType }>, reply) => {
        const {id: productId} = request.params
        try {
            const product = await getProductFromId(parseInt(productId));
            reply.send(product);
        }
        catch(err: any){
            sendError(reply, err);
        }
    });

    fastify.put('/products/:id', {}, async (request: FastifyRequest<{ Params: ParamsType, Body: Product }>, reply) => {
        const {id: productId} = request.params;
        const newProduct = request.body;
        try {
            const updatedProduct = await updateProductFromId(parseInt(productId), newProduct);
            reply.code(201);
            reply.send(updatedProduct);
        }
        catch(err: any) {
            sendError(reply, err);
        }
    });
}

export default productRoutes;