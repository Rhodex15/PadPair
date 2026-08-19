import { useState } from "react";
import Badge from "./Badge";

function ListingCard({ image, price, title, location, roomType, isFlagged }) {
  const [isInterested, setIsInterested] = useState(false);

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        {isFlagged && (
          <div className="absolute top-2 left-2">
            <Badge label="Suspicious" variant="suspicious" />
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-lg font-bold text-text">₦{price.toLocaleString()}</p>
        <h3 className="font-semibold text-text mt-1">{title}</h3>
        <p className="text-sm text-muted mt-1">{location} · {roomType}</p>

        <button
          onClick={() => setIsInterested(!isInterested)}
          className={`mt-3 w-full py-2 rounded-lg font-semibold text-sm ${
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