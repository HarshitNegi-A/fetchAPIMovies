import { useState } from "react";
import classes from "./MovieForm.module.css"

const MovieForm=(props)=>{

    const [title,setTitle]=useState("")
    const [opening,setOpening]=useState("")
    const [date,setDate]=useState("")

    const handleSubmitButton=(e)=>{
        e.preventDefault();
        const obj={
            title : title,
            opening_text:opening,
            date:date,

        }
        console.log(obj);
        props.onAddMovie(obj)
        
    }

    return <form className={classes.form} onSubmit={handleSubmitButton}>
        <label htmlFor="title">Title</label><br/>
        <input value={title} type="text" id="title" onChange={(e)=>{setTitle(e.target.value)}}/><br/>
        <label htmlFor="opening_text">Opening Text</label><br/>
        <input value={opening} type="text" id="opening_text" className={classes.opening} onChange={(e)=>{setOpening(e.target.value)}}/><br/>
        <label htmlFor="date">Release Date</label><br/>
        <input value={date} type="text" id="date" onChange={(e)=>{setDate(e.target.value)}}/><br/>
        <button type="submit">Add Movie</button>
    </form>
}

export default MovieForm;