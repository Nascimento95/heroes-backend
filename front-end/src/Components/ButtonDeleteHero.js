import React from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonDeleteHero = (props) => {
    const navigate = useNavigate()
    // 1- recupere le props slug
    const handleClickDelete = (slug) => {
        console.log("handleClickDelete slug =>", slug)
          
        fetch(`http://localhost:5000/heroes/${slug}`, {
            method: 'DELETE', // Method itself
            headers: {
             'Content-Type': 'application/json' // Indicates the content 
            },
        })
        .then(() => {
            navigate("/heroes")
        })
        .catch( error => console.log(error))
    }

    return (
        <button className="btn btn-danger" onClick={() => handleClickDelete(props.slug)}>deleteHero</button>
    );
};

export default ButtonDeleteHero;