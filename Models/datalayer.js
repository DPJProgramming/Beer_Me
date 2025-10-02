import fs from 'fs';
import Database from 'better-sqlite3';

//without logging SQL queries
const db = new Database('./data/beer.db');

//to log all SQL queries when in development mode
//const db = new Database('./data/beer.db', { verbose: console.log });

const getAllBeers = async () => {
    const result = db.prepare('SELECT * FROM beers');
    const allBeers = result.all();
    
    return allBeers;
}

const addBeer = async (beer) => {
    const query = `INSERT INTO beers (
                                        name, 
                                        type, 
                                        brewery, 
                                        description, 
                                        location, 
                                        rating, 
                                        image, 
                                        date
                                    )
                   VALUES (?,?,?,?,?,?,?,?)`;
    const prepare = db.prepare(query)
    const result = prepare.run(
                                beer.name, 
                                beer.type, 
                                beer.brewery, 
                                beer.description, 
                                beer.location, 
                                beer.rating, 
                                beer.image, 
                                beer.date
                            );
    return result;   
}

const getBeerById = (id) => {
    const query = `SELECT * FROM beers WHERE id = ?`;

    const prepare = db.prepare(query);
    const beer = prepare.get(id);

    return beer;
}

const editBeer = (beer) => {
    console.log(beer.id);
    const query = `UPDATE beers 
                   SET 
                    name = ?, 
                    type = ?, 
                    brewery = ?, 
                    description = ?, 
                    location = ?, 
                    rating = ?, 
                    image = ?, 
                    date = ?

                   WHERE id = ?`;

    //console.log(beer.name, beer.type, beer.brewery, beer.description, beer.location, beer.rating, beer.image, beer.date, beer.id);


    const prepare = db.prepare(query);
    const result = prepare.run(
                                beer.name, 
                                beer.type, 
                                beer.brewery, 
                                beer.description, 
                                beer.location, 
                                beer.rating, 
                                beer.image, 
                                beer.date, 
                                beer.id);

    return result;
}

export default {
    getAllBeers,
    addBeer,
    getBeerById,
    editBeer
}