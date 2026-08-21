import { useContext, useState } from "react";
import { createContext } from "react";
import listings from "../data/listings.json";

export const AppContext = createContext();

export default function AppProvider({children}){

    const [currentUser, setCurrentUser] = useState({
        name: "David Okafor", 
        avatar: "https://raw.githubusercontent.com/meituan-longcat/LongCat-Video/main/assets/avatar/single/man.png", 
        id: "u001"
    })
    const [listing, setListing] = useState(listings);

    function addListing(newListing) {
        setListing([...listing, newListing]);
    }

    return(
        <AppContext.Provider value = {{listing, addListing, currentUser}}>
            {children}
        </AppContext.Provider>
    );
}