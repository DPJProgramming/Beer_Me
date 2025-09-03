import fs from 'fs';

const getAllBeers = async () => {
    const files = await fs.readdirSync("./public/img/");
    const beers = files.map(file => {
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