import React, { useCallback, useEffect, useRef, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  const [error,setError]=useState(null)
  const [retrying, setRetrying] = useState(false);
  const retryIntervalRef = useRef(null);

  const handleFetchMovies=useCallback(async ()=>{
    setError(null)
    setIsLoading(true)
    try{
      const response=await fetch('https://swapi.dev/api/films/')
      if(!response.ok){
        throw new Error('Something Went Wrong')
      }
      const data= await response.json();
  
      const transformedMovies=data.results.map((movie)=>{
        return{
          id:movie.episode_id,
          title:movie.title,
          openingText:movie.opening_crawl,
          releaseDate:movie.release_date,
  
        }
      })
      
      setMovies(transformedMovies);
      setRetrying(false);
      clearInterval(retryIntervalRef.current); 
      
    }
    catch(error){
      setError(error.message)
      setRetrying(true);
    }
    setIsLoading(false)
  },[]);

  useEffect(() => {
    if (retrying && !retryIntervalRef.current) {
      retryIntervalRef.current = setInterval(() => {
        handleFetchMovies();
      }, 5000); 
    }
    return () => {
      clearInterval(retryIntervalRef.current); 
    };
  }, [retrying, handleFetchMovies]);

  const handleCancelRetry = () => {
    clearInterval(retryIntervalRef.current); 
    setRetrying(false); 
  };

  useEffect(()=>{
    handleFetchMovies();
  },[handleFetchMovies]);

  let content=<p>Found no movies</p>

  if(movies.length>0){
    content=<MoviesList movies={movies}/>
  }

  if(error){
    content=<p>{error}...<b>Retrying</b></p>
  }

  if(isLoading){
    content=<p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={handleFetchMovies}>Fetch Movies</button>
        {retrying && <button onClick={handleCancelRetry}>Cancel Retry</button>}
      </section>
      
      <section>
      {content}
      </section>
      
    </React.Fragment>
  );
}

export default App;
