import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAuth } from "./_core/hooks/useAuth";
import Home from "./pages/Home";
import PredictionPage from "./pages/PredictionPage";
import DashboardPage from "./pages/DashboardPage";
import AdvisorPage from "./pages/AdvisorPage";
import CalculatorPage from "./pages/CalculatorPage";
import ComparisonPage from "./pages/ComparisonPage";
import MapPage from "./pages/MapPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function Router() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/predict"} component={PredictionPage} />
      <Route path={"/analytics"} component={DashboardPage} />
      <Route path={"/advisor"} component={AdvisorPage} />
      <Route path={"/calculator"} component={CalculatorPage} />
      <Route path={"/compare"} component={ComparisonPage} />
      <Route path={"/map"} component={MapPage} />
      <Route path={"/recommendations"} component={RecommendationsPage} />
      <Route path={"/dashboard"} component={UserDashboard} />
      {isAdmin && <Route path={"/admin"} component={AdminDashboard} />}
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
