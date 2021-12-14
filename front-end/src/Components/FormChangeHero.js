import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const FormChangeHero = ({slug1}) => {

    const [slug , setSlug] = useState()
    const [name, setName] = useState()
    const [power, setPower] = useState([])
    const [color, setColor] = useState()
    const [age, setAge] = useState()
    const [image, setImage] = useState()
  
    let navigate = useNavigate()
    
    const handleChangeSlugAndName =(e) => {
        setSlug(e.target.value)
        setName(e.target.value)
    }
    const handleChangePower =(e) => {
        setPower([e.target.value])
    }
    const handleChangeColor =(e) => {
        setColor(e.target.value)
    }
    const handleChangeAge =(e) => {
        setAge(e.target.value)
    }
    const handleChangeImage =(e) => {
        setImage(e.target.value)
    }
    
    
    const handleSubmit = (e) => {
        e.preventDefault()

        const hero = {
            slug : slug,
            name : name,
            power: power,
            color : color,
            age : Number(age),
            image : image
        }
        console.log(" le log de mon hero avant de post",hero, slug1);
        fetch(`http://localhost:5000/heroes/${slug1}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            // je transforme mon objet hero  en string
            body: JSON.stringify(hero)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            navigate("/heroes")
        })
        
    }

    return (
        <form onSubmit={handleSubmit} >
            <div className="mb-3 row text-center" >
                <div className="col-4">
                    <label  className="form-label">modifier son nom</label>
                    <input onChange={handleChangeSlugAndName} value={slug} type="text" placeholder="modifiez le nom de votre héro" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="col-4">
                    <label  className="form-label">modifier ces pouvoirs</label>
                    <input onChange={handleChangePower} value={power} type="text" placeholder="modifier les pouvoir de votre héro" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="col-4">
                    <label  className="form-label">modifier sa couleur</label>
                    <input onChange={handleChangeColor} value={color} type="text" placeholder="modifier la couleur de votre héro" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
            </div>
            <div className="mb-3 row " >
                <div className="col-4">
                    <label  className="form-label">son age</label>
                    <input onChange={handleChangeAge} value={age} type="number" placeholder="modifier l'age de votre héros" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="col-4 d-flex">
                    {/* <label  className="form-label">l'adresse url de l'image</label> */}
                    <input onChange={handleChangeImage} value={image} type="text" placeholder="modifier l'adresse url d'une image de votre héros" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <button  type="submit" className="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    );
};

export default FormChangeHero;