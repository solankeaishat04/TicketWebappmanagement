import React, { useEffect, useState } from "react";
import { type Ticket, ticketService } from "../services/useTicketService";
import { TicketCard } from "../components/layout/TicketCard";
import { TicketForm } from "../components/layout/TicketForm";
import { useToast } from "../hooks/useToast";
import Footer from "../components/layout/Footer";

export const TicketManagement: React.FC = () => {
  const { showToast, ToastComponent } = useToast();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editTicket, setEditTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [ticketToDelete, setTicketToDelete] = useState<Ticket | null>(null);

  // Fetch tickets
  const fetchTickets = async () => {
    try {
      const data = await ticketService.getTickets();
      setTickets(data);
    } catch {
      showToast({ message: "Failed to load tickets. Please retry.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  },);

  // Save or update ticket
  const handleSave = (ticket: Ticket) => {
    setTickets((prev) => {
      const index = prev.findIndex((t) => t.id === ticket.id);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = ticket;
        showToast({ message: "Ticket updated successfully!", type: "success" });
        return updated;
      }
      showToast({ message: "Ticket created successfully!", type: "success" });
      return [ticket, ...prev];
    });
    setEditTicket(null);
    setShowForm(false);
  };

  // Delete ticket
  const confirmDelete = async () => {
    if (!ticketToDelete) return;
    try {
      await ticketService.deleteTicket(ticketToDelete.id);
      setTickets((prev) => prev.filter((t) => t.id !== ticketToDelete.id));
      showToast({ message: "Ticket deleted successfully.", type: "success" });
    } catch {
      showToast({ message: "Failed to delete ticket. Please retry.", type: "error" });
    } finally {
      setTicketToDelete(null);
    }
  };

  return (
    <div className=" flex flex-col min-h-screen max-w-[1440px] mx-auto bg-gray-50">
      <main className="flex-1 p-6 overflow-y-auto">
        <ToastComponent />

        {/* Header */}
        <header className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"> <h1 className="text-2xl sm:text-3xl font-bold">Ticket Management</h1> <div className="self-start sm:self-auto"> <button onClick={() => { setShowForm(true); setEditTicket(null); }} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800 w-auto" > New Ticket </button> </div> </header>

        {/* Tickets List */}
        {loading ? (
          <p>Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p className="text-gray-500">No tickets yet. Create one!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onEdit={(t) => { setEditTicket(t); setShowForm(true); }}
                onDelete={() => setTicketToDelete(ticket)}
              />
            ))}
          </div>
        )}

        {/* Ticket Form Modal */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <TicketForm
                existing={editTicket || undefined}
                onSave={handleSave}
                onClose={() => setShowForm(false)}
              />
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {ticketToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full text-center">
              <p className="mb-4 text-lg font-semibold">
                Are you sure you want to delete this ticket?
              </p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={confirmDelete}
                  className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => setTicketToDelete(null)}
                  className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer/>
    </div>
  );
};
