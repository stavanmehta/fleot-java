import { Moment } from 'moment';
import { ICar } from 'app/shared/model/car.model';
import { IFleetOwner } from 'app/shared/model/fleet-owner.model';

export const enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export interface IDriver {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: Gender;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  licenseNo?: string;
  licenseImageContentType?: string;
  licenseImage?: any;
  nid?: string;
  nidImageContentType?: string;
  nidImage?: any;
  imageContentType?: string;
  image?: any;
  createdAt?: Moment;
  updatedAt?: Moment;
  car?: ICar;
  fleetowner?: IFleetOwner;
}

export const defaultValue: Readonly<IDriver> = {};
