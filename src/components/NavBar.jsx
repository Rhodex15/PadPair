import { Link } from "react-router";
import Container from "./Container";

export default function NavBar(){
    const currentUser = {
        name: "David Okafor", 
        avatar: "some-url", 
        id: "u001"
    };

    return(
        <Container>
            <div  className="flex items-center justify-between py-4">
                <Link to = "/" className="text-xl font-bold text-primary">PadPair</Link>
                <nav className="hidden md:flex items-center gap-8">
                    <Link to = "/">Listings</Link>
                    <Link to = "/roommates">Roommates</Link>
                    <Link to = "/chat">Chat</Link>
                    <Link to = {`/profile/${currentUser.id}`}>
                        <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full" />
                    </Link>
                </nav>
                <div className="md:hidden flex items-center gap-4">
                    <Link to={`/profile/${currentUser.id}`}>
                        <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full" />
                    </Link>
                    <button className="text-text">☰</button>
                </div>
            </div>
        </Container>
    );
};
