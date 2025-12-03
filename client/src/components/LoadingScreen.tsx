import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import uncle from "@assets/generated_images/funny_indian_neighbor_uncle_caricature.png";
import auntie from "@assets/generated_images/funny_indian_neighbor_auntie_caricature.png";

const jokes = [
  "Ruk ja bhai, chai ban rahi hai...",
  "Traffic clear hone ka wait kar rahe hain...",
  "Sharma ji ka beta load ho gaya, tumhara wait hai...",
  "Mummy se permission le rahe hain...",
  "Wifi ka wire hila ke dekha?",
];

export default function LoadingScreen() {
  const [jokeIndex, setJokeIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setJokeIndex((prev) => (prev + 1) % jokes.length);
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-primary flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      
      {/* Floating Characters */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-20 left-[-20px] w-32 h-32 opacity-20"
      >
        <img src={uncle} className="w-full h-full object-contain" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 right-[-20px] w-32 h-32 opacity-20"
      >
        <img src={auntie} className="w-full h-full object-contain" />
      </motion.div>

      <div className="relative z-10 w-full max-w-xs">
        <h1 className="font-heading text-4xl text-white font-bold mb-8 drop-shadow-md">
          Indian Nukkad
        </h1>

        <div className="h-48 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={jokeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-white/90 text-lg font-bold font-heading"
            >
              "{jokes[jokeIndex]}"
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Custom Loader */}
        <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div 
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white/60 text-xs mt-2 font-bold tracking-widest uppercase">
          Loading Mohalla... {progress}%
        </p>
      </div>
    </div>
  );
}
