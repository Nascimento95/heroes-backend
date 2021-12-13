const express = require("express")
const app = express()
const cors = require('cors')
const heros = require("./routes/heroes")
const morgan = require("morgan")
const port = 5000
// on utilise cors pour donné au front les data de mon back-end
app.use(cors())
// permet de récup mes data de ma route heroes.js
app.use('/', heros)
// permet de récup les donné rentré dans postman ou le front et de le voir avec req.body
app.use(express.json());
// middleware global qui affiche les infos
// des requetes
app.use(morgan('tiny'))

app.listen(port, () => {
    console.log(`serveur started on port : ${port}`);
})