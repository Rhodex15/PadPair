import { useState, useContext } from "react";
import Badge from "./Badge";
import { AppContext } from "../store/AppContext";
import { Link, useNavigate } from "react-router";
import { isSuspicious } from "../utils/scamDetection";

function ListingCard({ image, price, title, location, roomType, id }) {
  const { toggleInterest, currentUser, profiles, listing } = useContext(AppContext);
  const navigate = useNavigate();

  const currentUserProfile = currentUser
    ? profiles.find((p) => p.userId === currentUser.id)
    : null;
  const isInterested = currentUserProfile
    ? currentUserProfile.interestedListings.includes(id)
    : false;

  const suspicious = isSuspicious({ price, location }, listing);

  function handleInterestClick() {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    toggleInterest(id);
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
      <Link to={`/listing/${id}`}>
        <div className="relative">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
          {suspicious && (
            <div className="absolute top-2 left-2">
              <Badge label="Suspicious" variant="suspicious" />
            </div>
          )}
        </div>

        <div className="px-4 pt-4">
          <p className="text-lg font-bold text-text">₦{price.toLocaleString()}</p>
          <h3 className="font-semibold text-text mt-1">{title}</h3>
          <p className="text-sm text-muted mt-1">{location} · {roomType}</p>
        </div>
      </Link>

      <div className="p-4 pt-3">
        <button
          onClick={handleInterestClick}
          className={`w-full py-2 rounded-lg font-semibold text-sm ${
            isInterested
              ? "bg-primary text-white"
              : "bg-white text-primary border border-primary"
          }`}
        >
          {isInterested ? "Interested ✓" : "Interested?"}
        </button>
      </div>
    </div>
  );
}

export default ListingCard;