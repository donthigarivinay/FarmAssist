import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderTracking from "./pages/OrderTracking";
import DealerDashboard from "./pages/DealerDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import Profile from "./pages/Profile";

import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Added
import { CartProvider } from "@/context/CartContext"; // ✅ Added

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider> {/* ✅ Wrap the app with CartProvider */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/order-tracking" element={<OrderTracking />} />

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={['dealer','deliveryAgent','farmer']}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dealer-dashboard"
              element={
                <ProtectedRoute allowedRoles={['dealer']}>
                  <DealerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/delivery-dashboard"
              element={
                <ProtectedRoute allowedRoles={['deliveryAgent']}>
                  <DeliveryDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/categories" element={<Categories />} />
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
