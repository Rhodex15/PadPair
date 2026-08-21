import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../store/AppContext";
import Container from "../components/Container";
import { useNavigate } from "react-router";

function CreateListing() {
  const navigate = useNavigate();
  const { currentUser, addListing } = useContext(AppContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    roomType: "",
  });
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const newListing = {
      ...formData,
      id: `l${Date.now()}`,
      userId: currentUser.id,
      images: ["some-placeholder-url"],
      isFlagged: false,
      createdAt: new Date().toISOString(),
    };
    addListing(newListing);
    setFormData({
    title: "",
    description: "",
    price: "",
    location: "",
    roomType: ""
  });
  navigate("/")

  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Listing title"
        />
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Listing description"
        />
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Listing price"
        />
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
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
          name="roomType"
          value={formData.roomType}
          onChange={handleChange}
        >
          <option value="">All Room Types</option>
          <option value="single-room">Single Room</option>
          <option value="1-bedroom">1 Bedroom</option>
          <option value="2-bedroom">2 Bedroom</option>
          <option value="self-contained">Self-Contained</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </Container>
  );
}
export default CreateListing;
