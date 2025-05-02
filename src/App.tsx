
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MockDataProvider } from "@/context/MockDataContext";
import { TenantProvider } from "@/context/TenantContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MembersPage from "./pages/admin/MembersPage";
import PaymentsPage from "./pages/admin/PaymentsPage";
import AdvancedAnalyticsPage from "./pages/admin/AdvancedAnalyticsPage";
import WhatsAppPage from "./pages/admin/WhatsAppPage";
import Settings from "./pages/admin/Settings";
import MemberDashboard from "./pages/member/MemberDashboard";
import CheckIn from "./pages/member/CheckIn";
import Workout from "./pages/member/Workout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TenantProvider>
      <MockDataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/members" element={<MembersPage />} />
              <Route path="/admin/payments" element={<PaymentsPage />} />
              <Route path="/admin/analytics" element={<AdvancedAnalyticsPage />} />
              <Route path="/admin/whatsapp" element={<WhatsAppPage />} />
              <Route path="/admin/settings" element={<Settings />} />
              <Route path="/member/dashboard" element={<MemberDashboard />} />
              <Route path="/member/check-in" element={<CheckIn />} />
              <Route path="/member/workout" element={<Workout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </MockDataProvider>
    </TenantProvider>
  </QueryClientProvider>
);

export default App;
