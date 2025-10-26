/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { type Ticket, ticketService } from "../../services/useTicketService";
import { useToast } from "../../hooks/useToast";

interface TicketFormProps {
  onClose: () => void;
  onSave: (ticket: Ticket) => void;
  existing?: Ticket;
}

export const TicketForm: React.FC<TicketFormProps> = ({
  onClose,
  onSave,
  existing,
}) => {
  const { showToast, ToastComponent } = useToast();
  const [title, setTitle] = useState(existing?.title || "");
  const [description, setDescription] = useState(existing?.description || "");
  const [status, setStatus] = useState<"open" | "in_progress" | "closed">(
    existing?.status || "open"
  );
  const [errors, setErrors] = useState<{ title?: string; status?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (title.trim() === "") {
      setErrors((prev) => ({ ...prev, title: "Title is required" }));
    } else {
      setErrors((prev) => ({ ...prev, title: undefined }));
    }

    if (!["open", "in_progress", "closed"].includes(status)) {
      setErrors((prev) => ({ ...prev, status: "Invalid status selected" }));
    } else {
      setErrors((prev) => ({ ...prev, status: undefined }));
    }
  }, [title, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (errors.title || errors.status) {
      showToast({
        message: "Please fix the validation errors before submitting.",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let savedTicket: Ticket;
      if (existing) {
        const updated = await ticketService.updateTicket(existing.id, {
          title,
          description,
          status,
        });
        if (!updated) {
          showToast({ message: "Failed to update ticket.", type: "error" });
          return;
        }
        savedTicket = updated;
        showToast({ message: "Ticket updated successfully!", type: "success" });
      } else {
        const created = await ticketService.createTicket({
          title,
          description,
          status,
        });
        if (!created) {
          showToast({ message: "Failed to create ticket.", type: "error" });
          return;
        }
        savedTicket = created;
        showToast({ message: "Ticket created successfully!", type: "success" });
      }

      onSave(savedTicket);
      onClose();
    } catch (error: any) {
      showToast({
        message: error?.message || "Failed to save ticket. Please retry.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastComponent />
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-lg mx-auto"
      >
        <h2 className="text-xl font-semibold mb-2">
          {existing ? "Edit Ticket" : "Create Ticket"}
        </h2>

        <div>
          <label className="block mb-1 font-medium">Title *</label>
          <input
            className={`w-full border rounded px-3 py-2 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2 border-gray-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Status *</label>
          <select
            className={`w-full border rounded px-3 py-2 ${
              errors.status ? "border-red-500" : "border-gray-300"
            }`}
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status}</p>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </>
  );
};
