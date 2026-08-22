import { AppContext } from "../store/AppContext";
import { useContext } from "react";
import Container from "../components/Container";
import Badge from "../components/Badge";
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
  1: { label: "Interested in same listing", variant: "success" },
  2: { label: "Nearby", variant: "warning" },
  3: { label: "Compatibility match", variant: "suspicious" },
};

function RoommateBrowse() {
  const { profiles, currentUser } = useContext(AppContext);

  const currentUserProfile = profiles.find((p) => p.userId === currentUser.id);
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
      <h1 className="text-3xl font-bold text-text mb-6">Find a roommate</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProfiles.map((profile) => {
          const matchedUser = users.find((u) => u.id === profile.userId);
          const tier = getTier(currentUserProfile, profile);
          const tierInfo = tierLabels[tier];

          return (
            <div
              key={profile.userId}
              className="bg-card border border-border rounded-lg shadow-sm p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={matchedUser.avatar}
                  alt={matchedUser.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-text">{matchedUser.name}</h3>
                  <p className="text-sm text-muted">{profile.location}</p>
                </div>
              </div>

              <Badge label={tierInfo.label} variant={tierInfo.variant} />

              <div className="text-sm text-muted mt-3 space-y-1">
                <p>Cleanliness: {profile.cleanlinessLevel}/5</p>
                <p>Sleep schedule: {profile.sleepSchedule}/5</p>
                <p>Social level: {profile.socialLevel}/5</p>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

export default RoommateBrowse;