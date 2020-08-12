import { createConnection as CreateConnection } from 'typeorm';

export class ORM {
  constructor(private createConnection = CreateConnection) {}

  public async execute(): Promise<void> {
    await this.TypeORM();
  }

  private async TypeORM() {
    return this.createConnection();
  }
}
