import { User } from './user.model';
import { MakerType } from './makerType';
import { Tag } from './tag.model';

export class Maker {
  constructor(
    public makerID: number,
    public makerTypeID: number,
    public userID: number,
    public nickname: string,
    public birthdate: Date,
    public biography: string,
    public linkedIn: string,
    public experience: string,
    public contactInfo: string,
    public makerType?: MakerType,
    public user?: User,
    public tags?: Tag[]
  ) {
  }
}
