import { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signOut, 
    onAuthStateChanged
} from "firebase/auth";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
};

function reducer(state, action) {
    switch(action.type) {
        case 'LOGIN':
            return {...state, user: action.payload, isAuthenticated: true, error: null};
        case 'LOGOUT':
            return {...state, user: null, isAuthenticated: false, error: null};
        case 'SET_LOADING':
            return {...state, isLoading: action.payload};
        case 'SET_ERROR':
            return {...state, error: action.payload};
        case 'CLEAR_ERROR':
            return {...state, error: null};
        default:
            return state;
    }
}

function AuthProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                dispatch({type: 'LOGIN', payload: user});
            } else {
                dispatch({type: 'LOGOUT'});
            }
            dispatch({type: 'SET_LOADING', payload: false});
        });
        return unSubscribe;
    }, []);

    const login = async (email, password) => {
        dispatch({type: 'SET_LOADING', payload: true});
        dispatch({type: 'CLEAR_ERROR'});
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch(error) {
            let errorMessage = "Login failed. Please try again.";
            if (error.code === 'auth/invalid-credential') {
                errorMessage = "Invalid email or password.";
            }
            dispatch({type: 'SET_ERROR', payload: errorMessage});
            dispatch({type: 'SET_LOADING', payload: false});
            throw error;
        }
    };

    const signUp = async (email, password) => {
        dispatch({type: 'SET_LOADING', payload: true});
        dispatch({type: 'CLEAR_ERROR'});
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch(error) {
            let errorMessage = "Signup failed. Please try again.";
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "Email already in use. Please login instead.";
            }
            dispatch({type: 'SET_ERROR', payload: errorMessage});
            dispatch({type: 'SET_LOADING', payload: false});
            throw error;
        }
    }

    const logout = async () => {
        dispatch({type: 'SET_LOADING', payload: true});
        try {
            await signOut(auth);
        } catch(error) {
            dispatch({type: 'SET_ERROR', payload: error.message});
        } finally {
            dispatch({type: 'SET_LOADING', payload: false});
        }
    }

    return (
        <AuthContext.Provider value={{
            user: state.user,
            isAuthenticated: state.isAuthenticated,
            isLoading: state.isLoading,
            error: state.error,
            login,
            signUp,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}