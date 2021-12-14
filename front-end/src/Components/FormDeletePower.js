import React from 'react';

const FormDeletePower = ({ slug, power}) => {

    const handleClickDelete = (slug, power) => {
        console.log("handleClickDelete slug =>", slug ,power)
          
        fetch(`http://localhost:5000/heroes/${slug}/power/${power}`, {
            method: 'DELETE', // Method itself
            headers: {
             'Content-Type': 'application/json' // Indicates the content 
            },
        })
        .then(() => {
            // navigate("/heroes")
        })
        .catch( error => console.log(error))
    }
    return (
        <div>
             <button className="btn btn-danger" onClick={() => handleClickDelete(slug , power)}>delete power</button>
        </div>
    );
};

export default FormDeletePower;