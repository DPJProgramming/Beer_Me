import express from 'express';``
import beerRouter from "./Routers/beerRouter.js";

const app = express();

app.use("/", beerRouter);

app.use((req, res) => {
    res.status(404).send("Page not found");
})
app.listen("3000", () => console.log("Listening on port 3000"));