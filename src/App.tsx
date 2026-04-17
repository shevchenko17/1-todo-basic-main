import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as CustomThemeProvider, useTheme } from './contexts/ThemeContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './styles/themes';
import ProtectedRoute from './ProtectedRoute';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';


const ThemedApp: React.FC = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />ю. ьждл
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <CustomThemeProvider>
      <ThemedApp />
    </CustomThemeProvider>
  );
};

export default App;