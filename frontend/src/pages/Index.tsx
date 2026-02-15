import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import {
  Route, DollarSign, Clock, Users, Sun,
  MapPin, Star, ArrowRight, Sparkles, ChevronRight,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const aiFeatures = [
  { icon: Route, title: "Smart Route Generator", desc: "AI builds the perfect route based on your preferences and time." },
  { icon: DollarSign, title: "Budget Optimizer", desc: "Get the most out of every dirham with smart cost planning." },
  { icon: Clock, title: "Travel Time Estimator", desc: "Accurate travel durations between every destination." },
  { icon: Users, title: "Crowd Prediction", desc: "Know when places are busy and plan accordingly." },
  { icon: Sun, title: "Best Time to Visit", desc: "AI recommends the ideal season for each destination." },
];

const destinations = [
  { name: "Marrakech", tag: "Culture & Markets", cost: "$45/day" },
  { name: "Chefchaouen", tag: "Blue Pearl", cost: "$30/day" },
  { name: "Fes", tag: "Ancient Medina", cost: "$35/day" },
  { name: "Sahara Desert", tag: "Adventure", cost: "$60/day" },
  { name: "Essaouira", tag: "Coastal Charm", cost: "$40/day" },
  { name: "Casablanca", tag: "Modern City", cost: "$50/day" },
];

const steps = [
  { num: "01", title: "Tell Us Your Preferences", desc: "Budget, duration, travel style — you choose." },
  { num: "02", title: "AI Generates Your Route", desc: "Our AI crafts a personalized day-by-day itinerary." },
  { num: "03", title: "Explore & Enjoy", desc: "Save your trip, share it, and hit the road!" },
];

const testimonials = [
  { name: "Sarah L.", text: "Safarook planned my 10-day Morocco trip in seconds. Every recommendation was perfect!", rating: 5 },
  { name: "Marco D.", text: "The AI budget optimizer saved me hundreds. Incredible tool for any traveler.", rating: 5 },
  { name: "Aisha K.", text: "I discovered hidden gems I'd never have found on my own. Truly magical experience.", rating: 5 },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
        <div className="absolute inset-0 moroccan-pattern opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground text-sm mb-6 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" /> Powered by AI
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6">
              Explore Morocco<br />
              <span className="text-gradient">Smarter with AI</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mb-8 font-light">
              AI-powered personalized travel routes. Tell us your budget, style, and duration — we'll craft the perfect Moroccan adventure.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full text-base px-8 gap-2" asChild>
                <Link to="/planner">Generate My Trip <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full text-base px-8 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20" asChild>
                <Link to="/discover">Explore Places</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        {/* Decorative shapes */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* AI Features */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.p variants={fadeUp} custom={0} className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">AI-Powered Features</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-display font-bold mb-4">Smart Travel Planning</motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground max-w-2xl mx-auto">Our AI analyzes thousands of data points to create your ideal Moroccan journey.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {aiFeatures.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} custom={i}>
                <Card className="glass-card h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/30">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <f.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-sm mb-2">{f.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-24 bg-muted/50 moroccan-pattern">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-end justify-between mb-12">
            <div>
              <motion.p variants={fadeUp} custom={0} className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Top Picks</motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-display font-bold">Popular Destinations</motion.h2>
            </div>
            <motion.div variants={fadeUp} custom={2}>
              <Button variant="ghost" className="gap-1" asChild>
                <Link to="/discover">View All <ChevronRight className="h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((d, i) => (
              <motion.div key={d.name} variants={fadeUp} custom={i}>
                <Card className="glass-card overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="h-48 gradient-sunset relative">
                    <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur text-xs font-medium">{d.tag}</span>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <h3 className="font-display font-semibold">{d.name}</h3>
                      </div>
                      <span className="text-sm text-muted-foreground">{d.cost}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.p variants={fadeUp} custom={0} className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Simple Process</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-display font-bold">How It Works</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div key={s.num} variants={fadeUp} custom={i} className="text-center">
                <div className="text-6xl font-display font-bold text-primary/20 mb-4">{s.num}</div>
                <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.p variants={fadeUp} custom={0} className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Testimonials</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-display font-bold">Loved by Travelers</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} variants={fadeUp} custom={i}>
                <Card className="glass-card h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 italic">"{t.text}"</p>
                    <p className="font-display font-semibold text-sm">{t.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 gradient-hero relative">
        <div className="absolute inset-0 moroccan-pattern opacity-20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Ready to Explore Morocco?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
              Let AI plan your dream trip in seconds. No guesswork, just adventure.
            </motion.p>
            <motion.div variants={fadeUp} custom={2}>
              <Button size="lg" className="rounded-full text-base px-10 gap-2" asChild>
                <Link to="/planner">Start Planning <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
