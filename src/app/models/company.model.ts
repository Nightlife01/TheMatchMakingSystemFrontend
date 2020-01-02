import { User } from './user.model';

export class Company {
  constructor(
    public companyID: number,
    public userID: number,
    public name: string,
    public location: string,
    public biography: string,
    public user?: User
  ) {
  }
}
