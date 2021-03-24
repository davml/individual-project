import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import businessUserRoutes from './routes/businessUsers.js';
import jobRoutes from './routes/jobs.js';

import path from 'path';

const app = express();


dotenv.config();

app.use(bodyParser.json({limit:"30mb",extended:"true"}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:"true"}));
app.use(cors());

app.use('/user', userRoutes);
app.use('/businessUser', businessUserRoutes);
app.use('/job', jobRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => {
        app.listen(PORT, ()=>{console.log(`Server running on port: ${PORT}`)})
    }).catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);