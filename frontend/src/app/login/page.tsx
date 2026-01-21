'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LogIn, Github, Mail } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="neo-card space-y-8 !p-10 bg-white">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-black">LOG IN</h1>
          <p className="font-medium text-slate-600">Enter the bold zone.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full neo-border px-4 py-3 font-bold outline-none focus:bg-primary/20"
              placeholder="hello@neoblog.com"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-black uppercase tracking-wider">
                Password
              </label>
              <Link href="#" className="text-sm font-bold underline">
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full neo-border px-4 py-3 font-bold outline-none focus:bg-primary/20"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full neo-btn !bg-black text-white py-4 flex items-center justify-center gap-2 text-xl mt-4"
          >
            Proceed <LogIn size={20} />
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t-2 border-black"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 font-black">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="neo-btn flex items-center justify-center gap-2 !bg-white">
            <Github size={20} /> GitHub
          </button>
          <button className="neo-btn flex items-center justify-center gap-2 !bg-white">
            <Mail size={20} /> Google
          </button>
        </div>

        <p className="text-center font-bold text-sm">
          New here?{' '}
          <Link href="/register" className="underline text-secondary">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
