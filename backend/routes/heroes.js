const express = require("express")
const app = express()
let heros = require('../hereos.json')
app.use(express.json());

// funcion middleware qui permet de savoir si le heros existe deja
const checkSameHeros =(req, res, next) => {
    let sameHeros = heros.find( hero => hero.slug === req.body.slug.toLowerCase())
    if (sameHeros) {
        res.status(404).send("cet heros existe deja")
    } else {
        next();
    }
}
//  middleware qui regarde si le personnage existe si oui je fait next et je fait la logique pour supprimer dans ma route
const checkSameHerosAndDelete =(req, res, next) => {
    const {slug} = req.params
    const sameHeros = heros.find( hero => hero.slug === slug.toLowerCase())

    if (sameHeros) {
        next()
    } else {
        res.status(404).send("ton personnage n'existe pas")
    }
}

// middlewar qui permet de voir si ma requete contient une clef differante de mon fichier json de base et ne l'accepte pas
const validateHero = (req, res, next) => {
    console.log(" le type ",Object.keys(heros[1]),Object.keys(req.body));
    const checkKeys = Object.keys(req.body).find( key => !Object.keys(heros[1]).includes(key) )
    console.log(checkKeys);
    if (checkKeys){
        res.status(404).send("format de la requète pas valide")
    } else {
        next()
    }

}

// route qui permet de voir tous mes heros
app.get("/heroes", (req, res) => {
    res.status(200).json(heros)
})

// route qui permet de sélectionner un heros grace au parametre dynamique
app.get("/heroes/:slug", (req, res) => {
    // avec cette ligne on recupère le parametre dynamique
    const {slug} = req.params
    
    const selectedHeros = heros.find( hero => hero.slug === slug.toLowerCase())
    res.status(200).json(selectedHeros)
})

// route qui permet de regarder les pouvoir du personnage sélèctionner
app.get("/heroes/:slug/powers", (req, res) => {
    const {slug} = req.params
    const selectedPower = heros.find( hero => hero.slug === slug.toLowerCase())
    const power = selectedPower.power.map(power => power)
    // console.log(power);
    res.status(200).json(power)
})

// route qui permet de rajouter un nouvelle hero dans mon fichier heros.json
app.post("/heroes", checkSameHeros,validateHero , (req, res) => {
    // console.log("resulta de la reponse de postman=>", req.body);
    // je stock ma reponse de req.body dans une const
        const newHeros = {
            ...req.body
        }
        // je push le nouveau perso dans mon json
        heros = [...heros, newHeros ]
        res.status(200).send("hero crée").json(heros)
        // console.log(" resulta du post =>",heros);
})

// route qui permet de de remplacer d'ajouter un pouvoir au hero sélèctionner
app.put('/heroes/:slug/powers',validateHero , function (req, res) {
    const {slug} = req.params
    const selectedHero = heros.find( hero => hero.slug === slug.toLowerCase())
    // const power = selectedPower.power.map(power => power)
    
        const newPower = req.body.power
        
        selectedHero.power = [...selectedHero.power , newPower ]
        res.json(selectedHero)
});

// route qui permet de suprimer un hero spécifique
app.delete("/heroes/:slug", checkSameHerosAndDelete, function (req, res) {
    const {slug} = req.params
    // methode findIndex pour trouver l'index de mon personnage et le suprimer grace a l'index
    const index = heros.findIndex( hero => hero.slug === slug )
    heros.splice(index,1)
    res.status(200).json({message:'nom de héros effacé correctement'})
})

// route qui permet de suprimer un pouvoir d'un hero spécifique
app.delete("/heroes/:slug/power/:powers", checkSameHerosAndDelete, function (req, res) {
    const {slug, powers} = req.params
    const index = heros.findIndex( hero => hero.slug === slug )
    // console.log("index =>" ,index);
    //  je cherche l'index de mon pouvoir selectionner avec le parametre dynamique 
    // et power index me retourne l'index ou ce trouve mon pouvoir selectionner 
    const powerIndex = heros[index].power.findIndex(power => power === powers)
   
    // je selection le heros de mon array grace au premier fin index pour trouver mon hero 
    // puis dans c'est power je selection le power a suprimmer grace au 2em findindex qui ma
    // permis de trouver l'index de son pouvoir que jai passer en param dynamique
    heros[index].power.splice(powerIndex,1)
    
    res.status(200).json(heros[index]).send(`le pouvoir ${powers} du hero ${slug} a bien été effacer`)
})

// route qui permet de remplacer un hero existant par un autre
app.put('/heroes/:slug',validateHero, function (req, res) {
    const {slug} = req.params
    let selectedHeros = heros.findIndex(hero => hero.slug === slug.toLowerCase())
    
        heros[selectedHeros] = {...heros[selectedHeros], ...req.body}

        res.json(heros[selectedHeros])
});

module.exports = app