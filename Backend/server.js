const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuid } = require('uuid')
const fs = require('fs')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '60MB' }))

app.use(express.static('public'))

app.post('/saveimage', (req, res) => {
    const uniqueFileName = `${uuid()}.png`
    let response = {
        fileName: uniqueFileName,
        width: req.body.width,
        height: req.body.height,
        saved: true
    }

    fs.writeFile(`./public/${uniqueFileName}`, req.body.imagesrc, 'base64', (err) => {
        if(err){
            response.saved = false
            console.log(err)
        }
    })

    res.json(response)
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})
