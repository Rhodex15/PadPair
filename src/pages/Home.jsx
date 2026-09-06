import Container from "../components/Container";
import ListingCard from "../components/ListingCard";
import { useState, useContext } from "react";
import { AppContext } from "../store/AppContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

function Home() {
  const { listing, currentUser } = useContext(AppContext);
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
    <div>
    <div className="relative">
      <div className="h-72 md:h-80 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
          alt="Modern home exterior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        <Container className="relative h-full flex flex-col justify-end pb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Property List
          </h1>
          <p className="text-white/80 text-sm">
            Home / Browse / Property List
          </p>
        </Container>
      </div>

      {/* Overlapping search bar */}
      <Container>
        <div className="bg-card border rounded-xl shadow-lg -mt-8 relative z-10 p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                placeholder="Search Keyword"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-11"
              />
            </div>

            <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
              <SelectTrigger className="h-11 md:w-[160px]">
                <SelectValue placeholder="Room Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single-room">Single Room</SelectItem>
                <SelectItem value="1-bedroom">1 Bedroom</SelectItem>
                <SelectItem value="2-bedroom">2 Bedroom</SelectItem>
                <SelectItem value="self-contained">Self-Contained</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="h-11 md:w-[150px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {["Yaba", "Surulere", "Ikeja", "Lekki", "Gwarinpa", "Wuse", "Rumuola", "Eliozu"].map(
                  (loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min ₦"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-24 h-11"
              />
              <span className="text-muted-foreground text-sm">–</span>
              <Input
                type="number"
                placeholder="Max ₦"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-24 h-11"
              />
            </div>

            <Button className="h-11 px-8">Search</Button>
          </div>
        </div>
      </Container>
    </div>

      {/* Listings section */ }
  <Container>
    <div className="flex items-end justify-between mt-12 mb-8 flex-wrap gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Property Listing</h2>
        <p className="text-muted-foreground max-w-xl">
          {filteredListings.length} listing{filteredListings.length !== 1 ? "s" : ""} matching
          your search across Nigeria's top locations.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
      {filteredListings.map((item) => (
        <ListingCard
          key={item.id}
          id={item.id}
          image={item.images[0]}
          price={item.price}
          title={item.title}
          location={item.location}
          roomType={item.roomType}
          isFlagged={item.isFlagged}
        />
      ))}
    </div>

    {filteredListings.length === 0 && (
      <div className="text-center py-20">
        <p className="font-medium">No listings match your search</p>
        <p className="text-sm text-muted-foreground mt-1">
          Try adjusting your filters or search term.
        </p>
      </div>
    )}
  </Container>
    </div >
  );
}

export default Home;