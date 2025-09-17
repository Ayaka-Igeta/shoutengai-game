import { Routes, Route } from 'react-router-dom';
import ModernFinancialLiteracyGame from './ModernFinancialLiteracyGame';
import IconComparison from './components/IconComparison';
import Chokanzu from './Chokanzu';
import Urikai from './Urikai';
import FinancialLiteracyGame from './FinancialLiteracyGame';

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<ModernFinancialLiteracyGame />} />
      <Route path="/icons" element={<IconComparison />} />
      <Route path="/chokanzu" element={<Chokanzu />} />
      <Route path="/urikai" element={<Urikai />} />
      <Route path="/financial" element={<FinancialLiteracyGame />} />
    </Routes>
  );
}

export default AppRoute;