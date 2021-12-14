import React, { useState } from 'react';
import { useParams } from 'react-router';

const FormChangePower = () => {
    const [power, setPower] = useState()
    
    const {slug} = useParams()
    
    const handleChangePower =(e) => {
        setPower(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const powers = 
             power
        
        console.log(" le log de mon hero avant de post",powers);
        fetch(`http://localhost:5000/heroes/${slug}/powers`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({power: powers})
            // je transforme mon objet hero  en string
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // navigate("/post")
        })
        // .catch(error => setError("name deja utiliser"))
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="col-4">
                <label  className="form-label">rajoutez son new power</label>
                <input 
                onChange={handleChangePower} 
                value={power} 
                type="text" 
                placeholder="entrez son nom de votre héro" 
                className="form-control" 
                />
                <button className="btn btn-primary">changePower</button>
            </div>
        </form>
    );
};

export default FormChangePower;