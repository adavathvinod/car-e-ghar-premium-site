import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const isNetworkFetchError = (err: unknown) =>
  err instanceof TypeError && err.message.toLowerCase().includes("failed to fetch");

async function withRetry<T>(fn: () => Promise<T>, retries = 2): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (!isNetworkFetchError(err) || attempt === retries) throw err;
      await sleep(500 * (attempt + 1));
    }
  }
  throw lastError;
}

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();

    try {
      if (isLogin) {
        const { error } = await withRetry(() =>
          supabase.auth.signInWithPassword({ email: normalizedEmail, password })
        );
        if (error) throw error;
      } else {
        const { data, error } = await withRetry(() =>
          supabase.auth.signUp({
            email: normalizedEmail,
            password,
          })
        );

        if (error) {
          const maybeExistingUser =
            error.message.toLowerCase().includes("already") ||
            error.message.toLowerCase().includes("registered") ||
            error.message.toLowerCase().includes("exists");

          if (maybeExistingUser) {
            const { error: signInError } = await withRetry(() =>
              supabase.auth.signInWithPassword({ email: normalizedEmail, password })
            );
            if (!signInError) {
              toast({ title: "Welcome back", description: "Account already exists, signed you in." });
              return;
            }
          }

          throw error;
        }

        if (data.session) {
          toast({ title: "Account created", description: "You're signed in and ready to use the app." });
        } else {
          toast({ title: "Check your email", description: "We sent you a verification link." });
        }
      }
    } catch (err: any) {
      if (isNetworkFetchError(err)) {
        toast({
          title: "Network error",
          description: "Could not reach authentication service. Please retry in a few seconds.",
          variant: "destructive",
        });
      } else {
        toast({ title: "Error", description: err.message, variant: "destructive" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <FileText className="h-8 w-8 text-accent" />
          <h1 className="text-2xl font-bold text-foreground">AI Invoice Generator</h1>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {isLogin ? "Sign In" : "Create Account"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="pl-9" required />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="pl-9" required minLength={6} />
              </div>
            </div>
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground text-center mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-accent hover:underline font-medium">
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
