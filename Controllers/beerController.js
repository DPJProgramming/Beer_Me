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

    //update date to current date
    beer.date = new Date().toISOString().split('T')[0]; 

    //check if new image is provided
    if(req.file){
        beer.image = req.file.filename;
    }

    //send to datalayer
    const result = datalayer.editBeer(beer);

    //handle response
    if(!result){
        res.status(404).send('Update Beer failed');
    } else {
        res.send(result);
    }
}

const deleteBeer = (req, res) => {
    const id = req.params.id;
    const response = datalayer.deleteBeer(id);
    res.send(response);
}

export default{
    allBeers,
    addBeer,
    getBeer,
    editBeer,
    deleteBeer
}