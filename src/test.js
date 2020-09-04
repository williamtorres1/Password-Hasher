const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const port = process.env.PORT || 3333

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/hasher', {
    useNewUrlParser: true
})
    .then(() => {
        console.log('Succesfully connected to the database')
    })
    .catch(error => {
        console.log('Could not connect to the database. Exiting now...', error)
        return process.exit()
    })

app.listen(port, () => {
    console.log(`Your app is running on port: ${port}`)
})