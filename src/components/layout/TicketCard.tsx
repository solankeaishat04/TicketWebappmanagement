// src/components/layout/TicketCard.tsx
import React from "react";
import type { Ticket } from "../../services/useTicketService";

interface TicketCardProps {
  ticket: Ticket;
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticket: Ticket) => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, onEdit, onDelete }) => {
  const statusMap: Record<string, { label: string; className: string }> = {
    open: { label: "Open", className: "bg-green-100 text-green-800" },
    in_progress: { label: "In Progress", className: "bg-yellow-100 text-yellow-800" },
    closed: { label: "Closed", className: "bg-gray-100 text-gray-800" },
  };

  const status = statusMap[ticket.status] ?? statusMap.open;

  return (
    <article className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between" role="article" aria-labelledby={`ticket-${ticket.id}-title`}>
      <div>
        <h3 id={`ticket-${ticket.id}-title`} className="font-bold text-lg">{ticket.title}</h3>
        {ticket.description ? <p className="text-gray-600 text-sm mt-2">{ticket.description}</p> : <p className="text-gray-400 italic text-sm mt-2">No description</p>}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className={`px-2 py-1 rounded-full text-xs ${status.className}`}>{status.label}</span>

        <div className="flex items-center gap-3">
          <button onClick={() => onEdit(ticket)} className="text-indigo-600 hover:underline focus:outline-none" aria-label={`Edit ${ticket.title}`}>Edit</button>
          <button onClick={() => onDelete(ticket)} className="text-red-600 hover:underline focus:outline-none" aria-label={`Delete ${ticket.title}`}>Delete</button>
        </div>
      </div>
    </article>
  );
};
