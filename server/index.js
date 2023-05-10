import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'; 
import dalleRoutes from './routes/dalleRoutes.js'; 


dotenv.config();

const app = express();
app.use(cors()) // lägger till CORS-mellansoftware till express 
app.use(express.json({ limit: '50mb' })); // sätta en begränsning för hur stor den inkommande JSON-filens storlek kan vara

app.use('/api/v1/post', postRoutes); 
app.use('/api/v1/dalle', dalleRoutes); 

app.get('/',  (req, res) => {
    res.send('Hell world!');
})

const startServer = () => {
    try {
        connectDB(process.env.MONGODB_URL); 
        app.listen(8080, () => console.log('Starting server'))
    } catch (err) {
        console.log(err); 
    }
}

startServer();