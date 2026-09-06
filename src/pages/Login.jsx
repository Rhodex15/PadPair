import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../store/AppContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ShieldCheck, Search, Users } from "lucide-react";

const USERS_KEY = "padpair_users";

function getStoredUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function Login() {
  const { login, addProfile } = useContext(AppContext);
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email === loginEmail && u.password === loginPassword
    );
    if (!found) {
      setLoginError("Invalid email or password.");
      return;
    }
    login(found);
    navigate("/browse");
  }

  function handleSignup(e) {
    e.preventDefault();
    setSignupError("");

    if (!signupName || !signupEmail || !signupPassword) {
      setSignupError("All fields are required.");
      return;
    }

    const users = getStoredUsers();
    if (users.some((u) => u.email === signupEmail)) {
      setSignupError("An account with this email already exists.");
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      name: signupName,
      email: signupEmail,
      password: signupPassword,
      role: "tenant",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(signupName)}`,
    };

    saveUsers([...users, newUser]);

    addProfile({
      userId: newUser.id,
      cleanlinessLevel: 3,
      sleepSchedule: 3,
      socialLevel: 3,
      location: "",
      interestedListings: [],
    });

    login(newUser);
    navigate("/browse");
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left: branding panel */}
      <div className="hidden lg:flex flex-col justify-between bg-primary text-primary-foreground p-12">
        <div>
          <span className="text-xl font-bold tracking-tight">PadPair</span>
        </div>

        <div className="max-w-sm">
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            Find your next home, or the right roommate
          </h1>
          <p className="text-primary-foreground/80">
            Verified listings and compatible roommates across Nigeria — with
            scam detection built in.
          </p>
        </div>

        <div className="space-y-3 text-sm text-primary-foreground/80">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> Scam detection built-in
          </div>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4" /> Verified listings
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Roommate matching
          </div>
        </div>
      </div>

      {/* Right: form panel */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden text-center">
            <span className="text-xl font-bold tracking-tight">PadPair</span>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Log in or create an account to continue
            </p>
          </div>

          <Tabs defaultValue="login">
            <TabsList className="grid grid-cols-2 mb-6 h-9">
              <TabsTrigger value="login" className="text-sm py-1">Log In</TabsTrigger>
              <TabsTrigger value="signup" className="text-sm py-1">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="h-12 text-base"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="h-12 text-base"
                    required
                  />
                </div>
                {loginError && (
                  <p className="text-sm text-destructive">{loginError}</p>
                )}
                <Button type="submit" className="w-full h-12 text-base">
                  Log In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    placeholder="Ada Obi"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className="h-12 text-base"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="h-12 text-base"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="h-12 text-base"
                    required
                  />
                </div>
                {signupError && (
                  <p className="text-sm text-destructive">{signupError}</p>
                )}
                <Button type="submit" className="w-full h-12 text-base">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Login;