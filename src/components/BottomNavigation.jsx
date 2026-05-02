import { NavLink } from 'react-router-dom';
import { Home, Users, MapPin, Settings } from 'lucide-react';
import './BottomNavigation.css';

const BottomNavigation = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}>
        <div className="active-dot"></div>
        <Home className="nav-icon" />
        <span className="nav-label">Home</span>
      </NavLink>
      
      <NavLink to="/contacts" className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}>
        <div className="active-dot"></div>
        <Users className="nav-icon" />
        <span className="nav-label">Contacts</span>
      </NavLink>
      
      <NavLink to="/location" className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}>
        <div className="active-dot"></div>
        <MapPin className="nav-icon" />
        <span className="nav-label">Location</span>
      </NavLink>

      <NavLink to="/settings" className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}>
        <div className="active-dot"></div>
        <Settings className="nav-icon" />
        <span className="nav-label">Settings</span>
      </NavLink>
    </nav>
  );
};

export default BottomNavigation;
