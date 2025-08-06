'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/email/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/profile');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider) => {
    window.location.href = `/api/auth/${provider}/login`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-2 border rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 border rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-xl text-white ${
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="my-6 text-center text-sm text-gray-500">or</div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleOAuth('google')}
            className="flex items-center justify-center border rounded-xl py-2 hover:bg-gray-50"
          >
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>
          <button
            onClick={() => handleOAuth('facebook')}
            className="flex items-center justify-center border rounded-xl py-2 hover:bg-gray-50"
          >
            <img src="/facebook-icon.svg" alt="Facebook" className="w-5 h-5 mr-2" />
            Sign in with Facebook
          </button>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium">Phone (optional)</label>
          <input
            type="tel"
            className="mt-1 w-full px-4 py-2 border rounded-xl"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91..."
          />
        </div>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?
          <a href="/signup" className="text-blue-500 hover:underline ml-1">Sign up</a>
        </p>
      </div>
    </div>
  );
}
