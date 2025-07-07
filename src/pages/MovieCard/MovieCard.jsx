import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { getPosterUrl } from '../../services/omdb';
import './MovieCard.css';

const MovieCard = ({ 
    movie, 
    cardBackground = '#000' 
}) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/movie/${movie.imdbID}`);
    };

    return (
        <Card 
            className="movie-card h-100" 
            onClick={handleCardClick}
            style={{ backgroundColor: cardBackground, color: 'white' }}
        >
            <Card.Img 
                variant="top" 
                src={getPosterUrl(movie.Poster)} 
                alt={movie.Title}
                className="movie-poster"
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="text-truncate">{movie.Title}</Card.Title>
                <Card.Text>
                    {movie.Year} • {movie.Type}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default MovieCard;
