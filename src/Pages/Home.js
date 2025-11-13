import React, { useEffect, useState } from 'react'
import {
  AppBar, Toolbar, Typography, Grid, Box,
  Stack, Skeleton,Button
} from '@mui/material'
import { Movie } from '@mui/icons-material'
import axios from 'axios'
import SearchBar from './SearchBar'
import  MovieCard from './MovieCard'

const HomePage = () => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [category,setCategory] =useState("all")

  const handleCategoryChange=(cat)=>{
    setCategory(cat)
      setMovies([]);
     setPage(1);


  }

  const handleSearch = ((term)=> {
    setMovies([]);   
    setPage(1); 
    setSearchQuery(term)     
  })

  const onAddtoFavorites=(movie)=>{

    const StoredFav= JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyAdded=StoredFav.some((fav)=>fav.id===movie.id)
    if(isAlreadyAdded) {
      alert("Already in favorites")
      return;
    }
    StoredFav.push(movie);
    localStorage.setItem("favorites",JSON.stringify(StoredFav))
    alert("Added to favorites")

  }

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const genreParam = category === "all" ? "" : category;

      try {
        const response = await axios.get(
          `https://movie-database-api1.p.rapidapi.com/list_movies.json?limit=9&page=${page}&quality=all&genre=${genreParam}&minimum_rating=0&query_term=${encodeURIComponent(searchQuery)}&sort_by=year&order_by=desc&with_rt_ratings=false`,
          {
            headers: {
              'X-RapidAPI-Key': '7901c3daa7msh8dc0f70465fd455p1b997ejsn34a7752dc7f5',
              'X-RapidAPI-Host': 'movie-database-api1.p.rapidapi.com'
            }
          }
        );
         console.log(response.data)
            const newMovies = response.data.data.movies
           

        setMovies(prev => [...prev, ...newMovies]);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, searchQuery,category]); // ✅ search dependency added



  return (
    <div>
      {/* Navbar */}
      <AppBar position='static'>
        <Toolbar>
          <Movie sx={{ mr: 1 }} />
          <Typography variant='h5' sx={{ flexGrow: 1, fontWeight: "bold" }}>
            🎬 Movie Explorer
          </Typography>
              <Stack direction='row' spacing={2}>
            <Button color='inherit' onClick={() => handleCategoryChange("all")}>All</Button>
            <Button color='inherit' onClick={() => handleCategoryChange("comedy")}>Comedy</Button>
            <Button color='inherit' onClick={() => handleCategoryChange("action")}>Action</Button>
            <Button color='inherit' onClick={() => handleCategoryChange("adventure")}>Adventure</Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Search */}
      
       <SearchBar onSearch={handleSearch}/>
      

      {/* Title */}
      <Typography sx={{ mt: 3, textAlign: "center", fontWeight: "bold" }} variant="h6">
        {searchQuery ? `Search Results for "${searchQuery}"` : "🔥 Trending Movies"}
      </Typography>

      {/* Movie Cards */}
      <Grid container spacing={2} sx={{ mt: 2, p: 2 }}>
        {loading ? <Skeleton count={8}/>
          : movies?.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              
             <MovieCard movie={movie} onAddtoFavorites={onAddtoFavorites}/>


            </Grid>
          ))}

      </Grid>

      {/* Load More Button */}
      {movies.length > 0 && (
        <Box sx={{ textAlign: "center", p: 3 }}>
          <Button
            variant='contained'
            size='large'
            disabled={loading}
            onClick={() => setPage(prev => prev + 1)}
            sx={{ width: "50%", py: 1.2 }}
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </Box>
      )}

    </div>
  );
}

export default HomePage;
