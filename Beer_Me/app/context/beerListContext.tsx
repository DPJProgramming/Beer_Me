import { createContext, useState} from "react";
import { BeerType } from "../types/types";
import { useContext } from "react";

//declare type for context
type BeerListContextType = {
    beers: BeerType[];
    setBeers: (beers: BeerType[]) => void;
    addBeerContext: (beer: BeerType) => void;
    removeBeerContext: (id: number) => void;
    editBeerContext: (beer: BeerType) => void;
};

export const BeerListContext = createContext<BeerListContextType | undefined>(undefined); 

export function useBeerList() {
    const context = useContext(BeerListContext);
    if (!context) {
        throw new Error('useBeerList must be used within BeerListProvider');
    }
    return context;
}

export function BeerListProvider({initialBeers, children}: {initialBeers: BeerType[]} & {children: React.ReactNode}) {
    const [beers, setBeers] = useState<BeerType[]>(initialBeers);
    
    const addBeer = (newBeer: BeerType) => {
        const newBeerList = [newBeer, ...beers];
        setBeers(newBeerList);
    };

    const removeBeer = (id: number) => {
        setBeers((prevBeers) =>
            prevBeers.filter((beer: { id: number }) => beer.id !== id)
        );
    };

    const editBeer = (updatedBeer: BeerType) => {
        setBeers((prevBeers) =>
            prevBeers.map((beer) => {
                if (beer.id === updatedBeer.id) {
                    return { ...beer, ...updatedBeer };
                }
                else{
                    return beer;
                }
            })
        );
    };
    
    return (
        <BeerListContext.Provider value={{beers, setBeers, addBeerContext: addBeer, removeBeerContext: removeBeer, editBeerContext: editBeer}}>
            {children}
        </BeerListContext.Provider>
    );
};
