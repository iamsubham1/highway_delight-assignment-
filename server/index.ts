import express from 'express';
import connectToMongo from './db.js';
import authRoutes from './routes/auth.js'; // Assuming your authentication routes are defined in 'auth.js'

const app = express();
const port = 5000;

const server = async () => {
    app.use(express.json());

    await connectToMongo();

    // Assuming your authentication routes are defined in 'auth.js'
    app.use('/api/auth', authRoutes);

    app.get("/health", (req, res) => {
        res.send("all good");
    });

    app.listen(port, () => {
        console.log(`app is listening on port ${port}`);
    });
};

server();
