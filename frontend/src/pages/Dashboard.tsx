import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  MapPin, Route, Sparkles, LogOut, Plus, Trash2,
  Compass, TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

interface SavedTrip {
  id: string;
  title: string;
  duration: number;
  budget: number;
  created_at: string;
  trip_data: any;
}

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [trips, setTrips] = useState<SavedTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) navigate("/auth");
      else setUser(session.user);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/auth");
      else {
        setUser(session.user);
        loadTrips();
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadTrips = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("saved_trips").select("*").order("created_at", { ascending: false });
    if (error) {
      console.error(error);
    } else {
      setTrips(data || []);
    }
    setLoading(false);
  };

  const deleteTrip = async (id: string) => {
    const { error } = await supabase.from("saved_trips").delete().eq("id", id);
    if (error) toast.error("Failed to delete trip");
    else {
      toast.success("Trip deleted");
      setTrips((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Traveler";

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-display font-bold">Welcome, {displayName}!</h1>
              <p className="text-muted-foreground text-sm">Your travel command center</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2">
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Route, label: "Trips Planned", value: trips.length },
              { icon: MapPin, label: "Destinations", value: new Set(trips.flatMap(t => {
                const days = t.trip_data?.days || [];
                return days.map((d: any) => d.city);
              })).size },
              { icon: TrendingUp, label: "Days Planned", value: trips.reduce((s, t) => s + (t.duration || 0), 0) },
              { icon: Sparkles, label: "AI Generated", value: trips.length },
            ].map((s) => (
              <Card key={s.label} className="glass-card">
                <CardContent className="p-4 text-center">
                  <s.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-display font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <div className="flex gap-3 mb-8">
            <Button className="rounded-full gap-2" asChild>
              <Link to="/planner"><Plus className="h-4 w-4" /> New Trip</Link>
            </Button>
            <Button variant="outline" className="rounded-full gap-2" asChild>
              <Link to="/discover"><Compass className="h-4 w-4" /> Discover</Link>
            </Button>
          </div>

          {/* Saved Trips */}
          <h2 className="text-xl font-display font-bold mb-4">Saved Trips</h2>
          {loading ? (
            <div className="text-center py-10 text-muted-foreground">Loading trips...</div>
          ) : trips.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="p-10 text-center">
                <Route className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">No saved trips yet. Generate your first AI trip!</p>
                <Button className="mt-4 rounded-full" asChild>
                  <Link to="/planner">Generate Trip</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {trips.map((trip, i) => (
                <motion.div key={trip.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="glass-card">
                    <CardContent className="p-5 flex items-center justify-between">
                      <div>
                        <h3 className="font-display font-semibold">{trip.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {trip.duration} days · ${trip.budget} budget · {new Date(trip.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => deleteTrip(trip.id)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
