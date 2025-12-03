import { useState, useEffect, useRef } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Send, MoreVertical, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDiscussions, fetchMessages, sendMessage } from "@/lib/api";
import uncle from "@assets/generated_images/funny_indian_neighbor_uncle_caricature.png";

const DEMO_USER_ID = "demo_user_id";

export default function ChatRoom() {
  const [, params] = useRoute("/chat/:id");
  const discussionId = params?.id || "";
  const queryClient = useQueryClient();
  
  const { data: discussions = [] } = useQuery({
    queryKey: ["discussions"],
    queryFn: fetchDiscussions,
  });
  
  const discussion = discussions.find((d: any) => d.id === discussionId);

  const { data: messages = [] } = useQuery({
    queryKey: ["messages", discussionId],
    queryFn: () => fetchMessages(discussionId),
    enabled: !!discussionId,
  });

  const sendMessageMutation = useMutation({
    mutationFn: (text: string) => sendMessage(discussionId, DEMO_USER_ID, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", discussionId] });
    },
  });

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    sendMessageMutation.mutate(inputValue);
    setInputValue("");
  };

  if (!discussion) return <div>Discussion not found</div>;

  return (
    <div className="flex flex-col h-screen bg-background max-w-md mx-auto shadow-2xl border-x border-border/40">
      {/* Chat Header */}
      <header className="flex items-center justify-between p-3 bg-white/80 backdrop-blur-md border-b z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/mohalla">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full ${discussion.color} flex items-center justify-center overflow-hidden border border-border`}>
               <img src={discussion.avatar} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-sm font-bold font-heading leading-none">{discussion.title}</h1>
              <p className="text-[10px] text-green-600 font-bold mt-0.5">{discussion.participants} online</p>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <Phone size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <MoreVertical size={18} />
          </Button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-paper-pattern bg-fixed pb-20">
        <div className="text-center my-4">
          <span className="px-3 py-1 bg-muted/50 rounded-full text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            Today
          </span>
        </div>
        
        <AnimatePresence initial={false}>
          {messages.map((msg: any) => {
            const isMe = msg.userId === DEMO_USER_ID;
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm relative ${
                    isMe
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-white text-foreground rounded-tl-none border border-border/50"
                  }`}
                >
                  {!isMe && (
                    <p className="text-[10px] font-bold text-amber-700 mb-1">Other User</p>
                  )}
                  <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                  <p className={`text-[9px] text-right mt-1 opacity-70 ${isMe ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-border flex items-center gap-2 fixed bottom-0 w-full max-w-md z-20">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <span className="text-xl">😊</span>
        </Button>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type a message..."
          className="flex-1 rounded-full bg-secondary/30 border-transparent focus:border-primary/50 focus:ring-0"
        />
        <Button 
          onClick={handleSendMessage}
          size="icon" 
          className="rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform"
        >
          <Send size={18} className="ml-0.5" />
        </Button>
      </div>
    </div>
  );
}
