import { useContext, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import { searchMovies } from "../services/omdb";

function Home () {
  const { movies, setMovies } = useContext(MovieContext);

  useEffect(() => {
    const loadMovies = async () => {
      const results = await searchMovies("avengers"); // Test search
      setMovies(results);
    };
    loadMovies();
  }, []);

  return (
    <div>
      <h1>Netflix Clone</h1>
      <pre>{JSON.stringify(movies, null, 2)}</pre> {/* Debug output */}
    </div>
  );
};
export default Home;