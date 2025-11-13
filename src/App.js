
import { BrowserRouter } from 'react-router-dom';
import {Routes,Route } from 'react-router-dom';

import MovieDetails from './Pages/MovieDetails';
import HomePage from './Pages/Home';

function App() {
  return (
    <>
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/movie/:id" element={<MovieDetails/>}/>

      </Routes>
</BrowserRouter>
    </>
  );
}


export default App;
