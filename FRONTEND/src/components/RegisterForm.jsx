import React, { useState } from 'react';
import { registerUser } from '../api/user.api';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice';
import { useNavigate } from '@tanstack/react-router';

const RegisterForm = ({ state }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await registerUser(name, password, email);
      dispatch(login(data.user));
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4 text-white"
    >

      <h2 className="text-2xl font-bold text-center">
        Create Account
      </h2>

      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-300 p-2 rounded">
          {error}
        </div>
      )}

      <input
        className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded-lg font-semibold"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>

      <p className="text-center text-sm text-slate-400">
        Already have an account?{" "}
        <span
          onClick={() => state(true)}
          className="text-blue-400 cursor-pointer"
        >
          Sign In
        </span>
      </p>

    </form>
  );
};

export default RegisterForm;