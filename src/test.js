import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

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