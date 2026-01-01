import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyApplications from "./pages/MyApplications";
import MyEventRegistrations from "./pages/MyEventRegistrations";
import Sprints from "./pages/Sprints";
import SprintDetails from "./pages/SprintDetails";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageSprints from "./pages/admin/ManageSprints";
import ManageEvents from "./pages/admin/ManageEvents";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminEventRegistrations from "./pages/admin/AdminEventRegistrations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/sprints" element={<Sprints />} />
            <Route path="/sprints/:id" element={<SprintDetails />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            
            {/* Protected User Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/dashboard/applications" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} />
            <Route path="/dashboard/events" element={<ProtectedRoute><MyEventRegistrations /></ProtectedRoute>} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/sprints" element={<ProtectedRoute requireAdmin><ManageSprints /></ProtectedRoute>} />
            <Route path="/admin/events" element={<ProtectedRoute requireAdmin><ManageEvents /></ProtectedRoute>} />
            <Route path="/admin/applications" element={<ProtectedRoute requireAdmin><AdminApplications /></ProtectedRoute>} />
            <Route path="/admin/event-registrations" element={<ProtectedRoute requireAdmin><AdminEventRegistrations /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
