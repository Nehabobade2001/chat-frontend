import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Home } from "lucide-react";
import Aboute from "./pages/Aboute";
import Homedata from "./pages/Homedata";
import Loves from "./pages/Loves";
import SignUpPage from "./auth/SignUpPage";
import Prompt from "./pages/Prompt";
import Support from "./pages/Support";
import ChatWindo from "./pages/Chatwindo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>

          <Route path='/signup' element={<SignUpPage/>} />
          <Route path="/" element={<Homedata />} />
          <Route path="/prompt"element={<Prompt/>}  />
          <Route path="/support" element={<Support/>}/>
          <Route path="/preview" element={<ChatWindo/>}/>
          <Route path="/loves" element={<Loves/>}/>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


//AIzaSyAEgwe_Cczqgv0vV1aeanUmaZN0ilksobw


