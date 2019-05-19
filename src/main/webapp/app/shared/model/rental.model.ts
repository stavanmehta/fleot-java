import { Moment } from 'moment';
import { ICar } from 'app/shared/model/car.model';
import { IFleetOwner } from 'app/shared/model/fleet-owner.model';

export interface IRental {
  id?: number;
  startAt?: Moment;
  endAat?: Moment;
  car?: ICar;
  fleetowner?: IFleetOwner;
}

export const defaultValue: Readonly<IRental> = {};
