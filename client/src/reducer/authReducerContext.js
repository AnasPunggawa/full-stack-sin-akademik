export const ACTION_AUTH_REDUCER_CONTEXT = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

export function authReducerContext(state, action) {
  const { type, payload } = action;

  console.log(type);

  switch (type) {
    case ACTION_AUTH_REDUCER_CONTEXT.LOGIN:
      return {
        ...state,
        auth: true,
        accessToken: payload.accessToken,
        user: payload.user,
      };
    case ACTION_AUTH_REDUCER_CONTEXT.LOGOUT:
      return {
        ...state,
        auth: false,
        accessToken: '',
        user: {},
      };
    default:
      return state;
  }
}
