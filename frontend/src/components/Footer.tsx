import { Link } from "react-router-dom";
import { Compass, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground moroccan-pattern">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="h-7 w-7 text-primary" />
            <span className="font-display text-xl font-bold">Safarook</span>
          </div>
          <p className="text-primary-foreground/70 text-sm max-w-sm leading-relaxed">
            AI-powered travel planning for Morocco. Discover the magic of the kingdom with personalized itineraries crafted by artificial intelligence.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Explore</h4>
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
            <Link to="/discover" className="hover:text-primary transition-colors">Destinations</Link>
            <Link to="/planner" className="hover:text-primary transition-colors">AI Planner</Link>
            <Link to="/auth" className="hover:text-primary transition-colors">Sign Up</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Contact</h4>
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
            <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@safarook.com</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Marrakech, Morocco</div>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-12 pt-6 text-center text-xs text-primary-foreground/50">
        © 2026 Safarook. Powered by AI. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
