const express = require('express')
const axios = require('axios')

const app = express()

const port = 3000

app.get('/quote/kanye', (req, res) => {
    axios.get(`https://api.kanye.rest/`)
    .then(r => {
        res.json(r.data)
    }).catch(e => {
        console.log(`Error: ${e}`);
    })
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})
