import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Shield } from 'lucide-react';
import BottomNavigation from './components/BottomNavigation';
import HomeScreen from './screens/HomeScreen';
import ContactsScreen from './screens/ContactsScreen';
import LiveLocationScreen from './screens/LiveLocationScreen';
import SettingsScreen from './screens/SettingsScreen';
import SplashScreen from './components/SplashScreen';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('safeher-darkmode');
    return saved === 'true';
  });

  useEffect(() => {
    // Apply theme
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('safeher-darkmode', isDark);
  }, [isDark]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <header className="app-top-bar">
        <div className="top-bar-left">
          <Shield size={24} className="icon-purple" fill="currentColor" />
          <span className="brand-name">SafeHer</span>
        </div>
        <div className="top-bar-right">
          <div className="connection-badge">
            <div className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`} />
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
        </div>
      </header>

      <div className="screen-container">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/contacts" element={<ContactsScreen />} />
          <Route path="/location" element={<LiveLocationScreen />} />
          <Route path="/settings" element={<SettingsScreen isDark={isDark} setIsDark={setIsDark} />} />
        </Routes>
      </div>
      <BottomNavigation />
    </Router>
  );
}

export default App;
