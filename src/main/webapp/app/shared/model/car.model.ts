import { Moment } from 'moment';
import { ICarType } from 'app/shared/model/car-type.model';
import { IFleetOwner } from 'app/shared/model/fleet-owner.model';

export interface ICar {
  id?: number;
  brand?: string;
  model?: string;
  registrationNo?: string;
  imageContentType?: string;
  image?: any;
  manufacturerYear?: number;
  driverId?: number;
  description?: string;
  ageRestriction?: number;
  dailyRate?: number;
  hourlyRate?: number;
  milesSurcharge?: number;
  lateReturnFee?: number;
  cleaningFee?: number;
  deposit?: number;
  createdAt?: Moment;
  updatedAt?: Moment;
  cartype?: ICarType;
  fleetowner?: IFleetOwner;
}

export const defaultValue: Readonly<ICar> = {};
