import 'dotenv/config';
import 'reflect-metadata';

import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import cors from 'fastify-cors';
import configCors from './app/config/Cors';

// import fastifySwagger from 'fastify-swagger';
// import configSwagger from './app/config/SwaggerFastify';

import { ORM } from './app/config/ORM';
import { Router } from './routes';
import { AppError } from './app/exceptions/AppErros';

export default class App {
  private app: FastifyInstance;

  constructor(option?: FastifyServerOptions) {
    this.app = fastify(option);
  }

  private async router() {
    this.app = await new Router(this.app).register();
  }

  private async ORM() {
    return new ORM().execute();
  }

  private cors() {
    return this.app.register(cors, configCors);
  }

  // private swagger() {
  //   return this.app.register(fastifySwagger, configSwagger);
  // }

  private execptionHandler() {
    this.app.setErrorHandler(function (error, _, response) {
      if (error instanceof AppError) {
        console.error('AppError:', error);

        return response.status(error.statusCode).send({
          status: 'error',
          message: error.message,
        });
      }
      console.error('Internal Error', error);

      return response.status(500).send({
        status: 'error',
        message: 'Internal server error',
      });
    });
  }

  public async run() {
    try {
      this.execptionHandler();

      this.cors();
      await this.router();
      await this.ORM();

      const port = Number(process.env.PORT) || 3333;
      const host = process.env.HOST || '0.0.0.0';

      await this.app.listen(port, host);

      console.log(
        `🚀 Server started on Host::${host} and Port::${port}! Uhull`,
      );
    } catch (error) {
      console.error(error);

      this.app.log.error(error);

      process.exit(1);
    }
  }
}
