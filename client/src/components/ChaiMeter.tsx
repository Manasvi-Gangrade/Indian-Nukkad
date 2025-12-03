import { motion } from "framer-motion";
import { useState } from "react";
import chaiImage from "@assets/generated_images/steaming_chai_glass_illustration.png";
import { useToast } from "@/hooks/use-toast";

const moods = [
  { label: "Kadak", color: "bg-amber-600", emoji: "🔥" },
  { label: "Chill", color: "bg-teal-500", emoji: "😎" },
  { label: "Thanda", color: "bg-blue-400", emoji: "❄️" },
  { label: "Romance", color: "bg-pink-500", emoji: "💖" },
];

export default function ChaiMeter() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSelect = (idx: number) => {
    setSelectedMood(idx);
    toast({
      title: `Mood: ${moods[idx].label}!`,
      description: "Your vibe has been recorded in the Mohalla database. 📝",
    });
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-4 shadow-sm border border-orange-100 mb-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute -right-4 -top-4 opacity-20 w-32 h-32">
         <img src={chaiImage} alt="Chai" className="w-full h-full object-contain" />
      </div>

      <h3 className="text-lg font-heading font-bold text-amber-900 mb-1">Aaj ka Chai Mood?</h3>
      <p className="text-xs text-amber-700 mb-4 font-medium">Rate your neighborhood vibe today!</p>

      <div className="flex justify-between gap-2 relative z-10">
        {moods.map((mood, idx) => (
          <motion.button
            key={mood.label}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(idx)}
            className={`flex-1 flex flex-col items-center gap-2 p-2 rounded-xl border transition-all ${
              selectedMood === idx 
                ? "bg-white shadow-md border-amber-200 scale-105 ring-2 ring-amber-400" 
                : "bg-white/60 border-transparent hover:bg-white"
            }`}
          >
            <span className="text-2xl filter drop-shadow-sm">{mood.emoji}</span>
            <span className="text-[10px] font-bold uppercase tracking-wide text-amber-900">
              {mood.label}
            </span>
          </motion.button>
        ))}
      </div>
      
      {selectedMood !== null && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 text-center"
        >
          <p className="text-xs font-bold text-amber-800">
            You and 420 others are feeling {moods[selectedMood].label} today!
          </p>
        </motion.div>
      )}
    </div>
  );
}
