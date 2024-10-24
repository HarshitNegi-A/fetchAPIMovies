import React, { useCallback, useEffect, useRef, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import MovieForm from './components/MovieForm';

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
      const response=await fetch('https://movies-2b420-default-rtdb.firebaseio.com/movies.json')
      if(!response.ok){
        throw new Error('Something Went Wrong')
      }
      const data= await response.json();

      const loadedMovies=[];
      for(const key in data){
        loadedMovies.push({
          id:key,
          title:data[key].title,
          openingText:data[key].opening_text,
          releaseDate:data[key].date
        })
      }
      
      setMovies(loadedMovies);
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
  async function  handleAddMovie(movie){
    const response = await fetch('https://movies-2b420-default-rtdb.firebaseio.com/movies.json/',{
      method:'POST',
      body : JSON.stringify(movie),
      headers:{
        'Content-Type': 'application/json'
      }
  });
  const data=await response.json();
  console.log(data.name)
  }

  return (
    <React.Fragment>
      <section>
        <MovieForm onAddMovie={handleAddMovie}/>
      </section>
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
