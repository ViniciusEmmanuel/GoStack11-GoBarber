import { AppointmentsRepository } from '../repositories/AppointmentsRepository';
import { Appointment } from '../models/Appointment';
import { startOfHour } from 'date-fns';
import { AppError } from '../exceptions/AppErros';

interface CreateAppointment {
  provider_id: string;
  date: Date;
}

export class CreateAppointmentService {
  constructor(private appointmentsRepository = new AppointmentsRepository()) {}

  public async execute({
    provider_id,
    date,
  }: CreateAppointment): Promise<Appointment> {
    const parsedDate = startOfHour(date);

    const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(
      parsedDate,
    );

    if (findAppointmentsInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider_id,
      date: parsedDate,
    });

    await this.appointmentsRepository.save(appointment);

    return appointment;
  }
}
