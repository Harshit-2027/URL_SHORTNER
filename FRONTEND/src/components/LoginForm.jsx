import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ state }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const data = await loginUser(email, password);
      dispatch(login(data.user));
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err.message || 'Login failed');
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
        Login
      </h2>

      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-300 p-2 rounded">
          {error}
        </div>
      )}

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
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <p className="text-center text-sm text-slate-400">
        Don't have an account?{" "}
        <span
          onClick={() => state(false)}
          className="text-blue-400 cursor-pointer"
        >
          Register
        </span>
      </p>

    </form>
  );
};

export default LoginForm;