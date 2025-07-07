import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { getMovieDetails, getMovieTrailer } from '../../services/omdb';
import { AuthContext } from '../../context/AuthContext';
import { MovieContext } from '../../context/MovieContext';
import './MovieDetail.css';

const MovieDetails = () => {
    const { imdbID } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { isAuthenticated } = useContext(AuthContext);
    const { watchList, addToWatchList, removeFromWatchList } = useContext(MovieContext);

    // Fetch movie details and trailer when component mounts 
    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch movie metadata
                const details = await getMovieDetails(imdbID);
                if (details.Response === 'False') throw new Error(details.Error);
                setMovie(details);

                // Fetch YouTube trailer URL based on title and year
                const trailer = await getMovieTrailer(details.Title, details.Year);
                if (trailer) setTrailerUrl(trailer);
            } catch (err) {
                setError(err.message || 'Failed to load movie details');
            } finally {
                setLoading(false);
            }
        };

        fetchMovieData();
    }, [imdbID]);

    // Check if movie exists in user's watchlist
    const isInWatchList = () =>
        watchList.some(m => m.imdbID === imdbID);

    // Show spinner while loading
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
                <Spinner animation="border" variant="light" />
            </div>
        );
    }

    // Display error UI
    if (error) {
        return (
            <Container className="my-5 text-center">
                <Alert variant="danger">{error}</Alert>
                <Button variant="primary" onClick={() => navigate('/')}>
                    Go Back Home
                </Button>
            </Container>
        );
    }

    if (!movie) return null;

    return (
        <div className="movie-details-page bg-dark text-white">
            <Container>
                {/* Back button */}
                <Button 
                    variant="outline-light" 
                    onClick={() => navigate(-1)} 
                    className="mb-4"
                >
                    &larr; Back
                </Button>

                {/* Movie header section */}
                <Row className="movie-header mb-5">
                    <Col md={4} className="mb-4 mb-md-0">
                        <img
                            src={
                                movie.Poster !== 'N/A' 
                                    ? movie.Poster 
                                    : 'https://via.placeholder.com/300x450?text=No+Poster'
                            }
                            alt={movie.Title}
                            className="img-fluid rounded"
                        />
                    </Col>
                    <Col md={8}>
                        <h1>{movie.Title} ({movie.Year})</h1>
                        <div className="mb-3">
                            <strong>Director:</strong> {movie.Director}
                        </div>
                        <div className="mb-3">
                            <strong>Actors:</strong> {movie.Actors}
                        </div>
                        <div className="mb-4">
                            <strong>Plot:</strong> {movie.Plot}
                        </div>

                        {/* Watchlist */}
                        {isAuthenticated && (
                            isInWatchList() ? (
                                <Button
                                    variant="danger"
                                    onClick={() => removeFromWatchList(movie.imdbID)}
                                >
                                    Remove from Watchlist
                                </Button>
                            ) : (
                                <Button
                                    variant="success"
                                    onClick={() => addToWatchList(movie)}
                                >
                                    Add to Watchlist
                                </Button>
                            )
                        )}
                    </Col>
                </Row>

                {/* Trailer Section */}
                {trailerUrl ? (
                    <div className="trailer-section mb-5">
                        <h2 className="mb-4">Trailer</h2>
                        <div className="ratio ratio-16x9">
                            <iframe
                                src={trailerUrl}
                                title={`${movie.Title} Trailer`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                ) : (
                    // Fallback when trailer is not available
                    <div className="trailer-not-found mb-5">
                        <h2 className="mb-3">Trailer Not Available</h2>
                        <Button
                            variant="outline-light"
                            as="a"
                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie.Title} ${movie.Year} official trailer`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Search on YouTube &rarr;
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default MovieDetails;
