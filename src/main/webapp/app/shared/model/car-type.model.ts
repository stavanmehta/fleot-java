import { ICar } from 'app/shared/model/car.model';

export interface ICarType {
  id?: number;
  typeName?: string;
  cars?: ICar[];
}

export const defaultValue: Readonly<ICarType> = {};
