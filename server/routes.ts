import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFeedPostSchema, insertMessageSchema, insertDiscussionSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Feed Posts
  app.get("/api/feed", async (req, res) => {
    try {
      const posts = await storage.getFeedPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch feed" });
    }
  });

  app.post("/api/feed", async (req, res) => {
    try {
      const validatedData = insertFeedPostSchema.parse(req.body);
      const post = await storage.createFeedPost(validatedData);
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: "Invalid post data" });
    }
  });

  app.post("/api/feed/:id/like", async (req, res) => {
    try {
      await storage.likeFeedPost(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to like post" });
    }
  });

  // Discussions
  app.get("/api/discussions", async (req, res) => {
    try {
      const discussions = await storage.getDiscussions();
      res.json(discussions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch discussions" });
    }
  });

  app.post("/api/discussions", async (req, res) => {
    try {
      const validatedData = insertDiscussionSchema.parse(req.body);
      const discussion = await storage.createDiscussion(validatedData);
      res.json(discussion);
    } catch (error) {
      res.status(400).json({ error: "Invalid discussion data" });
    }
  });

  app.get("/api/discussions/:id", async (req, res) => {
    try {
      const discussion = await storage.getDiscussion(req.params.id);
      if (!discussion) {
        return res.status(404).json({ error: "Discussion not found" });
      }
      res.json(discussion);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch discussion" });
    }
  });

  // Messages
  app.get("/api/discussions/:id/messages", async (req, res) => {
    try {
      const messages = await storage.getMessages(req.params.id);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/discussions/:id/messages", async (req, res) => {
    try {
      const validatedData = insertMessageSchema.parse({
        ...req.body,
        discussionId: req.params.id,
      });
      const message = await storage.createMessage(validatedData);
      res.json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  // Voice Channels
  app.get("/api/voice-channels", async (req, res) => {
    try {
      const channels = await storage.getVoiceChannels();
      res.json(channels);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch voice channels" });
    }
  });

  return httpServer;
}
