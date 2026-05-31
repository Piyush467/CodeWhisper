import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ReviewProvider } from './context/ReviewContext';
import AppRoutes from './routes/AppRoutes';

export const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <ReviewProvider>
          <AppRoutes />
        </ReviewProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
