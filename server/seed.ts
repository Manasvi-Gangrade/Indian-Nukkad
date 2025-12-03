import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { users, feedPosts, discussions, voiceChannels } from "@shared/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
  console.log("Seeding database...");

  // Create demo user
  const [user] = await db.insert(users).values({
    username: "demo_user",
    password: "demo123",
    displayName: "Raju from Bombay",
    location: "Indore, Palasia",
    chaiCount: 142,
    memeCount: 56,
    rating: 48,
  }).returning();

  console.log("Created user:", user.displayName);

  // Create voice channels
  await db.insert(voiceChannels).values([
    { name: "Chai Pe Charcha ☕", listeners: 12 },
    { name: "Antakshari League 🎵", listeners: 8 },
    { name: "Ghost Stories 👻", listeners: 45 },
    { name: "Match Commentary 🏏", listeners: 120 },
  ]);

  console.log("Created voice channels");

  // Create discussions
  const [disc1] = await db.insert(discussions).values({
    title: "Society Meeting: Pani kab aayega?",
    createdBy: user.id,
    participants: 42,
    color: "bg-blue-100 text-blue-700",
  }).returning();

  await db.insert(discussions).values([
    {
      title: "Cricket Match Screening Planning",
      createdBy: user.id,
      participants: 18,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Best Momos in Palasia? 🥟",
      createdBy: user.id,
      participants: 156,
      color: "bg-orange-100 text-orange-700",
    },
    {
      title: "Late Night Maggi Gang",
      createdBy: user.id,
      participants: 8,
      color: "bg-purple-100 text-purple-700",
    },
  ]);

  console.log("Created discussions");

  // Create feed posts
  await db.insert(feedPosts).values([
    {
      userId: user.id,
      type: "meme",
      content: "When you finally convince your friends for a Goa trip but mom says 'Nani ke ghar jaana hai' 🥲",
      imageUrl: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop",
      likes: 245,
      comments: 42,
      shares: 12,
    },
    {
      userId: user.id,
      type: "poll",
      content: "Aaj ka sabse bada sawal: Best evening snack? 🥟",
      pollOptions: ["Samosa with Green Chutney", "Poha Jalebi", "Kachori", "Maggi (Pahadi style)"],
      likes: 892,
      comments: 156,
      shares: 45,
    },
    {
      userId: user.id,
      type: "dialogue",
      content: "Arre suno! 📢\n\nKal wale cricket match mein Gupta ji ne firse umpire se ladai ki. Kehte hain 'Wide thi!' jabki ball stumps uda ke gayi thi! 😂🏏",
      likes: 567,
      comments: 89,
      shares: 23,
    },
    {
      userId: user.id,
      type: "meme",
      content: "Me explaining to my boss why I'm late:\n'Sir, aaj auto wale ne shortcut liya, par wo longcut nikla' 🛺💨",
      imageUrl: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=2076&auto=format&fit=crop",
      likes: 1203,
      comments: 112,
      shares: 340,
    },
  ]);

  console.log("Created feed posts");
  console.log("Seeding complete!");
}

seed().catch(console.error);
