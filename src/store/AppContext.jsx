import { useContext, useState } from "react";
import { createContext } from "react";
import listings from "../data/listings.json";
import compatibilityProfiles from "../data/compatibilityProfiles.json";

export const AppContext = createContext();

export default function AppProvider({ children }) {

    const [currentUser, setCurrentUser] = useState({
        name: "David Okafor",
        avatar: "https://raw.githubusercontent.com/meituan-longcat/LongCat-Video/main/assets/avatar/single/man.png",
        id: "u001"
    });

    const [profiles, setProfiles] = useState(compatibilityProfiles);
    const [listing, setListing] = useState(listings);

    function toggleInterest(listingId) {
        setProfiles(
            profiles.map((profile) => {
                if (profile.userId !== currentUser.id) return profile;

                const alreadyInterested = profile.interestedListings.includes(listingId);

                const updatedInterests = alreadyInterested
                    ? profile.interestedListings.filter((id) => id !== listingId)
                    : [...profile.interestedListings, listingId];

                return { ...profile, interestedListings: updatedInterests };
            })
        );
    };
    
    function addListing(newListing) {
        setListing([...listing, newListing]);
    }

    return (
        <AppContext.Provider value={{ listing, addListing, currentUser, toggleInterest, profiles }}>
            {children}
        </AppContext.Provider>
    );
}