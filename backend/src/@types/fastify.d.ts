import fastify from 'fastify';

import 'fastify';

declare module 'fastify' {
  export interface FastifyRequest {
    user: {
      id: string;
    };
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      destination: string;
      filename: string;
      path: string;
      size: number;
    };
  }
}
