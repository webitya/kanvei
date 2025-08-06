'use client';

import { useState } from 'react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      setMessage('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    const username = `${firstName.trim()} ${lastName.trim()}`.trim();

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/signup/send-otp', {
        method: 'POST',
        body: JSON.stringify({ email, username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');

      setMessage('OTP sent to your email.');
      setStep(2);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage('Enter the OTP sent to your email.');
      return;
    }

    const username = `${firstName.trim()} ${lastName.trim()}`.trim();

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/signup/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ email, username, password, otp }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Verification failed');

      setMessage('Signup successful!');
      setStep(3);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>

      {step === 1 && (
        <>
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-2 mb-3 border rounded"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-2 mb-3 border rounded"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 mb-3 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="w-full bg-blue-600 text-white py-2 rounded"
            onClick={handleSendOtp}
            disabled={loading}
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full p-2 mb-3 border rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className="w-full bg-green-600 text-white py-2 rounded"
            onClick={handleVerifyOtp}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </>
      )}

      {step === 3 && (
        <div className="text-green-600 font-medium">✅ You’re signed up!</div>
      )}

      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
}

