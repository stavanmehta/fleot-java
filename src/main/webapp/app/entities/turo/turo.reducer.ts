import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITuro, defaultValue } from 'app/shared/model/turo.model';

export const ACTION_TYPES = {
  FETCH_TURO_LIST: 'turo/FETCH_TURO_LIST',
  FETCH_TURO: 'turo/FETCH_TURO',
  CREATE_TURO: 'turo/CREATE_TURO',
  UPDATE_TURO: 'turo/UPDATE_TURO',
  DELETE_TURO: 'turo/DELETE_TURO',
  RESET: 'turo/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITuro>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TuroState = Readonly<typeof initialState>;

// Reducer

export default (state: TuroState = initialState, action): TuroState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TURO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TURO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TURO):
    case REQUEST(ACTION_TYPES.UPDATE_TURO):
    case REQUEST(ACTION_TYPES.DELETE_TURO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TURO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TURO):
    case FAILURE(ACTION_TYPES.CREATE_TURO):
    case FAILURE(ACTION_TYPES.UPDATE_TURO):
    case FAILURE(ACTION_TYPES.DELETE_TURO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TURO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TURO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TURO):
    case SUCCESS(ACTION_TYPES.UPDATE_TURO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TURO):
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

const apiUrl = 'api/turos';

// Actions

export const getEntities: ICrudGetAllAction<ITuro> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TURO_LIST,
  payload: axios.get<ITuro>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITuro> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TURO,
    payload: axios.get<ITuro>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITuro> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TURO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITuro> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TURO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITuro> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TURO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
