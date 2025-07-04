import { useEffect } from "react"
import { searchMovies } from "../services/omdb"

function Home() {
    useEffect(() => {
        const testApi = async () => {
            // Test with multiple movie names
            const testQueries = [
                "inception", 
                "the godfather", 
                "pulp fiction", 
                "titanic", 
                "interstellar"
            ];
            
            for (const query of testQueries) {
                const result = await searchMovies(query);
                console.log(`Results for "${query}":`, result);
            }
        }

        testApi();
    }, []);

    return (
        <h1 className="text-primary">Testing OMDB API</h1>
    )
}

export default Home