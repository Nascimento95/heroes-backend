import React, { useState , useEffect } from 'react';
import { useParams } from 'react-router';
import FormChangePower from '../Components/FormChangePower';
import FormDeletePower from '../Components/FormDeletePower';
import FormChangeHero from '../Components/FormChangeHero';
const OneHeros = () => {

    const [hero , setHero] = useState(null)

    const {slug} = useParams()
    console.log(slug);
    useEffect(() => {
        fetch( `http://localhost:5000/heroes/${slug}`)
            .then(reponse => reponse.json())
            .then(result => setHero(result))
    }, []);

    if(!hero){
        return "en chargement..."
    }
    console.log(" one hero",hero);
    return (
        <div className="container back">
            <FormChangeHero slug1 = {hero.slug} />
            <h2 className='text-center mt-5'>mon héros sélèctionner</h2>
                <div key={hero.name} className="row mt-3 ">
                    <div className="col-5">
                        <div className="card">
                            <img src={hero.image} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">name : {hero.name} </h5>
                                <p className="card-text">couleur : {hero.color}</p>
                                <p className="card-text">age: {hero.age} ans</p>
                                {hero.power.map(power => 
                                <p key={power} className="card-text">les pouvoirs: {power} <FormDeletePower slug = {hero.slug} power = {power} /> </p> )}
                                <FormChangePower />
                            </div>
                        </div>
                    </div>
                </div>
            
        </div>
    );
};

export default OneHeros;