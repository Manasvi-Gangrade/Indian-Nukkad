import Layout from "@/components/Layout";
import { MessageSquare, Users, Mic, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchDiscussions, fetchVoiceChannels } from "@/lib/api";
import uncle from "@assets/generated_images/funny_indian_neighbor_uncle_caricature.png";
import auntie from "@assets/generated_images/funny_indian_neighbor_auntie_caricature.png";

export default function Mohalla() {
  const [, setLocation] = useLocation();
  
  const { data: voiceChannels = [] } = useQuery({
    queryKey: ["voiceChannels"],
    queryFn: fetchVoiceChannels,
  });

  const { data: discussions = [] } = useQuery({
    queryKey: ["discussions"],
    queryFn: fetchDiscussions,
  });

  return (
    <Layout>
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md px-4 py-3 border-b border-border/20">
        <h1 className="text-xl font-heading font-bold text-primary">Mohalla Corner</h1>
        <p className="text-xs text-muted-foreground font-medium">Interact with your neighborhood</p>
      </header>

      <div className="p-4 space-y-4">
        {/* Active Voice Rooms */}
        <section>
          <h2 className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wider">Live Nukkad</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {voiceChannels.map((channel: any) => (
              <div key={channel.id} className="flex-shrink-0 w-32 bg-gradient-to-b from-primary/10 to-primary/5 rounded-xl border border-primary/20 flex flex-col items-center justify-between p-3 space-y-2 relative overflow-hidden group">
                
                <div className="w-full flex justify-between items-start">
                  <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">LIVE</span>
                  <div className="flex items-center gap-1 text-[10px] text-primary font-bold">
                    <Headphones size={10} /> {channel.listeners}
                  </div>
                </div>

                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <Mic size={24} className="text-primary" />
                </div>
                
                <span className="text-xs font-bold text-center leading-tight line-clamp-2 h-8 flex items-center justify-center">
                  {channel.name}
                </span>

                <Button 
                  size="sm" 
                  className="w-full h-7 text-[10px] font-bold bg-primary hover:bg-primary/90"
                  onClick={() => setLocation(`/live/${channel.id}`)}
                >
                  Join
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Discussion List */}
        <section>
          <h2 className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wider">Discussions</h2>
          <div className="space-y-3">
            {discussions.map((item: any, idx: number) => (
              <Link key={item.id} href={`/chat/${item.id}`}>
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-4 bg-card rounded-2xl shadow-sm border border-border cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center font-bold text-lg relative overflow-hidden`}>
                    <img src={idx % 2 === 0 ? uncle : auntie} className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm font-heading leading-tight mb-1">{item.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-1">
                        <Users size={12} /> {item.participants}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={12} /> Active
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}

