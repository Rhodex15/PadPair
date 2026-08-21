import Container from "../components/Container";
import ListingCard from "../components/ListingCard";
import { useState, useContext } from "react";
import { AppContext } from "../store/AppContext";



function Home() {
  const { listing, addListing, currentUser } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredListings = listing.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === "" || s.location === selectedLocation;
    const matchesRoomType = selectedRoomType === "" || s.roomType === selectedRoomType;
    const matchesPrice =
      (minPrice === "" || s.price >= parseFloat(minPrice)) &&
      (maxPrice === "" || s.price <= parseFloat(maxPrice));

    return matchesSearch && matchesLocation && matchesRoomType && matchesPrice;
  });

  return (
    <Container>
      <h1 className="text-3xl font-bold text-text mb-6">Find your next home</h1>

      <input
        type="text"
        value={searchTerm}
        placeholder="Search listings..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-border rounded-lg mb-4"
      />

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg"
        >
          <option value="">All Locations</option>
          <option value="Yaba">Yaba</option>
          <option value="Surulere">Surulere</option>
          <option value="Ikeja">Ikeja</option>
          <option value="Lekki">Lekki</option>
          <option value="Gwarinpa">Gwarinpa</option>
          <option value="Wuse">Wuse</option>
          <option value="Rumuola">Rumuola</option>
          <option value="Eliozu">Eliozu</option>
        </select>

        <select
          value={selectedRoomType}
          onChange={(e) => setSelectedRoomType(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg"
        >
          <option value="">All Room Types</option>
          <option value="single-room">Single Room</option>
          <option value="1-bedroom">1 Bedroom</option>
          <option value="2-bedroom">2 Bedroom</option>
          <option value="self-contained">Self-Contained</option>
        </select>

        <div className="flex items-center gap-2">
          <label htmlFor="min-price" className="text-sm text-muted">Min ₦</label>
          <input
            type="number"
            id="min-price"
            value={minPrice}
            placeholder="0"
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-28 px-3 py-2 border border-border rounded-lg"
          />
          <span className="text-muted">to</span>
          <label htmlFor="max-price" className="text-sm text-muted">Max ₦</label>
          <input
            type="number"
            id="max-price"
            value={maxPrice}
            placeholder="Any"
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-28 px-3 py-2 border border-border rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <ListingCard
            key={listing.id}
            id={listing.id}
            image={listing.images[0]}
            price={listing.price}
            title={listing.title}
            location={listing.location}
            roomType={listing.roomType}
            isFlagged={listing.isFlagged}
          />
        ))}
      </div>
      {filteredListings.length === 0 && (
        <p className="text-center text-muted py-12">
          No listings match your search. Try adjusting your filters.
        </p>
      )}
    </Container>
  );
}

export default Home;