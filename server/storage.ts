import { 
  type User, 
  type InsertUser,
  type FeedPost,
  type InsertFeedPost,
  type Discussion,
  type InsertDiscussion,
  type Message,
  type InsertMessage,
  users,
  feedPosts,
  discussions,
  messages,
  voiceChannels,
} from "@shared/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, desc } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStats(userId: string, stats: { chaiCount?: number; memeCount?: number }): Promise<void>;

  // Feed Posts
  getFeedPosts(limit?: number): Promise<FeedPost[]>;
  createFeedPost(post: InsertFeedPost): Promise<FeedPost>;
  likeFeedPost(postId: string): Promise<void>;

  // Discussions
  getDiscussions(): Promise<Discussion[]>;
  getDiscussion(id: string): Promise<Discussion | undefined>;
  createDiscussion(discussion: InsertDiscussion): Promise<Discussion>;

  // Messages
  getMessages(discussionId: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;

  // Voice Channels
  getVoiceChannels(): Promise<any[]>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUserStats(userId: string, stats: { chaiCount?: number; memeCount?: number }): Promise<void> {
    const updates: any = {};
    if (stats.chaiCount !== undefined) updates.chaiCount = stats.chaiCount;
    if (stats.memeCount !== undefined) updates.memeCount = stats.memeCount;
    
    await db.update(users).set(updates).where(eq(users.id, userId));
  }

  // Feed Posts
  async getFeedPosts(limit: number = 20): Promise<FeedPost[]> {
    return await db.select().from(feedPosts).orderBy(desc(feedPosts.createdAt)).limit(limit);
  }

  async createFeedPost(post: InsertFeedPost): Promise<FeedPost> {
    const [feedPost] = await db.insert(feedPosts).values(post).returning();
    return feedPost;
  }

  async likeFeedPost(postId: string): Promise<void> {
    const [post] = await db.select().from(feedPosts).where(eq(feedPosts.id, postId));
    if (post) {
      await db.update(feedPosts)
        .set({ likes: (post.likes || 0) + 1 })
        .where(eq(feedPosts.id, postId));
    }
  }

  // Discussions
  async getDiscussions(): Promise<Discussion[]> {
    return await db.select().from(discussions).orderBy(desc(discussions.createdAt));
  }

  async getDiscussion(id: string): Promise<Discussion | undefined> {
    const [discussion] = await db.select().from(discussions).where(eq(discussions.id, id));
    return discussion;
  }

  async createDiscussion(discussion: InsertDiscussion): Promise<Discussion> {
    const [newDiscussion] = await db.insert(discussions).values(discussion).returning();
    return newDiscussion;
  }

  // Messages
  async getMessages(discussionId: string): Promise<Message[]> {
    return await db.select().from(messages)
      .where(eq(messages.discussionId, discussionId))
      .orderBy(messages.createdAt);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }

  // Voice Channels
  async getVoiceChannels(): Promise<any[]> {
    return await db.select().from(voiceChannels);
  }
}

export const storage = new DatabaseStorage();
