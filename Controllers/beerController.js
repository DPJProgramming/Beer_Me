import datalayer from '../Models/datalayer.js';

const allBeers = async (req, res) => {
    const allBeers = datalayer.getAllBeers();
    res.send(allBeers);
}

export default{
    allBeers
}