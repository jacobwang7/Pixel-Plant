const express = require('express');
const mongoose = require('mongoose');
const dayjs = require('dayjs')
const plantController = require('./controllers/plant') 
require('dotenv/config')

mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    {useUnifiedTopology: true, useNewUrlParser: true}
    )
    .then(()=>{
        console.log('Connected to Database')

        const app = express();
        app.use(express.json())

        app.get('/plant/:id', plantController.getPlant);
        app.post('/grow_plant', plantController.growPlant);
        app.patch('/watered_plant/:id', plantController.waterPlant);

        app.listen(8000, () => {
            console.log('listening on port 8000');
        });
    })
    .catch(e=>console.log(e));
