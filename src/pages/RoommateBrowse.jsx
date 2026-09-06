import { AppContext } from "../store/AppContext";
import { useContext } from "react";
import Container from "../components/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import users from "../data/users.json";

function getTier(currentUserProfile, otherProfile) {
  const sharesInterest = currentUserProfile.interestedListings.some((listingId) =>
    otherProfile.interestedListings.includes(listingId)
  );
  if (sharesInterest) return 1;

  const sameLocation = currentUserProfile.location === otherProfile.location;
  if (sameLocation) return 2;

  return 3;
}

function getCompatibilityScore(profileA, profileB) {
  const cleanlinessDiff = Math.abs(profileA.cleanlinessLevel - profileB.cleanlinessLevel);
  const sleepDiff = Math.abs(profileA.sleepSchedule - profileB.sleepSchedule);
  const socialDiff = Math.abs(profileA.socialLevel - profileB.socialLevel);
  return cleanlinessDiff + sleepDiff + socialDiff;
}

const tierLabels = {
  1: { label: "Interested in same listing", className: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" },
  2: { label: "Nearby", className: "bg-amber-100 text-amber-800 hover:bg-amber-100" },
  3: { label: "Compatibility match", className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
};

function StatBar({ label, value, max = 5 }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );
}

function RoommateBrowse() {
  const { profiles, currentUser } = useContext(AppContext);

  if (!currentUser) {
    return (
      <Container>
        <div className="text-center py-20">
          <p className="font-medium">Log in to find a roommate</p>
          <p className="text-sm text-muted-foreground mt-1">
            You need an account to see compatible matches.
          </p>
        </div>
      </Container>
    );
  }

  const currentUserProfile = profiles.find((p) => p.userId === currentUser.id);

  if (!currentUserProfile) {
    return (
      <Container>
        <div className="text-center py-20">
          <p className="font-medium">No profile found</p>
          <p className="text-sm text-muted-foreground mt-1">
            Complete your profile to see roommate matches.
          </p>
        </div>
      </Container>
    );
  }

  const otherProfiles = profiles.filter((p) => p.userId !== currentUser.id);

  const sortedProfiles = [...otherProfiles].sort((a, b) => {
    const tierA = getTier(currentUserProfile, a);
    const tierB = getTier(currentUserProfile, b);
    if (tierA !== tierB) return tierA - tierB;

    const scoreA = getCompatibilityScore(currentUserProfile, a);
    const scoreB = getCompatibilityScore(currentUserProfile, b);
    return scoreA - scoreB;
  });

  return (
    <Container>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Find a roommate</h1>
        <p className="text-muted-foreground">
          {sortedProfiles.length} potential roommate{sortedProfiles.length !== 1 ? "s" : ""}, ranked by compatibility
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProfiles.map((profile) => {
          const matchedUser = users.find((u) => u.id === profile.userId);
          if (!matchedUser) return null;

          const tier = getTier(currentUserProfile, profile);
          const tierInfo = tierLabels[tier];

          return (
            <Card key={profile.userId}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={matchedUser.avatar} alt={matchedUser.name} />
                    <AvatarFallback>{matchedUser.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{matchedUser.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {profile.location}
                    </p>
                  </div>
                </div>

                <Badge className={`mb-4 ${tierInfo.className}`}>{tierInfo.label}</Badge>

                <div className="space-y-3">
                  <StatBar label="Cleanliness" value={profile.cleanlinessLevel} />
                  <StatBar label="Sleep schedule" value={profile.sleepSchedule} />
                  <StatBar label="Social level" value={profile.socialLevel} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Container>
  );
}

export default RoommateBrowse;