import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export interface FeedItem {
  id: string;
  type: "meme" | "dialogue" | "poll";
  author: {
    name: string;
    avatar: string;
    time: string;
  };
  content: {
    text?: string;
    image?: string;
    options?: string[];
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "@/lib/api";

export default function FeedCard({ item }: { item: FeedItem }) {
  const [liked, setLiked] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: (postId: string) => likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });

  const handleLike = () => {
    setLiked(!liked);
    likeMutation.mutate(item.id);
  };

  const handleShare = () => {
    toast({
      title: "Shared to WhatsApp!",
      description: "Apne dosto ko dikha diya? Badhiya! 👍",
      duration: 3000,
    });
  };

  const handleComment = () => {
     toast({
      title: "Comments section locked!",
      description: "Abhi sirf dekhne ka, bolne ka nahi. 🤫",
      duration: 2000,
    });
  };

  const handleVote = (option: string) => {
    toast({
      title: "Vote Registered!",
      description: `You voted for: ${option}. Sahi jawab? Pata nahi.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden mb-4"
    >
      {/* Header */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white shadow-sm overflow-hidden">
            <img src={item.author.avatar} alt={item.author.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-heading">{item.author.name}</h4>
            <p className="text-xs text-muted-foreground">{item.author.time}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <MoreHorizontal size={16} />
        </Button>
      </div>

      {/* Content */}
      <div className="px-3 pb-2">
        {item.content.text && (
          <p className="text-sm mb-3 leading-relaxed whitespace-pre-line font-medium">
            {item.content.text}
          </p>
        )}
      </div>
      
      {item.content.image && (
        <div className="relative w-full aspect-[4/3] bg-gray-50">
          <img 
            src={item.content.image} 
            alt="Content" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      {item.type === "poll" && item.content.options && (
        <div className="px-3 pb-3 space-y-2">
          {item.content.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleVote(option)}
              className="w-full p-3 text-left text-sm font-bold bg-secondary/30 hover:bg-secondary/50 border border-secondary rounded-xl transition-colors relative overflow-hidden group"
            >
              <span className="relative z-10">{option}</span>
              <div className="absolute left-0 top-0 bottom-0 bg-secondary/20 w-0 group-hover:w-full transition-all duration-500" />
            </button>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="p-3 flex items-center justify-between border-t border-border/50">
        <div className="flex gap-4">
          <button 
            onClick={handleLike}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-red-500 transition-colors group"
          >
            <Heart 
              size={20} 
              className={`transition-all ${liked ? "fill-red-500 text-red-500 scale-110" : "group-hover:scale-110"}`} 
            />
            <span>{liked ? item.stats.likes + 1 : item.stats.likes}</span>
          </button>
          
          <button 
            onClick={handleComment}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors group"
          >
            <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
            <span>{item.stats.comments}</span>
          </button>
        </div>

        <button 
          onClick={handleShare}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-green-600 transition-colors group"
        >
          <Share2 size={20} className="group-hover:scale-110 transition-transform" />
          <span className="sr-only">Share</span>
        </button>
      </div>
    </motion.div>
  );
}
