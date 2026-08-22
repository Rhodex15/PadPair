import { AppContext } from "../store/AppContext";
import { useContext } from "react";
import Container from "../components/Container";
import users from "../data/users.json";

function RoommateBrowse() {

  const { profiles, currentUser } = useContext(AppContext);

  const otherProfiles = profiles.filter((p) => p.userId !== currentUser.id);

  function getTier(currentUserProfile, otherProfile) {
    const sharesInterest = currentUserProfile.interestedListings.some((listingId) =>
      otherProfile.interestedListings.includes(listingId)); 

    if (sharesInterest) return 1;
    
    const sameLocation = currentUserProfile.location === otherProfile.location; 
    if (sameLocation) return 2;
    
    return 3;
}


  
  return (
    <Container>
      {otherProfiles.map((profile) =>{
        const matchUser = users.find((u) => u.id === profile.userId);
        return (
        <div key={profile.userId}>
          <h1>{matchUser.name}</h1>
          <p>{profile.location}</p>
        </div>)
      })}
    </Container>
  );
}
export default RoommateBrowse;