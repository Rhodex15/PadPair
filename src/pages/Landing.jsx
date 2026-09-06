import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Search, Users, ArrowRight } from "lucide-react";


function Landing() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="mb-8 text-left px-6 py-4  text-primary rounded-lg flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight">PadPair</span>
            </div>
            <section className="px-6 py-24 md:py-32 text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                    Find your next home, or the right roommate, in Nigeria
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                    PadPair connects you to verified listings and compatible roommates
                    across Lagos, Abuja, and Port Harcourt — with built-in scam detection
                    to keep your search safe.
                </p>
                <Button size="lg" onClick={() => navigate("/login")}>
                    Get Started <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
            </section>

            {/* Trust signals */}
            <section className="border-y bg-muted/30">
                <div className="max-w-4xl mx-auto px-6 py-6 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" /> Scam detection built-in
                    </span>
                    <span className="flex items-center gap-2">
                        <Search className="h-4 w-4" /> Verified listings
                    </span>
                    <span className="flex items-center gap-2">
                        <Users className="h-4 w-4" /> Roommate matching
                    </span>
                </div>
            </section>

            {/* How it works */}
            <section className="px-6 py-20 max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-12">How it works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            step: "01",
                            title: "Search",
                            desc: "Browse listings by location, price, and room type across major Nigerian cities.",
                        },
                        {
                            step: "02",
                            title: "Match",
                            desc: "Find roommates compatible with your lifestyle, budget, and preferences.",
                        },
                        {
                            step: "03",
                            title: "Move in",
                            desc: "Connect directly, chat safely, and settle into your new place.",
                        },
                    ].map((item) => (
                        <Card key={item.step}>
                            <CardContent className="pt-6">
                                <span className="text-sm font-mono text-muted-foreground">{item.step}</span>
                                <h3 className="text-lg font-semibold mt-2 mb-1">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="px-6 py-20 text-center bg-muted/30 border-t">
                <h2 className="text-2xl font-bold mb-3">Ready to find your place?</h2>
                <p className="text-muted-foreground mb-6">
                    Join PadPair and start browsing verified listings today.
                </p>
                <Button size="lg" onClick={() => navigate("/login")}>
                    Get Started <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
            </section>
        </div>
    );
}

export default Landing;