import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import state from '../store';
import { useEffect } from 'react';

import { CustomButton } from '../components';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion';

const Home = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();
  useEffect(() => {
    // Reset state when navigating away from this page
    return () => {
      state.intro = true; // Reset the intro state when navigating away
    };
  }, []);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section
          className="w-full h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
          style={{ backgroundImage: `url('/bg1.jpg')` }}
          {...slideAnimation('left')}
        >
          <motion.div
            className="flex flex-col items-center justify-center text-center"
            {...slideAnimation("down")}
          >
            {/* Logo + Text Row */}
            <div className="flex items-center justify-center gap-5  mb-2">
              <img
                src="/logo.png"
                alt="Fit Forge Logo"
                className="w-14 h-14 md:w-20 md:h-20 object-contain"
              />
              <h1 className="text-white text-2xl md:text-6xl font-extrabold tracking-wider">
                FIT FORGE
              </h1>
            </div>

            {/* Subheading */}
            <h2 className="text-white text-2xl md:text-2xl font-light tracking-[0.35em] mb-20">
              APPAREL
            </h2>

            {/* Button */}
            <motion.button
              type="button"
              onClick={() => {
                state.intro = false;
                navigate('/customize');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-white text-white rounded-md text-sm tracking-widest transition-all duration-300 hover:bg-white hover:text-black"
            >
              CUSTOMIZE MODAL
            </motion.button>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>

  )
}

export default Home