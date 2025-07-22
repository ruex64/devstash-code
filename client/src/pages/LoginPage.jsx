import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data);
      toast.success(`Welcome back, ${data.name}!`);
      navigate('/');
    } catch (error) { // Added missing curly braces here
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/google-login', {
        tokenId: credentialResponse.credential,
      });
      login(data);
      toast.success(`Welcome, ${data.name}!`);
      navigate('/');
    } catch (error) {
      toast.error('Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center"
    >
      <div className="w-full max-w-md p-8 space-y-6 glass-card">
        <h2 className="text-3xl font-bold text-center text-text-primary">Welcome Back</h2>
        <form className="space-y-6" onSubmit={handleEmailLogin}>
          <Input
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            icon={<Mail size={18} />}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            icon={<Lock size={18} />}
          />
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-accent hover:underline">
              Forgot password?
            </Link>
          </div>
          {/* This ensures the styled button is used */}
          <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
            Sign In
          </Button>
        </form>
        {/* Corrected Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-border-color" />
          <span className="flex-shrink mx-4 text-text-secondary text-sm">Or continue with</span>
          <div className="flex-grow border-t border-border-color" />
        </div>
        <div className="flex justify-center">
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error('Google login failed.')}
                theme="filled_black"
                text="signin_with"
                shape="pill"
            />
        </div>
        <p className="text-center text-sm text-text-secondary">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-accent hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
