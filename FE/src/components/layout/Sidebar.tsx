import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Avatar } from 'antd';
import { LayoutDashboard, WalletCards, PiggyBank, Trophy, BookOpen, LogOut } from 'lucide-react';
import logo from '../../assets/logo.png';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../services/auth.service';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  const handleLogout = async () => {
      await logout();
      logoutUser();
      navigate('/login');
  };

  return (
    <aside className="w-64 max-w-[250px] border-r border-[#E2E8F0] shadow-sm flex flex-col justify-between py-8 px-6 bg-bg z-20 shrink-0">
      <div className="flex items-center gap-3 mb-10 pl-2">
        <img src={logo} alt="Logo" className="w-14 h-14 rounded-2xl mb-4" />
        <div>
          <h1 className="text-xl font-heading text-primary-dark tracking-[-0.5px] font-bold">Pockii</h1>
          <p className="text-xs text-text-muted mt-0.5">The Serene Ledger</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {[
          { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
          { to: "/debts", icon: <WalletCards size={20} />, label: "Debts" },
          { to: "/savings", icon: <PiggyBank size={20} />, label: "Savings" },
          { to: "/leaderboard", icon: <Trophy size={20} />, label: "Leaderboard" },
          { to: "/scholar", icon: <BookOpen size={20} />, label: "Scholar" },
          { to: "/quizzes", icon: <Trophy size={20} />, label: "Daily Quizzes" }
        ].map((item, idx) => (
          <NavLink
            key={idx}
            to={item.to}
            className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 border border-transparent ${isActive ? 'bg-primary text-white shadow-md transform scale-[1.02]' : 'text-text-muted hover:bg-black/5 hover:text-text'}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar src="https://i.pravatar.cc/150?img=1" size={40} className="border-2 border-accent-gold shadow-sm" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-text truncate max-w-[100px]">{user?.name || user?.email?.split('@')[0] || 'Guest'}</span>
            <span className="text-xs font-semibold text-accent-gold">Bronze II</span>
          </div>
        </div>
        <Button
          type="text"
          className="text-text-muted hover:!text-danger hover:!bg-danger/10 p-2 rounded-lg transition-all duration-150 flex items-center justify-center h-auto w-auto"
          onClick={handleLogout}
          icon={<LogOut size={18} />}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
