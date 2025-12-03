import Layout from "@/components/Layout";
import Header from "@/components/Header";
import ChaiMeter from "@/components/ChaiMeter";
import FeedCard from "@/components/FeedCard";
import LoadingScreen from "@/components/LoadingScreen";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFeed } from "@/lib/api";
import uncle from "@assets/generated_images/funny_indian_neighbor_uncle_caricature.png";
import auntie from "@assets/generated_images/funny_indian_neighbor_auntie_caricature.png";
import chai from "@assets/generated_images/steaming_chai_glass_illustration.png";

const AVATARS = [uncle, auntie, chai];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { data: feedPosts, isLoading } = useQuery({
    queryKey: ["feed"],
    queryFn: fetchFeed,
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  const transformedFeed = feedPosts?.map((post: any, idx: number) => ({
    id: post.id,
    type: post.type,
    author: {
      name: ["Sharma Ji Ka Beta", "Nukkad Official", "Gossip Aunty", "Backbencher Rahul"][idx % 4],
      avatar: AVATARS[idx % AVATARS.length],
      time: new Date(post.createdAt).toLocaleDateString(),
    },
    content: {
      text: post.content,
      image: post.imageUrl,
      options: post.pollOptions,
    },
    stats: {
      likes: post.likes,
      comments: post.comments,
      shares: post.shares,
    },
  })) || [];

  return (
    <Layout>
      <Header />
      <div className="p-4 space-y-4">
        <ChaiMeter />
        
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading feed...</div>
        ) : (
          <div className="space-y-4">
            {transformedFeed.map((item: any) => (
              <FeedCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* End of Feed */}
        <div className="text-center py-8 text-muted-foreground text-sm font-medium">
          <p>Bas kar bhai, aur kitna scroll karega? 😴</p>
          <p className="text-xs mt-1">Go drink some chai!</p>
        </div>
      </div>
    </Layout>
  );
}
