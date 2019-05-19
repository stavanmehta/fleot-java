import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRental, defaultValue } from 'app/shared/model/rental.model';

export const ACTION_TYPES = {
  FETCH_RENTAL_LIST: 'rental/FETCH_RENTAL_LIST',
  FETCH_RENTAL: 'rental/FETCH_RENTAL',
  CREATE_RENTAL: 'rental/CREATE_RENTAL',
  UPDATE_RENTAL: 'rental/UPDATE_RENTAL',
  DELETE_RENTAL: 'rental/DELETE_RENTAL',
  RESET: 'rental/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRental>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type RentalState = Readonly<typeof initialState>;

// Reducer

export default (state: RentalState = initialState, action): RentalState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RENTAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RENTAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RENTAL):
    case REQUEST(ACTION_TYPES.UPDATE_RENTAL):
    case REQUEST(ACTION_TYPES.DELETE_RENTAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_RENTAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RENTAL):
    case FAILURE(ACTION_TYPES.CREATE_RENTAL):
    case FAILURE(ACTION_TYPES.UPDATE_RENTAL):
    case FAILURE(ACTION_TYPES.DELETE_RENTAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_RENTAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_RENTAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RENTAL):
    case SUCCESS(ACTION_TYPES.UPDATE_RENTAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RENTAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/rentals';

// Actions

export const getEntities: ICrudGetAllAction<IRental> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_RENTAL_LIST,
  payload: axios.get<IRental>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IRental> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RENTAL,
    payload: axios.get<IRental>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRental> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RENTAL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRental> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RENTAL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRental> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RENTAL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
