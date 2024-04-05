import express from 'express';
import connectToMongo from './db.js';
import cors from 'cors';

import authRoutes from './routes/auth.js'; 

const app = express();
const port = 5000;
const corsOptions = {
    origin: process.env.origin,
    methods: "GET,POST,PUT,PATCH,DELETE,HEAD",
    credentials: true
};

app.use(cors(corsOptions));
const server = async () => {
    app.use(express.json());

    await connectToMongo();

    app.use('/api/auth', authRoutes);

    app.get("/health", (req, res) => {
        res.send("all good");
    });

    app.listen(port, () => {
        console.log(`app is listening on port ${port}`);
    });
};

server();
