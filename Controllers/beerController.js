import datalayer from '../models/datalayer.js';

const allBeers = async (req, res) => {
    const allBeers = await datalayer.getAllBeers();
    res.status(200).send(allBeers);
}

const addBeer = async (req, res) => {
    const beer = req.body();
    const result = datalayer.addBeer(beer);

    //TO DO:
    //validation

    res.send(result);
}

export default{
    allBeers,
    addBeer
}