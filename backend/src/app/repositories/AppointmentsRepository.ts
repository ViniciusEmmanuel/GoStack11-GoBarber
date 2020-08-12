import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { Appointment } from '../models/Appointment';

@EntityRepository(Appointment)
export class AppointmentsRepository extends Repository<Appointment> {
  private q: any;

  constructor(
    private entityManager = getCustomRepository(AppointmentsRepository),
  ) {
    super();
  }

  public repository() {
    return this.entityManager;
  }

  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointments = await this.entityManager.findOne({ where: date });

    return findAppointments || null;
  }
}
