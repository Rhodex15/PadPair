import { useState, useContext } from "react";
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
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    const newListing = {
      ...formData,
      price: Number(formData.price),
      id: `l${Date.now()}`,
      userId: currentUser.id,
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"],
      isFlagged: false,
      createdAt: new Date().toISOString(),
    };
    addListing(newListing);
    setFormData({ title: "", description: "", price: "", location: "", roomType: "" });
    navigate("/browse");
  }

  const inputClass = "w-full px-4 py-2 border border-border rounded-lg";
  const labelClass = "block text-sm font-semibold text-text mb-1";

  return (
    <Container>
      <h1 className="text-3xl font-bold text-text mb-6">List your property</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className={labelClass}>Title</label>
          <input name="title" value={formData.title} onChange={handleChange} required className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Price (₦)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Location</label>
          <select name="location" value={formData.location} onChange={handleChange} required className={inputClass}>
            <option value="">Select a location</option>
            <option value="Yaba">Yaba</option>
            <option value="Surulere">Surulere</option>
            <option value="Ikeja">Ikeja</option>
            <option value="Lekki">Lekki</option>
            <option value="Gwarinpa">Gwarinpa</option>
            <option value="Wuse">Wuse</option>
            <option value="Rumuola">Rumuola</option>
            <option value="Eliozu">Eliozu</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Room Type</label>
          <select name="roomType" value={formData.roomType} onChange={handleChange} required className={inputClass}>
            <option value="">Select a room type</option>
            <option value="single-room">Single Room</option>
            <option value="1-bedroom">1 Bedroom</option>
            <option value="2-bedroom">2 Bedroom</option>
            <option value="self-contained">Self-Contained</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold">
          Publish Listing
        </button>
      </form>
    </Container>
  );
}
export default CreateListing;