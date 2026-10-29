import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import LandingPage from '@/pages/LandingPage';
import AboutPage from '@/pages/AboutPage';
import PartnershipPage from '@/pages/PartnershipPage';
import RegisterPage from '@/pages/RegisterPage';
import RegisterPathwayPage from '@/pages/RegisterPathwayPage';
import TicketPage from '@/pages/TicketPage';
import BuyStandPage from '@/pages/BuyStandPage';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/register/:pathwaySlug" component={RegisterPathwayPage} />
        <Route path="/partnership" component={PartnershipPage} />
        <Route path="/tickets" component={TicketPage} />
        <Route path="/buy-a-stand" component={BuyStandPage} />
        <Route path="/not-found" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
