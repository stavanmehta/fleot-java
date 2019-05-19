import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { ITuro } from 'app/shared/model/turo.model';
import { ICar } from 'app/shared/model/car.model';
import { IDriver } from 'app/shared/model/driver.model';

export const enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export interface IFleetOwner {
  id?: number;
  companyName?: string;
  gender?: Gender;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  imageContentType?: string;
  image?: any;
  createdAt?: Moment;
  updatedAt?: Moment;
  user?: IUser;
  turo?: ITuro;
  cars?: ICar[];
  drivers?: IDriver[];
}

export const defaultValue: Readonly<IFleetOwner> = {};
