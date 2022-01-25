export class BatchVisits {
    day: string;
    start: string;
    end: string;
    interval: number;



  public constructor(init?: Partial<BatchVisits>) {
    Object.assign(this, init);
  }
}