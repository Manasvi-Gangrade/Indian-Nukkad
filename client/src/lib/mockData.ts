import { FeedItem } from "@/components/FeedCard";
import uncle from "@assets/generated_images/funny_indian_neighbor_uncle_caricature.png";
import auntie from "@assets/generated_images/funny_indian_neighbor_auntie_caricature.png";
import chai from "@assets/generated_images/steaming_chai_glass_illustration.png";

export const MOCK_FEED: FeedItem[] = [
  {
    id: "1",
    type: "meme",
    author: {
      name: "Sharma Ji Ka Beta",
      avatar: uncle,
      time: "2 mins ago",
    },
    content: {
      text: "When you finally convince your friends for a Goa trip but mom says 'Nani ke ghar jaana hai' 🥲",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop",
    },
    stats: {
      likes: 245,
      comments: 42,
      shares: 12,
    },
  },
  {
    id: "2",
    type: "poll",
    author: {
      name: "Nukkad Official",
      avatar: chai,
      time: "1 hour ago",
    },
    content: {
      text: "Aaj ka sabse bada sawal: Best evening snack? 🥟",
      options: ["Samosa with Green Chutney", "Poha Jalebi", "Kachori", "Maggi (Pahadi style)"],
    },
    stats: {
      likes: 892,
      comments: 156,
      shares: 45,
    },
  },
  {
    id: "3",
    type: "dialogue",
    author: {
      name: "Gossip Aunty",
      avatar: auntie,
      time: "3 hours ago",
    },
    content: {
      text: "Arre suno! 📢\n\nKal wale cricket match mein Gupta ji ne firse umpire se ladai ki. Kehte hain 'Wide thi!' jabki ball stumps uda ke gayi thi! 😂🏏",
    },
    stats: {
      likes: 567,
      comments: 89,
      shares: 23,
    },
  },
  {
    id: "4",
    type: "meme",
    author: {
      name: "Backbencher Rahul",
      avatar: uncle,
      time: "5 hours ago",
    },
    content: {
      text: "Me explaining to my boss why I'm late:\n'Sir, aaj auto wale ne shortcut liya, par wo longcut nikla' 🛺💨",
      image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=2076&auto=format&fit=crop",
    },
    stats: {
      likes: 1203,
      comments: 112,
      shares: 340,
    },
  },
];

export const DISCUSSIONS = [
  {
    id: 1,
    title: "Society Meeting: Pani kab aayega?",
    participants: 42,
    lastActive: "Now",
    avatar: uncle,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    title: "Cricket Match Screening Planning",
    participants: 18,
    lastActive: "5m ago",
    avatar: auntie,
    color: "bg-green-100 text-green-700",
  },
  {
    id: 3,
    title: "Best Momos in Palasia? 🥟",
    participants: 156,
    lastActive: "12m ago",
    avatar: uncle,
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: 4,
    title: "Late Night Maggi Gang",
    participants: 8,
    lastActive: "1h ago",
    avatar: auntie,
    color: "bg-purple-100 text-purple-700",
  },
];

export const VOICE_CHANNELS = [
  { id: 1, name: "Chai Pe Charcha ☕", listeners: 12 },
  { id: 2, name: "Antakshari League 🎵", listeners: 8 },
  { id: 3, name: "Ghost Stories 👻", listeners: 45 },
  { id: 4, name: "Match Commentary 🏏", listeners: 120 },
];
