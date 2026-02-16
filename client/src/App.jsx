import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';

// Layout components
import Layout from './components/layout/Layout';

// Page components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/favoritesayah" element={<FavoritesPage />} />
            </Route>
          </Routes>
          
          <Toaster 
            position="top-center" 
            toastOptions={{
              className: 'dark:bg-slate-800 dark:text-white',
              style: {
                background: '#333',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#10b981', // Emerald 500
                },
              },
              error: {
                style: {
                  background: '#ef4444', // Red 500
                },
              },
            }}
          />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
