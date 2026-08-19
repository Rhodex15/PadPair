import Container from "../components/Container";
import listings from "../data/listings.json";
import ListingCard from "../components/ListingCard";
import { useState } from "react";

function Home(){

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [maxPrice, setMaxPrice] = useState(2000000);

  const filteredListings = listings.filter((listing) => {
    const listings = listing.title.toLowerCase().includes(searchTerm.toLowerCase())
    const locations = selectedLocation === "" || listing.location === selectedLocation
    return listings && locations
});


  return (
    <Container>
      <h1 className="text-3xl font-bold text-text mb-6">Find your next home</h1>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
        <option value="">Locations</option>
        <option value="Lekki">Lekki</option>
        <option value="Ikeja">Ikeja</option>
        <option value="Yaba">Yaba</option>
        <option value="Port Harcourt">Port Harcourt</option>
        <option value="Rumuola">Rumuola</option>
        <option value="Wuse">Wuse</option>
        <option value="Gwarinpa">Gwarinpa</option>
      </select>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (<ListingCard
        key={listing.id}
        image={listing.images[0]}
        price={listing.price}
        title={listing.title}
        location={listing.location}
        roomType={listing.roomType}
        isFlagged={listing.isFlagged}
        />))}
      </div>
    </Container>
      

);
}
export default Home;