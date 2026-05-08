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
      className="w-full space-y-5 text-white"
    >

      <div className="text-center">
        <h2 className="text-3xl font-bold">Welcome Back</h2>
        <p className="text-sm text-slate-400 mt-1">
          Login to your account
        </p>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-300 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-3">

        <div>
          <label className="text-sm text-slate-300">Email</label>
          <input
            className="w-full mt-1 bg-slate-800 border border-slate-700 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-slate-300">Password</label>
          <input
            type="password"
            className="w-full mt-1 bg-slate-800 border border-slate-700 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

      </div>

      <button
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-lg font-semibold disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <p className="text-center text-sm text-slate-400">
        Don't have an account?{" "}
        <span
          onClick={() => state(false)}
          className="text-blue-400 cursor-pointer hover:underline"
        >
          Register
        </span>
      </p>

    </form>
  );
};

export default LoginForm;