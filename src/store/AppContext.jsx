import { useContext, useState, useEffect } from "react";
import { createContext } from "react";
import listings from "../data/listings.json";
import compatibilityProfiles from "../data/compatibilityProfiles.json";
import messages from "../data/messages.json";

export const AppContext = createContext();

export default function AppProvider({ children }) {

    const [allMessages, setAllMessages] = useState(messages);

    function sendMessage(receiverId, text) {
        const newMessage = {
            id: `m${Date.now()}`,
            senderId: currentUser.id,
            receiverId,
            message: text,
            timestamp: new Date().toISOString(),
        };
        setAllMessages([...allMessages, newMessage]);
    }

    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem("currentUser");
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("currentUser");
        }
    }, [currentUser]);

    const [profiles, setProfiles] = useState(() => {
        const saved = localStorage.getItem("padpair_profiles");
        return saved ? JSON.parse(saved) : compatibilityProfiles;
    });

    useEffect(() => {
        localStorage.setItem("padpair_profiles", JSON.stringify(profiles));
    }, [profiles]);

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
    }

    function addProfile(newProfile) {
        setProfiles((prev) => [...prev, newProfile]);
    }

    function addListing(newListing) {
        setListing([...listing, newListing]);
    }

    function login(user) {
        setCurrentUser(user);
    }

    function logout() {
        setCurrentUser(null);
    }

    return (
        <AppContext.Provider
            value={{
                listing,
                addListing,
                currentUser,
                profiles,
                toggleInterest,
                addProfile,
                login,
                logout,
                sendMessage,
                allMessages,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}