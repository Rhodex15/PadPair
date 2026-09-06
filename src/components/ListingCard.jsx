import { useContext } from "react";
import { AppContext } from "../store/AppContext";
import { Link, useNavigate } from "react-router";
import { isSuspicious } from "../utils/scamDetection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Home, ShieldAlert, ShieldCheck } from "lucide-react";

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

  const roomTypeLabel = roomType
    ?.split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="bg-card border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/listing/${id}`}>
        <div className="relative">
          <img src={image} alt={title} className="w-full h-48 object-cover" />

          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground hover:bg-primary">
              {roomTypeLabel}
            </Badge>
          </div>

          {suspicious && (
            <div className="absolute top-3 right-3">
              <Badge variant="destructive" className="gap-1">
                <ShieldAlert className="h-3 w-3" />
                Suspicious
              </Badge>
            </div>
          )}
        </div>

        <div className="px-4 pt-4">
          <p className="text-lg font-bold text-primary">₦{price.toLocaleString()}</p>
          <h3 className="font-semibold mt-1 line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {location}
          </p>
        </div>
      </Link>

      {/* Stats row */}
      <div className="grid grid-cols-2 divide-x border-y mt-4 text-xs text-muted-foreground">
        <div className="flex items-center justify-center gap-1.5 py-2">
          <Home className="h-3.5 w-3.5" />
          {roomTypeLabel}
        </div>
        <div className="flex items-center justify-center gap-1.5 py-2">
          {suspicious ? (
            <>
              <ShieldAlert className="h-3.5 w-3.5" />
              Flagged
            </>
          ) : (
            <>
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified
            </>
          )}
        </div>
      </div>

      <div className="p-4">
        <Button
          onClick={handleInterestClick}
          variant={isInterested ? "default" : "outline"}
          className="w-full"
        >
          {isInterested ? "Interested ✓" : "Interested?"}
        </Button>
      </div>
    </div>
  );
}

export default ListingCard;