const initialState = {
  activities: [],
  regionManagers: [],
  loading: false,
  loadingManagers: false,
  noMoreResults: false,
}

// Actions
export const LOADING = 'ACTIVITIES/LOADING';
export const LOADING_MORE = 'ACTIVITIES/LOADING_MORE';
export const LOADING_MANAGERS = 'ACTIVITIES/LOADING_MANAGERS';
export const NO_MORE_RESULTS = 'ACTIVITIES/NO_MORE_RESULTS';
export const ADD_ONE = 'ACTIVITIES/ADD_ONE';
export const SET_ALL = 'ACTIVITIES/SET_ALL';
export const SET_MORE = 'ACTIVITIES/SET_MORE';
export const SET_MANAGERS = 'ACTIVITIES/SET_MANAGERS';
export const DELETE_ONE = 'ACTIVITIES/DELETE_ONE';
export const CLEAR_ALL = 'ACTIVITIES/CLEAR_ALL';
export const ERROR = 'ACTIVITIES/ERROR';

export const activitiesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case LOADING_MORE:
      return {
        ...state,
        loadingMore: true
      }
    case LOADING_MANAGERS:
      return {
        ...state,
        loadingManagers: true
      }
    case ADD_ONE:
      return {
        ...state,
        activities: [payload.newActivity, ...state.activities],
        loading: false
      }
    case CLEAR_ALL:
      return {
        ...state,
        activities: []
      }
    case NO_MORE_RESULTS:
      return {
        ...state,
        noMoreResults: payload
      }
    case SET_ALL:
      return {
        ...state,
        ...payload,
        loading: false,
        loadingMore: false
      }
    case SET_MORE:
      return {
        ...state,
        activities: [...state.activities, ...payload.activities],
        loading: false,
        loadingMore: false,
      }
    case SET_MANAGERS:
      return {
        ...state,
        regionManagers: payload,
        loading: false,
        loadingManagers: false
      }
    case DELETE_ONE:
      return {
        ...state,
        activities: [...state.activities.filter(activity => activity.id !== payload)]
      }
    case ERROR:
      return {
        ...state,
        loadingManagers: false,
        loading: false,
        loadingMore: false
      }
    default: return state
  }
}
