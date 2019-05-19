import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFleetOwner, defaultValue } from 'app/shared/model/fleet-owner.model';

export const ACTION_TYPES = {
  FETCH_FLEETOWNER_LIST: 'fleetOwner/FETCH_FLEETOWNER_LIST',
  FETCH_FLEETOWNER: 'fleetOwner/FETCH_FLEETOWNER',
  CREATE_FLEETOWNER: 'fleetOwner/CREATE_FLEETOWNER',
  UPDATE_FLEETOWNER: 'fleetOwner/UPDATE_FLEETOWNER',
  DELETE_FLEETOWNER: 'fleetOwner/DELETE_FLEETOWNER',
  SET_BLOB: 'fleetOwner/SET_BLOB',
  RESET: 'fleetOwner/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFleetOwner>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type FleetOwnerState = Readonly<typeof initialState>;

// Reducer

export default (state: FleetOwnerState = initialState, action): FleetOwnerState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FLEETOWNER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FLEETOWNER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FLEETOWNER):
    case REQUEST(ACTION_TYPES.UPDATE_FLEETOWNER):
    case REQUEST(ACTION_TYPES.DELETE_FLEETOWNER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FLEETOWNER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FLEETOWNER):
    case FAILURE(ACTION_TYPES.CREATE_FLEETOWNER):
    case FAILURE(ACTION_TYPES.UPDATE_FLEETOWNER):
    case FAILURE(ACTION_TYPES.DELETE_FLEETOWNER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FLEETOWNER_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_FLEETOWNER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FLEETOWNER):
    case SUCCESS(ACTION_TYPES.UPDATE_FLEETOWNER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FLEETOWNER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/fleet-owners';

// Actions

export const getEntities: ICrudGetAllAction<IFleetOwner> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_FLEETOWNER_LIST,
    payload: axios.get<IFleetOwner>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IFleetOwner> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FLEETOWNER,
    payload: axios.get<IFleetOwner>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFleetOwner> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FLEETOWNER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IFleetOwner> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FLEETOWNER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFleetOwner> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FLEETOWNER,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
