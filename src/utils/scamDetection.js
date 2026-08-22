export function getAveragePrice(listingsInArea) {
  const total = listingsInArea.reduce((sum, listing) => sum + listing.price, 0);
  return total / listingsInArea.length;
};

export function isSuspicious(listing, allListings) {
  const listingsInArea = allListings.filter((l) => l.location === listing.location);
  const averagePrice = getAveragePrice(listingsInArea);
  return listing.price < averagePrice * 0.5;
}