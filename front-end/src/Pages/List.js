import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import Form from '../Components/Form';
import ButtonDeleteHero from '../Components/ButtonDeleteHero';

const List = () => {

    const [heros , setHeros] = useState([])
    
    useEffect(() => {
        fetch( `http://localhost:5000/heroes`)
            .then(reponse => reponse.json())
            .then(result => setHeros(result))
    }, [heros]);

    // console.log(heros);
    
    if(!heros){
        return "en chargement..."
    }

    return (
        <div className="container text-center ">
            <div className="row">
                {/* <h2>votre liste de héros</h2> */}
                <Form 
                heros1 ={heros}
                />
                {heros.map(hero =>
                    <div key={hero.name} className=" mt-5 col-4 ">
                        <div>
                            <div className="card">
                            <Link to ={`/heroes/${hero.slug}`}> <img src={hero.image} className="card-img-top img-fluid" style={{with:"200px",height:"200px"}} alt="..."/></Link>
                                <div className="card-body">
                                    <h5 className="card-title">name : {hero.name} </h5>
                                    <p className="card-text">couleur : {hero.color}</p>
                                    <p className="card-text">age: {hero.age} ans</p>
                                    {hero.power.map(power => <p key={power} className="card-text">les pouvoirs: {power} </p> )}
                                    
                                    <ButtonDeleteHero slug ={hero.slug} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default List;