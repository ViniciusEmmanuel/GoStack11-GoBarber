import bcryptjs from 'bcryptjs';

export class Hash {
  private readonly salt = 8;

  constructor(private provider = bcryptjs) {}

  public async compare(str: string, hash: string) {
    return this.provider.compareSync(str, hash);
  }

  public async hash(str: string) {
    return this.provider.hash(str, this.salt);
  }
}
