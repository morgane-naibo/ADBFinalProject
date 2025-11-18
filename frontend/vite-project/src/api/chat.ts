import { fetchAPI } from "./api";
import type { ChatConversation } from "../types/models";

export async function getConversations(role: "doctor" | "patient"): Promise<ChatConversation[]> {
  return fetchAPI(`/chat/${role}`);
}

export async function sendMessage(chatId: string, text: string): Promise<void> {
  return fetchAPI(`/chat/${chatId}/message`, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}
