import React, { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { Mail } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      toast.success('If an account with that email exists, a reset link has been sent.');
      setSubmitted(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred.');
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
        <h2 className="text-3xl font-bold text-center text-text-primary">Forgot Password</h2>
        {submitted ? (
          <p className="text-center text-text-secondary">
            Please check your inbox for a password reset link. The link will be valid for 15 minutes.
          </p>
        ) : (
          <>
            <p className="text-center text-text-secondary">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <form className="space-y-6" onSubmit={handleSubmit}>
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
              <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
                Send Reset Link
              </Button>
            </form>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
