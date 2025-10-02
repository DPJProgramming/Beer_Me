import datalayer from '../Models/datalayer.js';
import multer from "multer";


const allBeers = async (req, res) => {
    const allBeers = await datalayer.getAllBeers();
    res.status(200).send(allBeers);
}

const addBeer = async (req, res) => {
    const beer = req.body;
    beer.image = req.file ? req.file.filename : "placeholder.png";

    const result = await datalayer.addBeer(beer);
    
    //TO DO:
    //validation

    res.send(result);
}

const getBeer = (req, res) => {
    const beerId = req.params.id;
    const result = datalayer.getBeerById(beerId);

    res.send(result);
}

const editBeer = (req, res) => {
    const beer = req.body;
    beer.image = req.file ? req.file.filename : "placeholder.png";

    const result = datalayer.editBeer(beer);

    res.send(result);
}

export default{
    allBeers,
    addBeer,
    getBeer,
    editBeer
}