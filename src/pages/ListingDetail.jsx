import { useParams } from "react-router";
import { useContext } from "react";
import { AppContext } from "../store/AppContext";
import users from "../data/users.json"
import Container from "../components/Container";

function ListingDetails() {
  const { id } = useParams();
  const { listing } = useContext(AppContext);

  const ListingDet = listing.find(l => l.id === id);
  let locatedLandLord;
  if (ListingDet) {
    locatedLandLord = users.find(u => u.id === ListingDet.userId)
  }

  return (
    <Container>
      {ListingDet ? <div>
        <h1>{ListingDet.title}</h1>
        <p>{ListingDet.price}</p>
        <p>{ListingDet.description}</p>
        <p>{ListingDet.location}</p>
        <p>{ListingDet.roomType}</p>
        <img src={ListingDet.images[0]} alt="" />
        <img src={ListingDet.images[1]} alt="" />
        <p>{locatedLandLord.name}</p>
      </div> : <p>Listing not found!</p>}
    </Container>
  );
}
export default ListingDetails;