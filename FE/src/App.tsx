import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Debts from './pages/Debts';
import Savings from './pages/Savings';
import Leaderboard from './pages/Leaderboard';
import Scholar from './pages/Scholar';
import Login from './pages/Login';
import DailyQuizzes from './pages/DailyQuizzes';
import FinancialQuiz from './pages/FinancialQuiz';
import QuizComplete from './pages/QuizComplete';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="debts" element={<Debts />} />
          <Route path="savings" element={<Savings />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="scholar" element={<Scholar />} />
          <Route path="quizzes" element={<DailyQuizzes />} />
          <Route path="quiz/:id" element={<FinancialQuiz />} />
          <Route path="quiz/:id/complete" element={<QuizComplete />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
