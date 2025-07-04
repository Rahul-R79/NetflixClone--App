import axios from "axios";

const omdbApi = axios.create({
    baseURL: 'https://www.omdbapi.com',
    params: {
        apikey: import.meta.env.VITE_OMDB_API_KEY,
        type: 'movie'
    }
});


export const searchMovies = async(query, page = 1) =>{
    try{
        const response = await omdbApi.get('/', {
            params: {s: query, page}
        });
        return response.data.Search || [];
    }catch(error){
        console.error('omdb Api search error', error.message);
        return[];
    }
}

export const getMovieDetails = async(imdbID)=>{
    try{
        const response = await omdbApi.get('/', {
            params: {i: imdbID, plot: 'full'}
        });
        return response.data
    }catch(error){
        console.error('omdb details error', error.message);
        return null;
    }
}

export const getPosterUrl = (posterUrl) =>{
    return posterUrl && posterUrl !== "N/A" ? posterUrl : "https://via.placeholder.com/300x450?text=No+Poster";

}