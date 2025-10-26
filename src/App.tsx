import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard";
import { TicketManagement } from "./pages/TicketManagement";
import PublicRoute from "./routes/PublicRoutes";
import ProtectedRoute from "./components/ProtectedRoute";
import { TopNav } from "./components/layout/TopNav";
import { mockAuthAPI } from "./services/useMockAuth";

mockAuthAPI.ensureSeeded();

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Landing />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        {/* Protected Routes with Sidebar / TopNav */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="flex flex-col md:flex-row  bg-gray-50">
                {/* TopNav for mobile */}
                <TopNav />
                {/* Main content */}
                <main className="flex-1 ">
                  <Dashboard />
                </main>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
               
                <TopNav />
              
                <main className="flex-1">
                  <TicketManagement />
                </main>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
