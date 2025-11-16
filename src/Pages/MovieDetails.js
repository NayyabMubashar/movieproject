import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://movie-database-api1.p.rapidapi.com/list_movies.json?movie_id=${id}`,
          {
            headers: {
              "X-RapidAPI-Key": "07ae2b2824msh68c5a23ecb2eebfp1e70fejsn8ed8c3bd243c",
              "X-RapidAPI-Host": "movie-database-api1.p.rapidapi.com",
            },
          }
        );

        console.log("API Response:", response.data);
        setMovie(response.data.data.movies[0]);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    }; 

    fetchMovieDetail();
  }, [id]);

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  if (!movie)
    return (
      <Typography sx={{ mt: 5, textAlign: "center" }}>
        No movie details found.
      </Typography>
    );

  return (
    <Box sx={{ p: 3 }}>
      <Button variant="contained" onClick={() => navigate(-1)}>
        Back
      </Button>

      <Card sx={{ mt: 3, p: 2 }}>
        <CardMedia
          component="img"
          height="500"
          image={movie.large_cover_image}
          alt={movie.title}
          sx={{ borderRadius: 2 }}
        />
        <CardContent>
          <Typography variant="h4" sx={{ mt: 2 }}>
            {movie.title}
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            {movie.description_full || "No description available."}
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Genre: {movie.genres?.join(", ")}
          </Typography>

          <Typography variant="subtitle1">Year: {movie.year}</Typography>
          <Typography variant="subtitle1">⭐ Rating: {movie.rating}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MovieDetails;

