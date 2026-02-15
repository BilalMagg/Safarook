import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Car, Footprints, Bus, Train, Plane,
  Trees, Landmark, Gem, Mountain, UtensilsCrossed,
  Sparkles, RefreshCw, MapPin, Clock, DollarSign, ArrowRight,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const transportOptions = [
  { value: "car", icon: Car, label: "Car" },
  { value: "walking", icon: Footprints, label: "Walk" },
  { value: "bus", icon: Bus, label: "Bus" },
  { value: "train", icon: Train, label: "Train" },
  { value: "plane", icon: Plane, label: "Plane" },
];

const styleOptions = [
  { value: "nature", icon: Trees, label: "Nature" },
  { value: "culture", icon: Landmark, label: "Culture" },
  { value: "luxury", icon: Gem, label: "Luxury" },
  { value: "adventure", icon: Mountain, label: "Adventure" },
  { value: "food", icon: UtensilsCrossed, label: "Food" },
];

const statusMessages = [
  "Analyzing your preferences...",
  "Scanning Morocco's best routes...",
  "Optimizing your budget...",
  "Estimating travel times...",
  "Crafting your perfect itinerary...",
];

interface TripDay {
  day: number;
  city: string;
  activities: string[];
  cost: string;
  travelTime?: string;
}

interface TripResult {
  title: string;
  days: TripDay[];
  totalCost: string;
  tips: string[];
}

const Planner = () => {
  const [budget, setBudget] = useState(500);
  const [duration, setDuration] = useState([5]);
  const [transport, setTransport] = useState("car");
  const [styles, setStyles] = useState<string[]>(["culture"]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [result, setResult] = useState<TripResult | null>(null);

  const generateTrip = async () => {
    setLoading(true);
    setProgress(0);
    setStatusIdx(0);
    setResult(null);

    // Progress animation
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 2, 90));
      setStatusIdx((s) => (s + 1) % statusMessages.length);
    }, 600);

    try {
      const { data, error } = await supabase.functions.invoke("generate-trip", {
        body: {
          budget,
          duration: duration[0],
          transport,
          styles,
        },
      });

      if (error) throw error;
      setResult(data);
      setProgress(100);
    } catch (e: any) {
      console.error("Trip generation error:", e);
      if (e?.message?.includes("429") || e?.status === 429) {
        toast.error("Rate limit exceeded. Please wait a moment and try again.");
      } else if (e?.message?.includes("402") || e?.status === 402) {
        toast.error("AI credits depleted. Please try again later.");
      } else {
        toast.error("Failed to generate trip. Please try again.");
      }
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">AI Trip Planner</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-3">Plan Your Morocco Trip</h1>
            <p className="text-muted-foreground mb-10">Tell us what you want, and AI will craft the perfect itinerary.</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Card className="glass-card">
                  <CardContent className="p-6 md:p-8 space-y-8">
                    {/* Budget */}
                    <div>
                      <Label className="font-display text-base font-semibold mb-3 block">Budget (USD)</Label>
                      <div className="flex items-center gap-4">
                        <Input type="number" value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-28" min={50} max={10000} />
                        <Slider value={[budget]} onValueChange={(v) => setBudget(v[0])} min={50} max={5000} step={50} className="flex-1" />
                      </div>
                    </div>

                    {/* Duration */}
                    <div>
                      <Label className="font-display text-base font-semibold mb-3 block">Duration: {duration[0]} days</Label>
                      <Slider value={duration} onValueChange={setDuration} min={1} max={30} step={1} />
                    </div>

                    {/* Transport */}
                    <div>
                      <Label className="font-display text-base font-semibold mb-3 block">Transport</Label>
                      <ToggleGroup type="single" value={transport} onValueChange={(v) => v && setTransport(v)} className="flex-wrap justify-start">
                        {transportOptions.map((t) => (
                          <ToggleGroupItem key={t.value} value={t.value} className="gap-2 rounded-full px-4">
                            <t.icon className="h-4 w-4" /> {t.label}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </div>

                    {/* Travel Style */}
                    <div>
                      <Label className="font-display text-base font-semibold mb-3 block">Travel Style</Label>
                      <ToggleGroup type="multiple" value={styles} onValueChange={setStyles} className="flex-wrap justify-start">
                        {styleOptions.map((s) => (
                          <ToggleGroupItem key={s.value} value={s.value} className="gap-2 rounded-full px-4">
                            <s.icon className="h-4 w-4" /> {s.label}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </div>

                    <Button size="lg" className="w-full rounded-full text-base gap-2" onClick={generateTrip} disabled={loading || styles.length === 0}>
                      {loading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" /> Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" /> Generate My Trip
                        </>
                      )}
                    </Button>

                    {loading && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        <Progress value={progress} className="h-2" />
                        <p className="text-sm text-muted-foreground text-center animate-pulse">{statusMessages[statusIdx]}</p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                {/* Results */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-display font-bold">{result.title}</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" className="rounded-full gap-2" onClick={() => setResult(null)}>
                        <RefreshCw className="h-4 w-4" /> New Trip
                      </Button>
                    </div>
                  </div>

                  <Card className="glass-card">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4 text-sm">
                        <Badge variant="secondary" className="gap-1"><DollarSign className="h-3 w-3" /> {result.totalCost}</Badge>
                        <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" /> {duration[0]} days</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Timeline */}
                  <div className="space-y-4">
                    {result.days.map((day, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                        <Card className="glass-card">
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <span className="text-sm font-bold text-primary">{day.day}</span>
                              </div>
                              <div>
                                <CardTitle className="text-lg flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-primary" /> {day.city}
                                </CardTitle>
                                {day.travelTime && (
                                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                    <Clock className="h-3 w-3" /> {day.travelTime}
                                  </p>
                                )}
                              </div>
                              <span className="ml-auto text-sm font-medium text-emerald">{day.cost}</span>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <ul className="space-y-1">
                              {day.activities.map((a, j) => (
                                <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <ArrowRight className="h-3 w-3 mt-1 text-primary shrink-0" /> {a}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {result.tips.length > 0 && (
                    <Card className="glass-card border-primary/20">
                      <CardContent className="p-5">
                        <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" /> AI Tips
                        </h3>
                        <ul className="space-y-2">
                          {result.tips.map((tip, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary">•</span> {tip}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default Planner;
