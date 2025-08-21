import { Routes, Route } from 'react-router-dom';
import Chokanzu from './Chokanzu';
import Urikai from './Urikai';
import FinancialLiteracyGame from './FinancialLiteracyGame';

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Chokanzu />} />
      <Route path="/urikai" element={<Urikai />} />
      <Route path="/financial" element={<FinancialLiteracyGame />} />
    </Routes>
  );
}

export default AppRoute;