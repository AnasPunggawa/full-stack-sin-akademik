export const INITIAL_STATE_NEW_USER_REDUCER = {
  loading: false,
  error: false,
  errorMessage: '',
  data: {
    username: '',
    password: '',
    konfPassword: '',
    role: '',
  },
};

export const ACTION_NEW_USER_REDUCER = {
  CREATE_DATA_LOADING: 'CREATE_DATA_LOADING',
  CREATE_DATA_INPUT: 'CREATE_DATA_INPUT',
  CREATE_DATA_SUCCESS: 'CREATE_DATA_SUCCESS',
  CREATE_DATA_ERROR: 'CREATE_DATA_ERROR',
};

export function newUserReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_NEW_USER_REDUCER.CREATE_DATA_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
        data: { ...payload },
      };
    case ACTION_NEW_USER_REDUCER.CREATE_DATA_INPUT:
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
        data: { ...state.data, [payload.name]: payload.value },
      };
    case ACTION_NEW_USER_REDUCER.CREATE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case ACTION_NEW_USER_REDUCER.CREATE_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload,
        data: state.data,
      };
    default:
      return state;
  }
}
