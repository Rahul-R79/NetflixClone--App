import axios from "axios";

//Create a reusable Axios instance for OMDB API
const omdbApi = axios.create({
    baseURL: 'https://www.omdbapi.com',
    params: {
        apikey: import.meta.env.VITE_OMDB_API_KEY,
        type: 'movie'
    }
});

//search movies by query
export const searchMovies = async (query, page = 1) => {
    try {
        const response = await omdbApi.get('/', {
            params: { s: query, page }
        });

        if (response.data.Response === 'False') {
            throw new Error(response.data.Error || 'Failed to fetch movies');
        }

        return response.data;
    } catch (error) {
        console.error('OMDB API search error:', error.message);
        throw error;
    }
};

//Get full movie details by IMDb ID
export const getMovieDetails = async (imdbID) => {
    try {
        const response = await omdbApi.get('/', {
            params: { i: imdbID, plot: 'full' }
        });

        if (response.data.Response === 'False') {
            throw new Error(response.data.Error || 'Failed to fetch movie details');
        }

        return response.data;
    } catch (error) {
        console.error('OMDB details error:', error.message);
        throw error;
    }
};

// Fetch YouTube trailer for a given movie
export const getMovieTrailer = async (title, year) => {
    try {
        const query = `${title} ${year} official trailer`;

        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: query,
                key: import.meta.env.VITE_YOUTUBE_API_KEY,
                type: 'video',
                maxResults: 1,
            },
        });

        const videoId = response.data.items[0]?.id?.videoId;

        if (!videoId) return null;

        // Return embeddable trailer link
        return `https://www.youtube.com/embed/${videoId}`;
    } catch (error) {
        console.error('YouTube API error:', error.message);
        return null;
    }
};

//Utility to fallback poster image if not available
export const getPosterUrl = (posterUrl) => {
    return posterUrl && posterUrl !== "N/A"
        ? posterUrl
        : "https://via.placeholder.com/300x450?text=No+Poster";
};
