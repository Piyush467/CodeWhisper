import React, { useState } from 'react';
import { User, Mail, Lock, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';

export const RegisterForm = ({ onSuccess }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErr, setValidationErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErr('');

    // 1. Inputs validation
    if (!name || !email || !password || !confirmPassword) {
      setValidationErr('Please fill in all registration fields');
      return;
    }

    if (password.length < 6) {
      setValidationErr('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setValidationErr('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setValidationErr(err.message || 'Registration failed. Try a different email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
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

      {/* Name Input */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
          Full Name
        </label>
        <div style={{ position: 'relative' }}>
          <User size={18} style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)'
          }} />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="custom-input"
            placeholder="John Doe"
            style={{ paddingLeft: '44px' }}
            required
          />
        </div>
      </div>

      {/* Email Input */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
          Password (min 6 chars)
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

      {/* Confirm Password Input */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
          Confirm Password
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
        icon={UserPlus}
        style={{ marginTop: '10px', width: '100%' }}
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;
