// src/services/useTicketService.ts
export type TicketStatus = "open" | "in_progress" | "closed";

export interface Ticket {
  id: string;
  title: string;
  description?: string;
  status: TicketStatus;
  createdAt: string; // ISO
  updatedAt?: string; // ISO
  priority?: "low" | "medium" | "high";
}

const STORAGE_KEY = "ticketapp_tickets";
const DELAY_MS = 400;

const wait = (ms = DELAY_MS) => new Promise((res) => setTimeout(res, ms));

function load(): Ticket[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as Ticket[] : [];
  } catch {
    return [];
  }
}

function save(tickets: Ticket[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

function ensureSeeded() {
  const t = load();
  if (t.length === 0) {
    const now = new Date().toISOString();
    const seed: Ticket[] = [
      {
        id: String(Date.now()),
        title: "Welcome to TicketMaster",
        description: "This is a demo ticket. Edit or delete it.",
        status: "open",
        createdAt: now,
        updatedAt: now,
        priority: "low",
      },
      {
        id: String(Date.now() + 1),
        title: "Bug: cannot send email",
        description: "User reports email sending fails intermittently.",
        status: "in_progress",
        createdAt: now,
        updatedAt: now,
        priority: "high",
      },
      {
        id: String(Date.now() + 2),
        title: "Request: add export feature",
        description: "Add CSV export for ticket list.",
        status: "closed",
        createdAt: now,
        updatedAt: now,
        priority: "medium",
      },
    ];
    save(seed);
  }
}

ensureSeeded();

export const ticketService = {
  async getTickets(): Promise<Ticket[]> {
    await wait();
    return load().sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  },

  async getTicket(id: string): Promise<Ticket | undefined> {
    await wait();
    return load().find((t) => t.id === id);
  },

  async createTicket(payload: { title: string; description?: string; status?: TicketStatus; priority?: Ticket["priority"] }): Promise<Ticket> {
    await wait();
    const { title, description = "", status = "open", priority } = payload;
    if (!title || !title.trim()) throw new Error("Title is required.");
    if (!["open", "in_progress", "closed"].includes(status)) throw new Error("Invalid status.");
    const now = new Date().toISOString();
    const ticket: Ticket = {
      id: String(Date.now()) + "-" + Math.random().toString(36).slice(2, 9),
      title: title.trim(),
      description: description.trim(),
      status,
      createdAt: now,
      updatedAt: now,
      priority,
    };
    const all = load();
    all.unshift(ticket);
    save(all);
    return ticket;
  },

  async updateTicket(id: string, payload: { title?: string; description?: string; status?: TicketStatus; priority?: Ticket["priority"] }): Promise<Ticket | null> {
    await wait();
    const all = load();
    const idx = all.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error("Ticket not found.");
    const existing = all[idx];
    if (payload.title !== undefined && !payload.title.trim()) throw new Error("Title is required.");
    if (payload.status !== undefined && !["open", "in_progress", "closed"].includes(payload.status)) throw new Error("Invalid status.");
    const updated: Ticket = {
      ...existing,
      title: payload.title !== undefined ? payload.title.trim() : existing.title,
      description: payload.description !== undefined ? payload.description.trim() : existing.description,
      status: payload.status ?? existing.status,
      updatedAt: new Date().toISOString(),
      priority: payload.priority ?? existing.priority,
    };
    all[idx] = updated;
    save(all);
    return updated;
  },

  async deleteTicket(id: string): Promise<void> {
    await wait();
    const all = load();
    save(all.filter((t) => t.id !== id));
  },

  // helper for tests / dev
  async clearAll(): Promise<void> {
    await wait();
    save([]);
  },
};
