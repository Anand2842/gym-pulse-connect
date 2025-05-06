
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MockDataProvider } from "@/context/MockDataContext";
import { TenantProvider } from "@/context/TenantContext";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/auth/SignUp";
import ResetPassword from "./pages/auth/ResetPassword";
import UpdatePassword from "./pages/auth/UpdatePassword";
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
      <AuthProvider>
        <MockDataProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/update-password" element={<UpdatePassword />} />
                
                {/* Protected Admin Routes */}
                <Route element={<ProtectedRoute requiredRole="admin" />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/members" element={<MembersPage />} />
                  <Route path="/admin/payments" element={<PaymentsPage />} />
                  <Route path="/admin/analytics" element={<AdvancedAnalyticsPage />} />
                  <Route path="/admin/whatsapp" element={<WhatsAppPage />} />
                  <Route path="/admin/settings" element={<Settings />} />
                </Route>
                
                {/* Protected Member Routes */}
                <Route element={<ProtectedRoute requiredRole="member" />}>
                  <Route path="/member/dashboard" element={<MemberDashboard />} />
                  <Route path="/member/check-in" element={<CheckIn />} />
                  <Route path="/member/workout" element={<Workout />} />
                </Route>
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </MockDataProvider>
      </AuthProvider>
    </TenantProvider>
  </QueryClientProvider>
);

export default App;
