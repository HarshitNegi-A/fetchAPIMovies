import React, { useEffect } from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
    async function  handleDeleteButton(id){
      await fetch('https://movies-2b420-default-rtdb.firebaseio.com/movies/'+id+'.json',{
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json'
        }
    }); 

    
    }
  
  return ( <>
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={()=>handleDeleteButton(props.id)}>Delete Movie</button>
    </li>
   
    </>
  );
};

export default Movie;
