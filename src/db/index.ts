import { FastifyInstance } from 'fastify';
import { FastifyPluginAsync, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import mongoose from 'mongoose';
import { Blog, BlogModel } from './models/blogs';

export interface Models {
  Blog: BlogModel;
}

export interface DB {
  models: Models;
}

// define options
export interface MongoPluginOptions {
  uri: string;
}

const ConnectDB: FastifyPluginAsync<MongoPluginOptions> = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) => {
  try {
    mongoose.connection.on('connected', () => {
      fastify.log.info({ actor: 'MongoDB' }, 'connected');
    });

    mongoose.connection.on('disconnected', () => {
      fastify.log.error({ actor: 'MongoDB' }, 'disconnected');
    });

    await mongoose.connect(options.uri);
    const models: Models = { Blog };
    fastify.decorate('db', { models });
  } catch (error) {
    console.error(error);
  }
};
export default fp(ConnectDB);
