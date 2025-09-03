import datalayer from '../models/datalayer.js';

const allBeers = async (req, res) => {
    const allBeers = await datalayer.getAllBeers();
    res.status(200).send(allBeers);
}

export default{
    allBeers
}