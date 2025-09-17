import fs from 'fs';
import Database from 'better-sqlite3';

const db = new Database('./data/beer.db', { verbose: console.log });

const getAllBeers = async () => {
    const result = db.prepare('SELECT * FROM beers');
    const allBeers = result.all();
    
    return allBeers;
}

const addBeer = async (beer) => {
    const query = `INSERT INTO beers (name, type, brewery, description, location, rating, image, date)
                   VALUES (?,?,?,?,?,?,?,?)`;
    const prepare = db.prepare(query)
    const result = prepare.run(beer.name, beer.type, beer.brewery, beer.description, beer.location, beer.rating, beer.image, beer.date);
    console.log(result);      
}

export default {
    getAllBeers,
    addBeer
}