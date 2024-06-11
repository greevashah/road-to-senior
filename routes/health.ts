import { FastifyInstance, FastifyServerOptions, RouteShorthandOptions } from 'fastify'

const opts: RouteShorthandOptions = {
    schema: {
      response: {
        201: {
          type: 'object',
          properties: {
            message: {
              type: 'string'
            },
            sample: {
              type: 'string'            
            }
          }
        }
      }
    }
  }
  

const routes = async (fastify: FastifyInstance) => {
    fastify.get('/health', opts, async (request, reply) => {
        reply.code(201)
        reply.send({ message: 'Ok'})
    })
}

export default routes;