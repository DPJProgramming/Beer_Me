import fs from 'fs';
import Database from 'better-sqlite3';

const db = new Database('./data/beer.db', { verbose: console.log });

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