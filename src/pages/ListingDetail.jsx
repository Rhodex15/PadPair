import { useParams } from "react-router";
import { useContext } from "react";
import { AppContext } from "../store/AppContext";
import users from "../data/users.json";
import Container from "../components/Container";
import { isSuspicious } from "../utils/scamDetection";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MapPin, Home, ShieldAlert, ShieldCheck, MessageCircle } from "lucide-react";

function ListingDetails() {
  const { id } = useParams();
  const { listing } = useContext(AppContext);

  const ListingDet = listing.find((l) => l.id === id);
  let locatedLandLord;
  if (ListingDet) {
    locatedLandLord = users.find((u) => u.id === ListingDet.userId);
  }

  const suspicious = ListingDet ? isSuspicious(ListingDet, listing) : false;

  const roomTypeLabel = ListingDet?.roomType
    ?.split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

  if (!ListingDet) {
    return (
      <Container>
        <div className="text-center py-24">
          <p className="text-lg font-medium">Listing not found</p>
          <p className="text-sm text-muted-foreground mt-1">
            This listing may have been removed or the link is incorrect.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-8">
        {/* Image gallery */}
        <div className="grid grid-cols-2 gap-3 mb-8 rounded-xl overflow-hidden">
          <img
            src={ListingDet.images[0]}
            alt={ListingDet.title}
            className="w-full h-96 object-cover"
          />
          <img
            src={ListingDet.images[1]}
            alt={ListingDet.title}
            className="w-full h-96 object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: details */}
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                {ListingDet.title}
              </h1>
              {suspicious ? (
                <Badge variant="destructive" className="gap-1 shrink-0">
                  <ShieldAlert className="h-3 w-3" />
                  Suspicious
                </Badge>
              ) : (
                <Badge variant="secondary" className="gap-1 shrink-0">
                  <ShieldCheck className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground flex items-center gap-1 mb-4">
              <MapPin className="h-4 w-4" />
              {ListingDet.location}
            </p>

            <p className="text-3xl font-bold text-primary mb-6">
              ₦{ListingDet.price.toLocaleString()}
            </p>

            {/* Quick stat */}
            <div className="flex items-center gap-2 mb-6 text-sm">
              <Badge variant="outline" className="gap-1 py-1.5 px-3">
                <Home className="h-3.5 w-3.5" />
                {roomTypeLabel}
              </Badge>
            </div>

            <Separator className="mb-6" />

            <div>
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {ListingDet.description}
              </p>
            </div>
          </div>

          {/* Right: landlord/contact card */}
          <div className="lg:col-span-1">
            <Card className="lg:sticky lg:top-6">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-3">Posted by</p>
                <div className="flex items-center gap-3 mb-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={locatedLandLord?.avatar} alt={locatedLandLord?.name} />
                    <AvatarFallback>{locatedLandLord?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{locatedLandLord?.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {locatedLandLord?.role}
                    </p>
                  </div>
                </div>

                <Button className="w-full gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Message Landlord
                </Button>

                {suspicious && (
                  <p className="text-xs text-destructive mt-3 text-center">
                    This listing was flagged as potentially suspicious. Proceed with caution.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ListingDetails;