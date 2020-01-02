import { User } from './user.model';

export class Review {
  constructor(
    public reviewID: number,
    public reviewerID: number,
    public receiverID: number,
    public assignmentID: number,
    public description: string,
    public like: boolean
  ) {
  }
}
