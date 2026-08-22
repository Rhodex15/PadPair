import { Link } from "react-router";
import Container from "./Container";
import { AppContext } from "../store/AppContext";
import { useContext } from "react";

export default function NavBar() {
  const { currentUser, logout } = useContext(AppContext);

  return (
    <Container>
      <div className="flex items-center justify-between py-4">
        <Link to="/" className="text-xl font-bold text-primary">PadPair</Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/">Listings</Link>
          <Link to="/roommates">Roommates</Link>
          <Link to="/chat">Chat</Link>
          {currentUser ? (
            <>
              <Link to={`/profile/${currentUser.id}`}>
                <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full" />
              </Link>
              <button onClick={logout} className="text-sm text-muted">Log out</button>
            </>
          ) : (
            <Link to="/login" className="text-primary font-semibold">Log in</Link>
          )}
        </nav>

        <div className="md:hidden flex items-center gap-4">
          {currentUser ? (
            <Link to={`/profile/${currentUser.id}`}>
              <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full" />
            </Link>
          ) : (
            <Link to="/login" className="text-primary font-semibold text-sm">Log in</Link>
          )}
          <button className="text-text">☰</button>
        </div>
      </div>
    </Container>
  );
}