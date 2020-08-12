import { FastifyError, FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

import { AppointmentController } from '../app/controller/AppointmentController';
import { ensureAuthenticated } from '../app/middleware/ensureAuthenticated';

const RouterAppointments = (
  app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: FastifyError) => void,
) => {
  app.addHook('preHandler', ensureAuthenticated);

  app.get('/appointments', {}, new AppointmentController().index);

  app.post(
    '/appointments',
    {
      schema: {
        body: { provider: { type: 'string' }, date: { type: 'string' } },
      },
    },
    new AppointmentController().store,
  );

  next();
};

const RouterAppointmentsVersion = '/v1';

export { RouterAppointments, RouterAppointmentsVersion };
