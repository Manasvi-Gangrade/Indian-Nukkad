import Layout from "@/components/Layout";
import { Trophy, Star, Coffee, Share2, Settings } from "lucide-react";
import uncle from "@assets/generated_images/funny_indian_neighbor_uncle_caricature.png";
import { Button } from "@/components/ui/button";

export default function Profile() {
  return (
    <Layout>
      <div className="relative">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-primary to-orange-400"></div>
        
        {/* Profile Info */}
        <div className="px-4 -mt-12 mb-6 flex justify-between items-end">
          <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
            <img src={uncle} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <Button variant="outline" size="sm" className="mb-2 rounded-full border-primary/50 text-primary hover:bg-primary/5">
            <Settings size={16} className="mr-1" />
            Edit Profile
          </Button>
        </div>

        <div className="px-4 mb-6">
          <h1 className="text-2xl font-heading font-bold">Raju from Bombay</h1>
          <p className="text-muted-foreground font-medium">@raju_bhai_mbbs</p>
          <p className="mt-2 text-sm font-medium leading-relaxed">
            "Tension lene ka nahi, dene ka!" 😎 <br/>
            Professional Chai Taster & Meme Lord.
          </p>
        </div>

        {/* Stats */}
        <div className="px-4 grid grid-cols-3 gap-3 mb-8">
          <div className="bg-orange-50 border border-orange-100 p-3 rounded-2xl text-center space-y-1">
            <Coffee className="mx-auto text-orange-500 mb-1" size={20} />
            <div className="text-xl font-bold font-heading text-orange-900">142</div>
            <div className="text-[10px] font-bold uppercase text-orange-700 tracking-wide">Chais Drank</div>
          </div>
          <div className="bg-blue-50 border border-blue-100 p-3 rounded-2xl text-center space-y-1">
            <Share2 className="mx-auto text-blue-500 mb-1" size={20} />
            <div className="text-xl font-bold font-heading text-blue-900">56</div>
            <div className="text-[10px] font-bold uppercase text-blue-700 tracking-wide">Memes Shared</div>
          </div>
          <div className="bg-purple-50 border border-purple-100 p-3 rounded-2xl text-center space-y-1">
            <Star className="mx-auto text-purple-500 mb-1" size={20} />
            <div className="text-xl font-bold font-heading text-purple-900">4.8</div>
            <div className="text-[10px] font-bold uppercase text-purple-700 tracking-wide">Nukkad Rating</div>
          </div>
        </div>

        {/* Achievements */}
        <div className="px-4">
          <h2 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
            <Trophy size={20} className="text-yellow-500" />
            Badges & Achievements
          </h2>
          
          <div className="space-y-3">
            {[
              { title: "Chai Lover", desc: "Drank chai 7 days in a row", color: "bg-amber-100 text-amber-800" },
              { title: "Gossip King", desc: "Started 10 discussions", color: "bg-pink-100 text-pink-800" },
              { title: "Early Bird", desc: "First to rate daily mood", color: "bg-sky-100 text-sky-800" },
            ].map((badge, i) => (
              <div key={i} className={`flex items-center gap-4 p-3 rounded-xl border border-transparent ${badge.color} bg-opacity-50`}>
                <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-xl">
                  🏆
                </div>
                <div>
                  <h3 className="font-bold text-sm">{badge.title}</h3>
                  <p className="text-xs opacity-80 font-medium">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
