import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Alert, Spinner, Button } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { MovieContext } from '../../context/MovieContext';
import { searchMovies } from '../../services/omdb';
import MovieCard from '../MovieCard/MovieCard';
import Footer from '../../components/common/Footer/Footer';
import AppNavbar from '../../components/common/AppNavbar'
import '../Home/Home.css';

const Home = () => {
    const { error: authError } = useContext(AuthContext);
    const { watchList, removeFromWatchList } = useContext(MovieContext);

    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [trendingNow, setTrendingNow] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loadingMovies, setLoadingMovies] = useState(true);
    const [movieError, setMovieError] = useState(null);

    useEffect(() => {
        const fetchInitialMovies = async () => {
            try {
                setLoadingMovies(true);
                setMovieError(null);

                const [featured, trending, rated] = await Promise.all([
                    searchMovies('avengers'),
                    searchMovies('action'),
                    searchMovies('drama')
                ]);

                setFeaturedMovies(featured.Search?.slice(0, 8) || []);
                setTrendingNow(trending.Search || []);
                setTopRated(rated.Search || []);
            } catch (error) {
                setMovieError(error.message || 'Failed to load movies.');
            } finally {
                setLoadingMovies(false);
            }
        };

        fetchInitialMovies();
    }, []);

    const isInWatchList = (imdbID) =>
        watchList.some((movie) => movie.imdbID === imdbID);

    return (
        <div className="home-page">
            {/* Navbar */}
            <AppNavbar/>
            {/* Hero Banner Section */}
            <div className="hero-banner">
                <div className="hero-overlay"></div>
                <div className="hero-content text-center">
                    <h1 className="hero-title">Unlimited movies, TV shows and more</h1>
                    <p className="hero-subtitle">Watch anywhere. Cancel anytime.</p>
                    <div className="cta-form mt-4">
                        <p className="cta-text">
                            Ready to watch? Enter your email to create or restart your membership.
                        </p>
                        <div className="cta-input-group">
                            <input
                                type="email"
                                className="cta-input"
                                placeholder="Email address"
                            />
                            <button className="cta-button">
                                Get Started <span className="chevron-right">›</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="content-sections">

                {/* Featured Section */}
                <section className="movie-section">
                    <Container>
                        <h2 className="section-title">Featured Movies</h2>
                        {loadingMovies ? (
                            <div className="loading-spinner">
                                <Spinner animation="border" variant="light" />
                            </div>
                        ) : featuredMovies.length > 0 ? (
                            <Row className="movie-row">
                                {featuredMovies.map((movie) => (
                                    <Col key={movie.imdbID} xs={12} md={4} lg={3} className="movie-col g-5">
                                        <MovieCard
                                            movie={movie}
                                            isInWatchList={isInWatchList(movie.imdbID)}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <Alert variant="dark" className="no-movies-alert">
                                No featured movies available
                            </Alert>
                        )}
                    </Container>
                </section>

                {/* Trending Section */}
                <section className="movie-section">
                    <Container>
                        <h2 className="section-title">Trending Now</h2>
                        {loadingMovies ? (
                            <div className="loading-spinner">
                                <Spinner animation="border" variant="light" />
                            </div>
                        ) : trendingNow.length > 0 ? (
                            <Row className="movie-row">
                                {trendingNow.map((movie) => (
                                    <Col key={movie.imdbID} xs={12} md={4} lg={3} className="movie-col g-5">
                                        <MovieCard
                                            movie={movie}
                                            isInWatchList={isInWatchList(movie.imdbID)}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <Alert variant="dark" className="no-movies-alert">
                                No trending movies available
                            </Alert>
                        )}
                    </Container>
                </section>

                {/* Top Rated Section */}
                <section className="movie-section">
                    <Container>
                        <h2 className="section-title">Top Rated</h2>
                        {loadingMovies ? (
                            <div className="loading-spinner">
                                <Spinner animation="border" variant="light" />
                            </div>
                        ) : topRated.length > 0 ? (
                            <Row className="movie-row">
                                {topRated.map((movie) => (
                                    <Col key={movie.imdbID} xs={12} md={4} lg={3} className="movie-col g-5">
                                        <MovieCard
                                            movie={movie}
                                            isInWatchList={isInWatchList(movie.imdbID)}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <Alert variant="dark" className="no-movies-alert">
                                No top rated movies available
                            </Alert>
                        )}
                    </Container>
                </section>

                {/* Watchlist Section */}
                {watchList.length > 0 && (
                    <section className="movie-section">
                        <Container>
                            <h2 className="section-title">My Watchlist</h2>
                            <Row className="movie-row">
                                {watchList.map((movie) => (
                                    <Col key={movie.imdbID} xs={12} md={4} lg={3} className="movie-col g-5">
                                        <MovieCard
                                            movie={movie}
                                            isInWatchList={true}
                                            onRemoveFromList={() => removeFromWatchList(movie.imdbID)}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </section>
                )}
            </div>
            {/* Footer */}
            <Footer />
            {/* Error Handling */}
            {(authError || movieError) && (
                <Alert variant="danger" className="error-alert">
                    {authError || movieError}
                </Alert>
            )}
        </div>
    );
};

export default Home;
