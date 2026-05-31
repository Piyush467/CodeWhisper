import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';

export const Register = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    navigate('/');
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Unlock professional AI-powered code reviews instantly"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '4px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>
            Get Started
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Register your email to begin caching reviews
          </p>
        </div>

        <RegisterForm onSuccess={handleRegisterSuccess} />

        <div style={{
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          marginTop: '6px'
        }}>
          Already registered?{' '}
          <Link to="/login" style={{
            color: 'var(--primary)',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.color = 'var(--accent)'}
          onMouseOut={(e) => e.target.style.color = 'var(--primary)'}
          >
            Sign in here
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
