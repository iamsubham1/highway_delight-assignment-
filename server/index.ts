import express from 'express';
const app = express();
const port = 5000;



const server = ()=>{
    app.use(express.json());



    app.get('/api/auth', require('./routes/auth.ts'));

    app.get("/health", (req, res) => {
        res.send("all good");
    })
    
}


app.listen(port, () => {
    console.log(`app is listining on port ${port}`);
})