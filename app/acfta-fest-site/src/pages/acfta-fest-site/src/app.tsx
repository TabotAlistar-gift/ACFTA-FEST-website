import { Route, Switch } from 'wouter';
import RegisterPage from './pages/RegisterPage';
import PartnershipPage from './pages/PartnershipPage';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={RegisterPage} />
      <Route path="/partnership" component={PartnershipPage} />
    </Switch>
  );
}