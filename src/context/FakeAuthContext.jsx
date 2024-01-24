import { useReducer } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
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

/* const fakeUser = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
}; */


const AuthProvider = ({children}) => {
  const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState);

  const login = () => {
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
  const context = useContext();
  if (context === undefined) throw new Error('AuthContext was used outside AuthProvider')
}

export {
  AuthProvider,
  useAuth,
}
