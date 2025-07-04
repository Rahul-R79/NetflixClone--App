import { createContext, useReducer } from "react";

const MovieContext = createContext();

const initalState = {
    movies: [],
    watchList: []
}

