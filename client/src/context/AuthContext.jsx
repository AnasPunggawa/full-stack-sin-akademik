import PropTypes from 'prop-types';
import { createContext, useReducer } from 'react';
import { authReducerContext } from '../reducer/authReducerContext';

const initialState = { auth: false, accessToken: '', user: {} };

export const AuthContext = createContext(initialState);

export function AuthProvider({ children }) {
  const [auth, dispatch] = useReducer(authReducerContext, initialState);
  return (
    <AuthContext.Provider
      value={{ auth, user: auth.user, accessToken: auth.accessToken, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.any,
};
