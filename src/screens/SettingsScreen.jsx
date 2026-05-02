import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, MessageSquare, Info, Save } from 'lucide-react';
import './SettingsScreen.css';

const SettingsScreen = ({ isDark, setIsDark }) => {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [msg, setMsg] = useState('EMERGENCY! [User Name] needs help! \nLocation: [GPS LINK] \n- SafeHer');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const settings = localStorage.getItem('safeher_settings');
    if (settings) {
      const p = JSON.parse(settings);
      setName(p.name || '');
      setPin(p.pin || '');
      setMsg(p.emergencyMessage || msg);
    }
  }, []);

  const handleSave = () => {
    const settings = { name, pin, emergencyMessage: msg, darkMode: isDark };
    localStorage.setItem('safeher_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="settings-screen">
      <div className="screen-header">
        <h1 className="title-large">Settings</h1>
        <p className="subtitle-muted">Personalize your app</p>
      </div>

      <div className="card profile-card">
        <div className="profile-avatar">
          <User size={32} color="white" />
        </div>
        <h3 className="profile-name">{name || 'Guest User'}</h3>
        <p className="edit-hint">Tap to edit name below</p>
      </div>

      <div className="settings-list">
        <div className="card settings-item-card">
          <label className="input-label"><User size={14} /> Your Name</label>
          <input type="text" className="input-field" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" />
        </div>

        <div className="card settings-item-card">
          <label className="input-label"><Lock size={14} /> Cancel PIN (4 digits)</label>
          <input type="password" className="input-field" maxLength="4" value={pin} onChange={e => setPin(e.target.value)} placeholder="0000" />
          <p className="helper-text">Enter PIN to cancel false alarm</p>
        </div>

        <div className="card settings-item-card">
          <label className="input-label"><MessageSquare size={14} /> Emergency Message</label>
          <textarea className="input-field" rows="4" value={msg} onChange={e => setMsg(e.target.value)} />
          <p className="helper-text">Use [User Name] and [GPS LINK]</p>
        </div>

        <div className="card settings-item-card toggle-card">
          <div className="toggle-info">
            <strong>Dark Mode</strong>
            <p className="helper-text">Switch between light and dark</p>
          </div>
          <div className={`toggle-switch ${isDark ? 'active' : ''}`} onClick={() => setIsDark(!isDark)}>
            <div className="toggle-dot" />
          </div>
        </div>

        <div className="card about-card">
          <div className="about-row">
            <Info size={16} className="icon-purple" />
            <strong>SafeHer v1.0</strong>
          </div>
          <p>Women Safety Bracelet Project</p>
          <p className="small-helper">Diploma Project 2024</p>
        </div>
      </div>

      <button className="btn-primary save-settings-btn" onClick={handleSave}>
        <Save size={20} /> {saved ? 'Saved!' : 'Save Settings'}
      </button>
    </motion.div>
  );
};

export default SettingsScreen;
