import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

import routes from './routes';

import { mongoUri } from './credentials/mongo.json'

const app = express()

app.use(morgan('dev'))
app.use(express.json())

mongoose.Promise = global.Promise

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Successfully connected to the database')
    })
    .catch(error => {
        console.log('Could not connect to the database. Exiting now...', error)
        return process.exit()
    })

app.use('/', routes);


app.listen(3333, () => {
    console.log(`Backend started on port 3333! `)
})
