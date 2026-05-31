import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import LoginForm from '../components/auth/LoginForm';

export const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/');
  };

  return (
    <AuthLayout 
      title="Sign In" 
      subtitle="Paste code, run Gemini AI analysis, write cleaner apps"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>
            Welcome Back
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Enter your credentials to manage your review history
          </p>
        </div>

        <LoginForm onSuccess={handleLoginSuccess} />

        <div style={{
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          marginTop: '10px'
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{
            color: 'var(--primary)',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.color = 'var(--accent)'}
          onMouseOut={(e) => e.target.style.color = 'var(--primary)'}
          >
            Create one free
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
