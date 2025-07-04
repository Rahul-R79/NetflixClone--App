import { createContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false
};

function reducer (state, action){
    switch(action.type){
        case "LOGIN":
            return{...state, user: action.payload, isAuthenticated: true}
        case "LOGOUT":
            return{...state, user: null, isAuthenticated: false}
        default:
            return state
    }
}

function AuthProvider({children}){
    const [state, dispatch] = useReducer(reducer, initialState);

    const login = (email)=>{
        dispatch({type: 'LOGIN', payload: {email}});
    }

    const logout = ()=>{
        dispatch({type: 'LOGOUT'})
    }

    return(
        <AuthContext.Provider value={{...state, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}