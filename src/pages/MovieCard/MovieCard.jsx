import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { getPosterUrl } from '../../services/omdb';
import './MovieCard.css';

const MovieCard = ({movie}) => {
    
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/movie/${movie.imdbID}`);
    };

    return (
        <Card 
            className="movie-card h-100" 
            onClick={handleCardClick}
            style={{ backgroundColor: '#000', color: '#fff'}}
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
