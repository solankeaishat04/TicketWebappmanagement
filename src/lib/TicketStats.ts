// src/utils/ticketStats.ts
// src/utils/ticketStats.ts
import type { Ticket } from "../types/ticket";

export const getTicketStats = (tickets: Ticket[]) => ({
  total: tickets.length,
  open: tickets.filter(t => t.status === "open").length,
  resolved: tickets.filter(t => t.status === "closed").length,
});
