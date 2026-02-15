import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { destinations, type Destination } from "@/lib/destinations";
import { MapPin, Search, Sun, DollarSign, Star } from "lucide-react";

const types = ["all", "city", "nature", "desert", "beach"] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }),
};

const Discover = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.description.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "all" || d.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-3">Discover Morocco</h1>
            <p className="text-muted-foreground max-w-xl">Explore iconic cities, breathtaking landscapes, and hidden gems across the kingdom.</p>
          </motion.div>

          {/* Filters */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search destinations..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {types.map((t) => (
                <Button key={t} size="sm" variant={typeFilter === t ? "default" : "outline"} className="rounded-full capitalize" onClick={() => setTypeFilter(t)}>
                  {t}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Grid */}
          <motion.div initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((d, i) => (
              <motion.div key={d.id} variants={fadeUp} custom={i}>
                <DestinationCard destination={d} />
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">No destinations found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

const DestinationCard = ({ destination: d }: { destination: Destination }) => (
  <Card className="glass-card overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
    <div className="h-44 gradient-sunset relative">
      <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors" />
      <div className="absolute top-3 right-3">
        <Badge variant="secondary" className="backdrop-blur bg-background/70 capitalize text-xs">{d.type}</Badge>
      </div>
      <div className="absolute bottom-3 left-3 flex gap-2">
        {d.highlights.slice(0, 2).map((h) => (
          <span key={h} className="px-2 py-0.5 rounded-full bg-background/80 backdrop-blur text-[10px] font-medium">{h}</span>
        ))}
      </div>
    </div>
    <CardContent className="p-5">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary shrink-0" />
          <h3 className="font-display font-semibold text-lg">{d.name}</h3>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-gold text-gold" />
          <span className="text-xs text-muted-foreground">{d.popularity}%</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-4 leading-relaxed line-clamp-2">{d.description}</p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1"><Sun className="h-3 w-3 text-gold" /> {d.bestTime}</div>
        <div className="flex items-center gap-1"><DollarSign className="h-3 w-3 text-emerald" /> ${d.dailyCost}/day</div>
      </div>
    </CardContent>
  </Card>
);

export default Discover;
