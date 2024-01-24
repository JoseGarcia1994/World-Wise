import { useReducer, useContext, createContext } from 'react';
import { fakeUser } from '../helpers/index.js';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false
}

const reducer = (state, action) => {
  switch(action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      }
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false
      }
    default:
      throw new Error("Unknown action")
  }
}

const AuthProvider = ({children}) => {
  const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState);

  const login = (email, password) => {
    if(email === fakeUser.email && password === fakeUser.password) dispatch({type: 'login', payload: fakeUser})
  };

  const logout = () => {
    dispatch({type: 'logout'})
  };

  return (
    <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('AuthContext was used outside AuthProvider');
  return context;
}

export {
  AuthProvider,
  useAuth,
}
