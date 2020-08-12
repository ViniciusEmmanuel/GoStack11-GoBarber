import { FastifyReply, FastifyRequest } from 'fastify';

import { parseISO } from 'date-fns';

import { AppointmentsRepository } from '../repositories/AppointmentsRepository';
import { CreateAppointmentService } from '../service/CreateAppointmentService';

interface IAppointmentStore {
  provider_id: string;
  date: string;
}

export class AppointmentController {
  public async index(request: FastifyRequest, response: FastifyReply) {
    const appointmentsRepository = new AppointmentsRepository();

    const appointments = await appointmentsRepository.repository().find();

    return response.status(200).send(appointments);
  }

  public async store(request: FastifyRequest, response: FastifyReply) {
    const { provider_id, date } = request.body as IAppointmentStore;

    const parserdDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parserdDate,
    });

    return response.status(201).send(appointment);
  }
}
