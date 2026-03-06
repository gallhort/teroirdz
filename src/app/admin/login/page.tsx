"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email ou mot de passe incorrect.");
    } else {
      router.push("/admin");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-brown flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-cream">Terodz</h1>
          <p className="text-sand mt-1 text-sm">Administration</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-xl font-serif font-bold text-brown mb-6">Connexion</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@terodz.dz"
              required
            />
            <Input
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {error}
              </p>
            )}

            <Button type="submit" loading={loading} className="w-full mt-2">
              Se connecter
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
