import { Tag } from './tag.model';

export class Assignment {
  constructor(
    public assignmentID: number,
    public companyID: number,
    public title: string,
    public description: string,
    public closeDate: Date,
    public listTags?: Tag[],
    public makerID?: number
  ) {
  }
}
