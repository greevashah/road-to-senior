import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import health from "./routes/health"

const server: FastifyInstance = Fastify({})

const start = async () => {
  try {
    await server.register(health);
    await server.listen({ port: 3000 })

    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port
    console.log("Server started successfully!");
  } catch (err) {
    server.log.error(err)
    console.log("Error: ", err)
    process.exit(1)
  }
}

start()