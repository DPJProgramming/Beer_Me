import express from 'express';``
import beerRouter from "./routers/beerRouter.js";
import cors from 'cors';

const app = express();

app.use(cors({origin: "*"}));
app.use(express.json());
app.use('/', beerRouter);
app.use(express.static('./public/'));
console.log("Middleware and routes have been set up.");

app.use((req, res) => {
    res.status(404).send("Page not found");
})
app.listen("3000", () => console.log("Listening on port 3000"));