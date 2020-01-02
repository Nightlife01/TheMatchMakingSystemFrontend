export class User {
  constructor(
    public userID: number,
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public role: string,
    public isActive: boolean,
    public token?: string
  ) {
  }
}
