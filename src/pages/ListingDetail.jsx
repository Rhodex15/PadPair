import { useParams } from "react-router";
import { useContext } from "react";
import { AppContext } from "../store/AppContext";
import users from "../data/users.json";
import Container from "../components/Container";
import Badge from "../components/Badge";
import { isSuspicious } from "../utils/scamDetection";

function ListingDetails() {
  const { id } = useParams();
  const { listing } = useContext(AppContext);

  const ListingDet = listing.find((l) => l.id === id);
  let locatedLandLord;
  if (ListingDet) {
    locatedLandLord = users.find((u) => u.id === ListingDet.userId);
  }

  const suspicious = ListingDet ? isSuspicious(ListingDet, listing) : false;

  return (
    <Container>
      {ListingDet ? (
        <div>
          {suspicious && (
            <div className="mb-3">
              <Badge label="Suspicious" variant="suspicious" />
            </div>
          )}
          <div className="flex gap-4 mb-4">
            <img src={ListingDet.images[0]} alt="" className="w-1/2 rounded-lg object-cover" />
            <img src={ListingDet.images[1]} alt="" className="w-1/2 rounded-lg object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-text">{ListingDet.title}</h1>
          <p className="text-xl font-bold text-primary mt-1">₦{ListingDet.price.toLocaleString()}</p>
          <p className="text-text mt-3">{ListingDet.description}</p>
          <p className="text-muted mt-2">{ListingDet.location} · {ListingDet.roomType}</p>
          <p className="text-sm text-muted mt-4">Posted by {locatedLandLord.name}</p>
        </div>
      ) : (
        <p>Listing not found!</p>
      )}
    </Container>
  );
}
export default ListingDetails;