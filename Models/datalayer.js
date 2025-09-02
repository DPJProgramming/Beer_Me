import fs from 'fs';

const getAllBeers = () => {
    const beers = fs.readdirSync("./public/img/").map(file => {
        return {
            name: file,
            image: `../public/img/${file}`
        };
    });
    return beers;
}

export default {
    getAllBeers
}