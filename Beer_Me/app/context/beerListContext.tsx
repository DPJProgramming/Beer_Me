import { createContext, useState} from "react";
import { BeerType } from "../types/types";
import { useContext } from "react";

//declare type for context
type BeerListContextType = {
    beers: BeerType[];
    setBeers: (beers: BeerType[]) => void;
    setOriginalBeers: (beers: BeerType[]) => void;
    addBeerContext: (beer: BeerType, onClose: () => void) => Promise<void>;
    removeBeerContext: (id: number) => Promise<void>;
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

    const removeBeer = async (id: number) => {
        //delete from db
        const beerDeleted = await deleteInDb(id);
        if (!beerDeleted) {
            console.error("Failed to delete beer from database from beerListContext");
            return;
        }

        const newBeers = beers.filter((beer) => beer.id !== id);
        setBeers(newBeers);
        setOriginalBeers(newBeers);
    };

    const editBeer = async (updatedBeer: BeerType, onClose: () => void) => {
        const beerModified = await updateInDb(updatedBeer);

        if (!beerModified) {
            console.error("Failed to update beer in database from beerListContext");
            return;
        }
        else{
            const newBeerList = beers.map((beer) => {
                    if (beer.id === updatedBeer.id) {
                        updatedBeer.image = beerModified.image ?? beer.image;
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
    
        const filteredBeers = originalBeers.filter((beer) => 
                            beer.name.toLowerCase().startsWith(searchTerm)
                         || beer.type?.toLowerCase().startsWith(searchTerm)
                         || beer.brewery?.toLowerCase().startsWith(searchTerm))
                         ?? ["No Results"] as unknown as BeerType[];

        setBeers(filteredBeers);
    }
    
    return (
        <BeerListContext.Provider value={{
                                            beers, 
                                            setBeers, 
                                            setOriginalBeers,
                                            addBeerContext: addBeer, 
                                            removeBeerContext: removeBeer, 
                                            editBeerContext: editBeer, 
                                            sortBeerContext: sortBeer,
                                            searchBeerContext: searchBeers
                                        }}>
                                        {children}
        </BeerListContext.Provider>
    );
};

async function addBeertoDb(beer: BeerType) {
    const host = process.env.EXPO_PUBLIC_IP ?? 'no IP found';
    const formData = compileBeerData(beer);

    //send to backend
    return await sendRequest('post', 'addBeer', 'add', formData);
};

async function updateInDb(beer: BeerType) {
    const host = process.env.EXPO_PUBLIC_IP ?? 'no IP found';
    const formData = compileBeerData(beer);
    formData.append('id', beer.id.toString());

    return await sendRequest('post', 'editBeer', 'update', formData);
}

async function deleteInDb(id: number) {
    return sendRequest('post', `deleteBeer/${id}`, 'delete');
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
    formData.append('date', new Date().toISOString().split('T')[0]);

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

function onSuccess(response: Response, message: string) {
    if (response && response.ok) {
        alert(`${message} beer successfull`);
        return true;
    }
    else{
        alert(`Failed to ${message} beer`);
        return false;
    }
}

async function sendRequest(requestMethod: string, endpoint: string, message: string, data?: FormData) {
    const host = process.env.EXPO_PUBLIC_IP ?? 'no IP found';

    const config : RequestInit= {
        method: requestMethod,
    }

    if(data){
        config.body = data;
    }

    const response = await fetch(`${host}/${endpoint}`, config);
    console.log('Response:', response);
    const isSuccessful = onSuccess(response, message);

    if(isSuccessful){
        const responseData = await response.json();
        console.log('Response Data:', responseData);
        return responseData;
    }
    else{
        return;
    }
}
export default BeerListProvider;