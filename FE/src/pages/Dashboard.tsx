import { CreditCard, TrendingUp, Search, Filter } from 'lucide-react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Transaction {
  key: string;
  title: string;
  cat: string;
  date: string;
  amount: string;
  type: string;
}

import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user);

  const columns: ColumnsType<Transaction> = [
    {
      title: 'TRANSACTION',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <div className="font-semibold text-text text-sm">{text}</div>,
    },
    {
      title: 'CATEGORY',
      dataIndex: 'cat',
      key: 'cat',
      responsive: ['md'],
      render: (text) => <span className="text-xs px-2 py-1 rounded-full bg-black/5 text-text-muted">{text}</span>,
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      key: 'date',
      responsive: ['sm'],
      render: (text) => <span className="text-sm text-text-muted">{text}</span>,
    },
    {
      title: 'AMOUNT',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (text, record) => (
        <span className={`font-semibold text-sm ${record.type === 'income' ? 'text-success' : 'text-text'}`}>
          {text}
        </span>
      ),
    },
  ];

  const dataSource: Transaction[] = [
    { key: '1', title: "Whole Foods Market", cat: "Groceries", date: "Oct 24, 2026", amount: "-$142.50", type: 'expense' },
    { key: '2', title: "TechCorp Salary", cat: "Income", date: "Oct 22, 2026", amount: "+$4,200.00", type: 'income' },
    { key: '3', title: "Netflix Subscription", cat: "Entertainment", date: "Oct 21, 2026", amount: "-$15.99", type: 'expense' },
    { key: '4', title: "Uber Rides", cat: "Transport", date: "Oct 20, 2026", amount: "-$24.00", type: 'expense' },
  ];

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Portfolio & Chart */}
        <div className="lg:col-span-2 flex flex-col gap-8">

          <div className="bg-gradient-to-br from-primary-dark to-primary text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="relative z-10">
              <span className="text-xs font-semibold tracking-wider text-white/80 uppercase">Current Portfolio</span>
              <h1 className="text-5xl font-heading mt-2 font-medium tracking-tight">$42,850.00</h1>

              <div className="flex items-center gap-2 mt-6">
                <div className="flex items-center gap-1 text-xs font-bold bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                  <TrendingUp size={14} /> +2.4%
                </div>
                <span className="text-sm text-white/80">vs last month</span>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl bg-white/60">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-heading text-primary-dark">Ledger Activity</h3>
              <div className="flex items-center gap-2">
                <Button type="text" shape="circle" icon={<Search size={16} />} className="text-text-muted hover:!bg-black/10 !border-none" />
                <Button type="text" shape="circle" icon={<Filter size={16} />} className="text-text-muted hover:!bg-black/10 !border-none" />
              </div>
            </div>

            <div className="overflow-x-auto">
              {/* Thay thế Table HTML gốc bàng Ant Design Table */}
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                rowKey="key"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Upcoming Bills & Goals */}
        <div className="flex flex-col gap-6">
          <div className="glass p-6 rounded-2xl bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-heading text-primary-dark">Upcoming Bills</h3>
              <Button type="link" className="!p-0 text-primary hover:underline font-semibold font-sans">View All</Button>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { name: "Rent Payment", due: "Due in 3 days", amount: "$2,400.00", icon: <CreditCard size={18} className="text-primary" />, bg: 'bg-primary/10' },
                { name: "Car Insurance", due: "Due in 5 days", amount: "$185.00", icon: <CreditCard size={18} className="text-warning" />, bg: 'bg-warning/10' },
                { name: "Gym Membership", due: "Due in 12 days", amount: "$65.00", icon: <CreditCard size={18} className="text-text-muted" />, bg: 'bg-black/5' },
              ].map((bill, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-black/5 hover:shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${bill.bg}`}>
                    {bill.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-text">{bill.name}</h4>
                    <p className="text-xs text-text-muted mt-0.5">{bill.due}</p>
                  </div>
                  <div className="font-heading font-medium text-text">{bill.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
