import React, { useState } from 'react';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';

export const LoginForm = ({ onSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErr, setValidationErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErr('');

    // 1. Basic validation
    if (!email || !password) {
      setValidationErr('Please fill in all standard credentials');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setValidationErr(err.message || 'Login attempt failed. Check your password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      width: '100%'
    }}>
      {validationErr && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          borderRadius: '8px',
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.88rem',
          color: '#fca5a5'
        }}>
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{validationErr}</span>
        </div>
      )}

      {/* Email Input */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
          Email Address
        </label>
        <div style={{ position: 'relative' }}>
          <Mail size={18} style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)'
          }} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="custom-input"
            placeholder="name@domain.com"
            style={{ paddingLeft: '44px' }}
            required
          />
        </div>
      </div>

      {/* Password Input */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
          Password
        </label>
        <div style={{ position: 'relative' }}>
          <Lock size={18} style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)'
          }} />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="custom-input"
            placeholder="••••••••"
            style={{ paddingLeft: '44px' }}
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        loading={loading}
        icon={LogIn}
        style={{ marginTop: '10px', width: '100%' }}
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
