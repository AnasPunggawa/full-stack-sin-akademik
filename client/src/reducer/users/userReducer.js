export const INITIAL_STATE_USER_REDUCER = {
  loading: false,
  error: false,
  errorMessage: '',
  data: null,
};

export const ACTION_USER_REDUCER = {
  FETCH_DATA_LOADING: 'FETCH_DATA_LOADING',
  FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS',
  FETCH_DATA_ERROR: 'FETCH_DATA_ERROR',
};

export function userReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_USER_REDUCER.FETCH_DATA_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
        data: null,
      };
    case ACTION_USER_REDUCER.FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case ACTION_USER_REDUCER.FETCH_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload,
        data: null,
      };
    default:
      return state;
  }
}