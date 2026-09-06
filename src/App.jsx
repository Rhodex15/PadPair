import Home from "./pages/Home";
import ListingDetails from "./pages/ListingDetail";
import CreateListing from "./pages/CreateListing";
import RoommateBrowse from "./pages/RoommateBrowse";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import { Route, Routes } from "react-router";

import Login from "./pages/Login";
import Landing from "./pages/Landing";
import MainLayout from "./pages/MainLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/browse" element = {<Home/>}/>
          <Route path="/listing/:id" element = {<ListingDetails/>}/>
          <Route path="/create-listing" element = {<CreateListing/>}/>
          <Route path="/roommates" element = {<RoommateBrowse/>}/>
          <Route path="/profile/:id" element = {<Profile/>}/>
          <Route path="/chat" element = {<Chat/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App;
