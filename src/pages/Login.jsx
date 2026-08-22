import { useContext } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../store/AppContext";
import Container from "../components/Container";
import users from "../data/users.json";

function Login() {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  function handleLogin(user) {
    login(user);
    navigate("/");
  }

  return (
    <Container>
      <h1 className="text-3xl font-bold text-text mb-6">Log in as...</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => handleLogin(user)}
            className="flex items-center gap-3 bg-card border border-border rounded-lg p-4 hover:border-primary text-left"
          >
            <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-semibold text-text">{user.name}</p>
              <p className="text-sm text-muted capitalize">{user.role}</p>
            </div>
          </button>
        ))}
      </div>
    </Container>
  );
}

export default Login;