import Home from "./pages/Home";
import ListingDetails from "./pages/ListingDetail";
import CreateListing from "./pages/CreateListing";
import RoommateBrowse from "./pages/RoommateBrowse";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import { Route, Routes } from "react-router";
import Container from "./components/Container";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/listing/:id" element = {<ListingDetails/>}/>
        <Route path="/create-listing" element = {<CreateListing/>}/>
        <Route path="/roommates" element = {<RoommateBrowse/>}/>
        <Route path="/profile/:id" element = {<Profile/>}/>
        <Route path="/chat" element = {<Chat/>}/>
      </Routes>
    </>
  )
}

export default App
