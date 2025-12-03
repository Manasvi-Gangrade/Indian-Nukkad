import { MapPin, Flame } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@assets/generated_images/fun_indian_nukkad_app_logo.png";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md px-4 py-3 flex justify-between items-center border-b border-border/20">
      <div className="flex items-center gap-2">
        <img 
          src={logo} 
          alt="Indian Nukkad" 
          className="w-8 h-8 rounded-full shadow-sm border border-primary/20" 
        />
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider leading-none">
            Your Nukkad
          </span>
          <div className="flex items-center gap-1 text-primary font-heading font-bold leading-none">
            <MapPin size={14} className="fill-primary/20" />
            <span>Indore, Palasia</span>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold border border-orange-200 shadow-sm"
      >
        <Flame size={14} className="fill-orange-500" />
        <span>12 Days</span>
      </motion.div>
    </header>
  );
}
