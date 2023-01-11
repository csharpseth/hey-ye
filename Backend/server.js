const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const sizeOf = require('image-size')
const axios = require('axios')

const app = express()
const port = 3000

const imagePath = './public/kanye'

const images = []

const PopulateData = () => {
    fs.readdir(imagePath, (err, files) => {
        if(err) {
            console.log(err)
            return
        }

        files.forEach(file => {
            sizeOf(`${imagePath}/${file}`, (err, dimensions) => {
                images.push({
                    fileName: `kanye/${file}`,
                    width: dimensions.width,
                    height: dimensions.height
                })
            })
        })
    })
}

const RandomNumber = (min, max) => {
    return Math.floor(Math.random() * max) + min
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '60MB' }))

app.use(express.static('public'))

app.get('/quote', (req, res) => {
    axios.get(`https://api.kanye.rest/`)
    .then(r => {
        res.json(r.data)
    }).catch(e => {
        console.log(`Error: ${e}`)
        res.json({ error: e })
    })
})

app.get('/image', (req, res) => {
    const index = RandomNumber(0, images.length)
    res.json(images[index])
})

app.post('/saveimage', (req, res) => {
    const uniqueFileName = `${uuid()}.png`
    let response = {
        fileName: `uploaded/${uniqueFileName}`,
        width: req.body.width,
        height: req.body.height,
        saved: true
    }

    fs.writeFile(`./public/uploaded/${uniqueFileName}`, req.body.imagesrc, 'base64', (err) => {
        if(err){
            response.saved = false
            console.log(err)
        }
    })

    res.json(response)
})

PopulateData()

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})
