const express = require("express")
const app = express()
const cors = require('cors')
const port = 5000
// on utilise cors pour donné au front les data de mon back-end
app.use(cors())

app.listen(port, () => {
    console.log(`serveur started on port : ${port}`);
})