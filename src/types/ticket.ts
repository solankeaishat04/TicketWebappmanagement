// src/types/ticket.ts
export type TicketStatus = "open" | "in_progress" | "closed";

export interface Ticket {
  id: string; // unique
  title: string;
  description?: string;
  status: TicketStatus;
  priority?: string;
  createdAt: string;
}
