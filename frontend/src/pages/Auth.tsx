import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Compass, Mail, Lock, User } from "lucide-react";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get("mode") === "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) navigate("/dashboard");
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/dashboard");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        toast.success("Check your email to verify your account!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
      }
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/dashboard" },
    });
    if (error) toast.error(error.message);
  };

  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <Compass className="h-10 w-10 text-primary mx-auto mb-3" />
            <h1 className="text-2xl font-display font-bold">{isSignUp ? "Join Safarook" : "Welcome Back"}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isSignUp ? "Create your account to save trips and get AI recommendations." : "Sign in to access your saved trips."}
            </p>
          </div>

          <Card className="glass-card">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2 mb-1.5"><User className="h-3 w-3" /> Full Name</Label>
                    <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" required />
                  </div>
                )}
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-1.5"><Mail className="h-3 w-3" /> Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                </div>
                <div>
                  <Label htmlFor="password" className="flex items-center gap-2 mb-1.5"><Lock className="h-3 w-3" /> Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
                </div>
                <Button type="submit" className="w-full rounded-full" disabled={loading}>
                  {loading ? "Loading..." : isSignUp ? "Create Account" : "Sign In"}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or</span></div>
              </div>

              <Button variant="outline" className="w-full rounded-full" onClick={handleGoogleSignIn}>
                Sign in with Google
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-6">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button type="button" className="text-primary font-medium hover:underline" onClick={() => setIsSignUp(!isSignUp)}>
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Auth;
