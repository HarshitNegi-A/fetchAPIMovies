import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
    // async function  handleDeleteButton(movie){
    //   const response = await fetch('https://movies-2b420-default-rtdb.firebaseio.com/movies.json',{
    //     method:'POST',
    //     body : JSON.stringify(movie),
    //     headers:{
    //       'Content-Type': 'application/json'
    //     }
    // });
    // const data=await response.json();
    // console.log(data)
    // }
    console.log(props.key)
  
  return ( <>
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
    </li>
    <button >Delete Movie</button>
    </>
  );
};

export default Movie;
