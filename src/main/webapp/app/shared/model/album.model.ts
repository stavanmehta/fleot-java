import { Moment } from 'moment';
import { ICar } from 'app/shared/model/car.model';

export interface IAlbum {
  id?: number;
  title?: string;
  description?: any;
  created?: Moment;
  car?: ICar;
}

export const defaultValue: Readonly<IAlbum> = {};
