
import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardMedia, Button, Typography } from '@mui/material'

const MovieCard = ({ movie, onAddtoFavorites }) => {
  const handleAddFavorite = (e) => {
    e.stopPropagation();  
    e.preventDefault();   
    onAddtoFavorites(movie);
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Card
        elevation={4}
        sx={{
          borderRadius: 2,
          transition: '0.3s',
          '&:hover': { transform: 'scale(1.03)' },
        }}
      >
        <CardMedia
          component="img"
          height="350"
          image={movie?.medium_cover_image}
          alt={movie?.title}
        />
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ⭐ {movie.rating}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddFavorite}
          >
            Add to Favorites
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;
