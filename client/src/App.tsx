import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Mohalla from "@/pages/Mohalla";
import Profile from "@/pages/Profile";
import ChatRoom from "@/pages/ChatRoom";
import LiveRoom from "@/pages/LiveRoom";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/mohalla" component={Mohalla} />
      <Route path="/profile" component={Profile} />
      <Route path="/chat/:id" component={ChatRoom} />
      <Route path="/live/:id" component={LiveRoom} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
