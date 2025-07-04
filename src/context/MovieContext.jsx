import { createContext, useReducer } from "react";

const MovieContext = createContext();

const initalState = {
    movies: [],
    watchList: []
}

function reducer(state, action){
    switch(action.type){
        case 'SET_MOVIES':
            return{...state, movies: action.payload};
        case 'ADD_TO_WATCHLIST':
            return{...state, watchList: [...state.watchList, action.payload]};
        case 'REMOVE_FROM_WATCHLIST':
            return{...state, watchList: state.watchList.filter(movie => movie.imdbID !== action.payload)};
        default: 
        return state
    }
}

function MovieProvider({children}){
    const [state, dispatch] = useReducer(reducer, initalState);
    
    const setMovies = (movies)=>{
        dispatch({type: 'SET_MOVIES', payload: movies});
    }

    const addToWatchList = (movie)=>{
        dispatch({type: 'ADD_TO_WATCHLIST', payload: movie});
    }

    const removeFromWatchList = (imdbID)=>{
        dispatch({type: 'REMOVE_FROM_WATCHLIST', payload: imdbID})
    }

    return(
        <MovieContext.Provider value={{...state, setMovies, addToWatchList, removeFromWatchList}}>
            {children}
        </MovieContext.Provider>
    )
}

export {MovieContext, MovieProvider}