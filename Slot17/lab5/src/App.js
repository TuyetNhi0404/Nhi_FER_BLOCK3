import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Context Providers
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavouritesProvider } from './context/FavouritesContext';
import { ToastProvider } from './context/ToastContext';

// Components
import NavBar from './components/NavBar';
import ToastContainer from './components/ToastContainer';
import AppRoutes from './routes/AppRoutes';

const AppContent = () => {
  const { colors } = useTheme();

  const appStyle = {
    backgroundColor: colors.background,
    color: colors.text,
    minHeight: '100vh'
  };

  const footerStyle = {
    backgroundColor: colors.primary,
    color: 'white',
    textAlign: 'center',
    padding: '20px 0',
    marginTop: 'auto',
    borderTop: `3px solid ${colors.secondary}`
  };

  return (
    <div style={appStyle} className="d-flex flex-column">
      <NavBar />
      
      <main className="flex-grow-1">
        <AppRoutes />
      </main>
      
      <footer style={footerStyle}>
        <Container>
          <p className="mb-0">
            © {new Date().getFullYear()} Food Ordering App. Made with ❤️ for food lovers.
          </p>
        </Container>
      </footer>
      
      <ToastContainer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <FavouritesProvider>
            <ToastProvider>
              <Router>
                <AppContent />
              </Router>
            </ToastProvider>
          </FavouritesProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;