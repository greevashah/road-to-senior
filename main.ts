import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import health from "./routes/health"
import productRoutes from "./routes/product"
import orderRoutes from './routes/order'

const server: FastifyInstance = Fastify({})

const start = async () => {
  try {
    await server.register(health);
    await server.register(productRoutes);
    await server.register(orderRoutes);
    await server.listen({ port: 3000 })

    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port
    console.log("Address: ", address);
    console.log("Server started successfully on port ", port);
  } catch (err) {
    server.log.error(err);
    console.log("Error: ", err);
  }
}

start()