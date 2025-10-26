import React, { useEffect, useState } from "react";
import { StatCard } from "../components/cards/StatCard";
import { ticketService } from "../services/useTicketService";
import Footer from "../components/layout/Footer";

interface DashboardStats {
  total: number;
  open: number;
  closed: number;
  inProgress: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    open: 0,
    closed: 0,
    inProgress: 0,
  });
  const [toast, setToast] = useState<string | null>(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = user?.firstName || "User";

  const fetchStats = async () => {
    try {
      const tickets = await ticketService.getTickets();
      setStats({
        total: tickets.length,
        open: tickets.filter((t) => t.status === "open").length,
        closed: tickets.filter((t) => t.status === "closed").length,
        inProgress: tickets.filter((t) => t.status === "in_progress").length,
      });
    } catch {
      setToast("Failed to fetch ticket statistics.");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="overflow-hidden max-w-[1440px] mx-auto">
      <main className="flex-1 p-6 max-w-[1440px] mx-auto overflow-y-auto">
        {toast && (
          <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
            {toast}
          </div>
        )}

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Welcome, {firstName}
          </h1>
          <p className="text-gray-600 mt-1">
            Here is a summary of your tickets
          </p>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          <div className="w-full h-full">
            <StatCard title="Total Tickets" value={stats.total} />
          </div>
          <div className="w-full h-full">
            <StatCard
              title="Open Tickets"
              value={stats.open}
              change={{ type: "up", value: stats.open }}
            />
          </div>
          <div className="w-full h-full">
            <StatCard
              title="In Progress"
              value={stats.inProgress}
              change={{ type: "down", value: stats.inProgress }}
            />
          </div>
          <div className="w-full h-full">
            <StatCard
              title="Resolved Tickets"
              value={stats.closed}
              change={{ type: "up", value: stats.closed }}
            />
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
};

export default Dashboard;
