import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

import routes from './routes';

const app = express()

app.use(morgan('dev'))
app.use(express.json())

mongoose.connect(process.env.DB_URI, {
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

const port = process.env.PORT || 3333

app.listen(port, () => {
    console.log(`Backend started on port ${port}! `)
})
