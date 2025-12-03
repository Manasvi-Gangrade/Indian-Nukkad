const API_BASE = "/api";

export async function fetchFeed() {
  const res = await fetch(`${API_BASE}/feed`);
  if (!res.ok) throw new Error("Failed to fetch feed");
  return res.json();
}

export async function likePost(postId: string) {
  const res = await fetch(`${API_BASE}/feed/${postId}/like`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to like post");
  return res.json();
}

export async function fetchDiscussions() {
  const res = await fetch(`${API_BASE}/discussions`);
  if (!res.ok) throw new Error("Failed to fetch discussions");
  return res.json();
}

export async function fetchMessages(discussionId: string) {
  const res = await fetch(`${API_BASE}/discussions/${discussionId}/messages`);
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}

export async function sendMessage(discussionId: string, userId: string, text: string) {
  const res = await fetch(`${API_BASE}/discussions/${discussionId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, text }),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}

export async function fetchVoiceChannels() {
  const res = await fetch(`${API_BASE}/voice-channels`);
  if (!res.ok) throw new Error("Failed to fetch voice channels");
  return res.json();
}
