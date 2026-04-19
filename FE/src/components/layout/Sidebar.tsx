import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import { LayoutDashboard, WalletCards, Trophy, BookOpen, PiggyBank, Settings as SettingsIcon, CircleHelp, Plus } from 'lucide-react';
import logo from '../../assets/logo.png';

const Sidebar = () => {

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
          { to: "/quizzes", icon: <Trophy size={20} />, label: "Daily Quizzes" },
          { to: "/accounts", icon: <WalletCards size={20} />, label: "Accounts" },
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

        <div className="mt-8 flex flex-col gap-4">
          <Button
            type="primary"
            className="w-full !h-12 !bg-primary hover:!bg-primary-dark border-none !rounded-full font-semibold flex items-center justify-center gap-2 text-[15px] shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <Plus size={18} /> New Entry
          </Button>

          <div className="flex flex-col gap-1 mt-4">
            <NavLink
              to="/settings"
              className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 border border-transparent ${isActive ? 'bg-black/5 text-text' : 'text-text-muted hover:bg-black/5 hover:text-text'}`}
            >
              <SettingsIcon size={20} />
              <span>Settings</span>
            </NavLink>
            <NavLink
              to="/support"
              className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 border border-transparent ${isActive ? 'bg-black/5 text-text' : 'text-text-muted hover:bg-black/5 hover:text-text'}`}
            >
              <CircleHelp size={20} />
              <span>Support</span>
            </NavLink>
          </div>
        </div>
      </nav>


    </aside>
  );
};

export default Sidebar;
