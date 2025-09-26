import datalayer from '../Models/datalayer.js';
import multer from "multer";


const allBeers = async (req, res) => {
    const allBeers = await datalayer.getAllBeers();
    res.status(200).send(allBeers);
}

const addBeer = async (req, res) => {

    console.log("reaeched controller");

    const beer = req.body;
    beer.image = req.file ? req.file.filename : "placeholder.png";

    console.log("Request body:", beer);
    console.log("Uploaded file:", req.file);

    const response = await datalayer.addBeer(beer);

    // console.log("Form data:", req.body);
    // console.log("File info:", req.file);

    // const beer = req.body;
    
    // const newBeer = {
    //     name: beer.name,
    //     type: beer.type,
    //     brewery: beer.brewery,
    //     description: beer.description,
    //     location: beer.location,
    //     rating: beer.rating,
    //     image: req.file ? req.file.filename : "placeholder.png",
    //     date: new Date().toISOString().slice(0, 10)
    // };
    
    // const result = datalayer.addBeer(newBeer);

    //TO DO:
    //validation

    res.send(response);
}

export default{
    allBeers,
    addBeer,
}