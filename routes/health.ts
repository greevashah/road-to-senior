import { FastifyInstance, FastifyServerOptions, RouteShorthandOptions } from 'fastify'

const opts: RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            message: {
              type: 'string'
            }
          }
        }
      }
    }
  }
  

const routes = async (fastify: FastifyInstance) => {
    fastify.get('/health', opts, async (request, reply) => {
        return { message: 'Ok' }
    })
}

export default routes;