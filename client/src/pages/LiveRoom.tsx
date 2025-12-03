import { useState } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Monitor, MessageSquare, Users, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VOICE_CHANNELS } from "@/lib/mockData";
import uncle from "@assets/generated_images/funny_indian_neighbor_uncle_caricature.png";
import auntie from "@assets/generated_images/funny_indian_neighbor_auntie_caricature.png";

// Mock participants
const PARTICIPANTS = [
  { id: 1, name: "You", avatar: uncle, isSpeaking: false, isMuted: true },
  { id: 2, name: "Sharma Ji", avatar: uncle, isSpeaking: true, isMuted: false },
  { id: 3, name: "Gupta Aunty", avatar: auntie, isSpeaking: false, isMuted: true },
  { id: 4, name: "Raju", avatar: uncle, isSpeaking: false, isMuted: false },
  { id: 5, name: "Pinky", avatar: auntie, isSpeaking: true, isMuted: false },
  { id: 6, name: "Pappu", avatar: uncle, isSpeaking: false, isMuted: true },
];

export default function LiveRoom() {
  const [, params] = useRoute("/live/:id");
  const channelId = params ? parseInt(params.id) : null;
  const channel = VOICE_CHANNELS.find((c) => c.id === channelId);
  
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  if (!channel) return <div className="flex items-center justify-center h-screen">Channel not found</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white max-w-md mx-auto shadow-2xl relative overflow-hidden">
      
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
            <h1 className="text-lg font-bold font-heading leading-none shadow-sm">{channel.name}</h1>
          </div>
          <p className="text-xs text-gray-300 font-medium mt-1 ml-1">{channel.listeners} listening</p>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
          <MoreVertical size={20} />
        </Button>
      </header>

      {/* Participants Grid */}
      <div className="flex-1 overflow-y-auto p-4 pt-20 pb-24 grid grid-cols-2 gap-3 content-start">
        {PARTICIPANTS.map((participant) => (
          <motion.div 
            key={participant.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square bg-gray-800 rounded-2xl overflow-hidden border border-white/10 shadow-lg"
          >
            {/* Avatar */}
            <img src={participant.avatar} alt={participant.name} className="w-full h-full object-cover opacity-80" />
            
            {/* Speaking Indicator */}
            {participant.isSpeaking && (
              <div className="absolute inset-0 border-4 border-green-500 rounded-2xl animate-pulse" />
            )}

            {/* Name Tag */}
            <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1.5">
              {participant.isMuted ? (
                <MicOff size={10} className="text-red-400" />
              ) : (
                <Mic size={10} className="text-green-400" />
              )}
              <span className="text-[10px] font-bold">{participant.name}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-white/10 p-4 pb-6 rounded-t-3xl z-20">
        <div className="flex justify-around items-center max-w-sm mx-auto">
          
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3.5 rounded-full transition-all ${isMuted ? "bg-white/10 text-white" : "bg-white text-black"}`}
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>

          <button 
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`p-3.5 rounded-full transition-all ${!isVideoOn ? "bg-white/10 text-white" : "bg-white text-black"}`}
          >
            {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
          </button>

          <button 
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className={`p-3.5 rounded-full transition-all ${!isScreenSharing ? "bg-white/10 text-white" : "bg-green-500 text-white"}`}
          >
            <Monitor size={24} />
          </button>

          <Link href="/mohalla">
            <button className="p-3.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20">
              <PhoneOff size={24} />
            </button>
          </Link>

        </div>
        
        <div className="mt-6 flex justify-center gap-6">
           <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors cursor-pointer">
             <Users size={20} />
             <span className="text-[10px] font-bold">Participants</span>
           </div>
           <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors cursor-pointer">
             <MessageSquare size={20} />
             <span className="text-[10px] font-bold">Chat</span>
           </div>
        </div>
      </div>

    </div>
  );
}
