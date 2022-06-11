import 'dotenv/config';
import { fastify } from 'fastify';
import pino from 'pino';

import db from './db'
import BlogRoutes from './routes/blogs';

const port = +(process.env.PORT || '7000');
const uri = process.env.MONGODB_URI || ''
const server = fastify({
  logger: pino({ level: 'info' })
});

// register plugin below:
server.register(db, { uri })
server.register(BlogRoutes)

server.listen({ port }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
