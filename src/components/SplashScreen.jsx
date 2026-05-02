import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import './SplashScreen.css';

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="splash-content"
      >
        <div className="splash-logo-circle">
          <Shield size={100} color="white" fill="white" />
        </div>
        <h1 className="splash-title">SafeHer</h1>
        <p className="splash-tagline">Your safety, always with you</p>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
