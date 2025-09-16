import fs from 'fs';
import Database from 'better-sqlite3';

const db = new Database('./data/beer.db', { verbose: console.log });

const getAllBeers = async () => {
    const result = db.prepare('SELECT * FROM beers');
    const allBeers = result.all();
    
    return allBeers;
}

const addBeer = async (beer) => {

}

export default {
    getAllBeers,
    addBeer
}