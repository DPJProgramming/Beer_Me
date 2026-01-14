import fs from 'fs';
import Database from 'better-sqlite3';

//without logging SQL queries
const db = new Database('./data/beer.db');

//to log all SQL queries when in development mode
//const db = new Database('./data/beer.db', { verbose: console.log });

const getAllBeers = async () => {
    const result = db.prepare('SELECT * FROM beers ORDER BY date DESC');
    const allBeers = result.all();
    
    return allBeers;
}

const getTopBeers = async () => {
    const result = db.prepare('SELECT * FROM beers ORDER BY rating DESC LIMIT 10');
    const topBeers = result.all();

    return topBeers;
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
    let result;

    //check if user has defined a new image
    if(beer.image){
        const existingImage = getImageById(beer.id);

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

        const prepare = db.prepare(query);
        result = prepare.run(
                                    beer.name, 
                                    beer.type, 
                                    beer.brewery, 
                                    beer.description, 
                                    beer.location, 
                                    beer.rating, 
                                    beer.image, 
                                    beer.date, 
                                    beer.id
                                );
        
        const image = beer.image || existingImage;

        //delete old image file if it's not the placeholder
        if(image != 'placeholder.png' && image != beer.image){
            fs.promises.unlink(`./public/img/${image}`);
        }

        return {...result, image};
    }
    else{
        const query = 
                    `UPDATE 
                        beers 
                    SET 
                        name = ?, 
                        type = ?, 
                        brewery = ?, 
                        description = ?, 
                        location = ?, 
                        rating = ?,  
                        date = ?

                    WHERE id = ?`;

        const prepare = db.prepare(query);
        result = prepare.run(
                                    beer.name, 
                                    beer.type, 
                                    beer.brewery, 
                                    beer.description, 
                                    beer.location, 
                                    beer.rating, 
                                    beer.date, 
                                    beer.id
                                );
        return result;
    }
}

const deleteBeer = async (id) => {
    //handle deletion of image file
    const image = getImageById(id);

    if(image != 'placeholder.png'){ 
        await fs.promises.unlink(`./public/img/${image}`);
    }

    //delete beer from database
    const query = `DELETE FROM beers WHERE id = ?`;

    const prepare = db.prepare(query);
    const runDelete = prepare.run(id);

    return runDelete;
}

const getImageById = (id) => {
    const query = `SELECT image FROM beers WHERE id = ?`
    const prepare = db.prepare(query);
    const image = prepare.get(id);

    return image ? image.image : null;
}

export default {
    getAllBeers,
    addBeer,
    getBeerById,
    editBeer,
    deleteBeer,
    getTopBeers
}