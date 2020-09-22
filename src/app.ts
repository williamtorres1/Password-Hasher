import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import routes from './routes';

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/hasher', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Succesfully connected to the database')
    })
    .catch(error => {
        console.log('Could not connect to the database. Exiting now...', error)
        return process.exit()
    })

app.use('/', routes);


app.listen(3333, () => {
    console.log(`Backend started on port 3333! `)
})
