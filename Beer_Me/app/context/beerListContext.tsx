import { createContext, useState} from "react";
import { BeerType } from "../types/types";
import { useContext } from "react";

//declare type for context
type BeerListContextType = {
    beers: BeerType[];
    setBeers: (beers: BeerType[]) => void;
    setOriginalBeers: (beers: BeerType[]) => void;
    addBeerContext: (beer: BeerType, onClose: () => void) => Promise<void>;
    deleteBeerContext: (id: number) => Promise<{ok: boolean; message: string}>;
    editBeerContext: (beer: BeerType, onClose: () => void) => Promise<void>;
    sortBeerContext: (sortBy: string) => void;
    searchBeerContext: (searchFor: string) => void;
};

export const BeerListContext = createContext<BeerListContextType | undefined>(undefined); 

export function useBeerList() {
    const context = useContext(BeerListContext);
    if (!context) {
        throw new Error('useBeerList must be used within BeerListProvider');
    }
    return context;
}

export function BeerListProvider({children}:  {children: React.ReactNode}) {
    let [beers, setBeers] = useState<BeerType[]>([]);
    const[originalBeers, setOriginalBeers] = useState<BeerType[]>([]);
    
    const addBeer = async (newBeer: BeerType, onClose: () => void) => {
        const newBeerAdded = await addBeertoDb(newBeer);

        if (!newBeerAdded) {
            console.error("Failed to add beer to database from beerListContext");
            return;
        }
        else{
            newBeer.id = newBeerAdded.id;
            newBeer.image = newBeerAdded.image;
            const newBeerList = [newBeer, ...beers];
            setBeers(newBeerList);
            setOriginalBeers(newBeerList);
            onClose();
        }
    };

    const deleteBeer = async (id: number) => {
        //delete from db
        if(!id || id <= 0 || isNaN(id)){
            console.log("invalid id in beerListContext");
            return { ok: false, message: "Invalid beer ID" };        
        }
        else{
            const beerDeleted = await sendRequest('delete', `deleteBeer/${id}`, 'delete');

            if(!beerDeleted.ok){
                console.log("Failed to delete beer from database from beerListContext: " + beerDeleted.message);
                return { ok: false, message: beerDeleted.message };
            }

            const newBeers = beers.filter((beer) => beer.id !== id);
            setBeers(newBeers);
            setOriginalBeers(newBeers);
            return { ok: true, message: "Beer deleted successfully" };
        }
    };

    const editBeer = async (updatedBeer: BeerType, onClose: () => void) => {
        //update in database
        const beerModified = await updateInDb(updatedBeer);

        //update on frontend
        if (!beerModified) {
            console.error("Failed to update beer in database from beerListContext");
            return;
        }
        else{
            const newBeerList = beers.map((beer) => {
                    if (beer.id === updatedBeer.id) {
                        updatedBeer.image = beerModified.image ?? beer.image;
                        updatedBeer.updatedDate = beerModified.updatedDate ?? beer.updatedDate;
                        return { ...beer, ...updatedBeer };
                    }
                    else{
                        return beer;
                    }
            });
            setBeers(newBeerList);
            setOriginalBeers(newBeerList);
            onClose();
        }
    };

    const sortBeer = (sortBy: string) => {
       switch(sortBy){
            case "name":
                beers = beers.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "rating": //default sort for home page
                beers = beers.sort((a, b) => b.rating - a.rating);
                break;
            case "date asc":// default sort for myBeers page
                beers = beers.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                break;
            case "date desc":
                beers = beers.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                break;
            case "type":
                beers = beers.sort((a, b) => (a.type ?? "").localeCompare(b.type ?? ""));
                break;
            case "brewery":
                beers = beers.sort((a, b) => (a.brewery ?? "").localeCompare(b.brewery ?? ""));
                break;
            default:
                beers = beers;
        }

        setBeers([...beers]);
    }

    const searchBeers = (searchFor: string) => {
        const searchTerm = searchFor.toLowerCase().trim();

        if(searchTerm === ""){
            setBeers(originalBeers);
            return;
        }
    
        const filteredBeers = originalBeers.filter((beer) => 
                            beer.name.toLowerCase().startsWith(searchTerm)
                         || beer.type?.toLowerCase().startsWith(searchTerm)
                         || beer.subType?.toLowerCase().startsWith(searchTerm)
                         || beer.brewery?.toLowerCase().startsWith(searchTerm));

        setBeers(filteredBeers);
    }
    
    return (
        <BeerListContext.Provider value={{
                                            beers, 
                                            setBeers, 
                                            setOriginalBeers,
                                            addBeerContext: addBeer, 
                                            deleteBeerContext: deleteBeer, 
                                            editBeerContext: editBeer, 
                                            sortBeerContext: sortBeer,
                                            searchBeerContext: searchBeers
                                        }}>
                                        {children}
        </BeerListContext.Provider>
    );
};

async function addBeertoDb(beer: BeerType) {
    const formData = compileBeerData(beer);

    //send to backend
    return await sendRequest('post', 'addBeer', 'add', formData);
};

async function updateInDb(beer: BeerType) {
    const formData = compileBeerData(beer);
    formData.append('id', beer.id.toString());

    return await sendRequest('post', 'editBeer', 'update', formData);
}

function compileBeerData(beer: BeerType) {
    //append data from addBeer form
    const formData = new FormData();
    formData.append('name', beer.name);
    formData.append('type', beer.type ?? '');
    formData.append('subType', beer.subType ?? '');
    formData.append('rating', beer.rating.toString());
    formData.append('brewery', beer.brewery ?? '');
    formData.append('description', beer.description ?? '');
    formData.append('location', beer.location ?? '');

    //handle image upload only when a new local image is selected
    const isLocalImage = beer.image && (beer.image.startsWith('file:') || beer.image.startsWith('content:'));
    if (isLocalImage) {
        const filename = beer.image?.split('/').pop() ?? 'upload.jpeg';
        const ext = filename.includes('.') ? filename.substring(filename.lastIndexOf('.') + 1).toLowerCase() : 'jpeg';
        const mimeType = ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;

        formData.append('image', {
            uri: beer.image,
            type: mimeType,
            name: filename,
        } as any);
    }

    return formData;
}

// function onSuccess(response: Response, message: string) {
//     if (response && response.ok) {
//         alert(`${message} beer successfull`);
//         return true;
//     }
//     else{
//         alert(`Failed to ${message} beer`);
//         return false;
//     }
// }

async function sendRequest(requestMethod: string, endpoint: string, message: string, data?: FormData) {
    const host = process.env.EXPO_PUBLIC_IP ?? 'no IP found';

    const config : RequestInit= {
        method: requestMethod,
    }

    if(data){
        config.body = data;
    }

    try{
        const response = await fetch(`${host}/${endpoint}`, config);
        if(response && response.ok && response.status === 200){
            return await response.json();
        }
        else{
            const errorMessage = await JSON.parse(await response.text());
            return { ok: false, message: errorMessage.message || `Failed to ${message} beer` };
        }
    }
    catch(error){
        console.log("caught on try catch in send request");
        console.log(error);
        return { ok: false, message: `Failed to ${message} beer` };
    }
}
export default BeerListProvider;