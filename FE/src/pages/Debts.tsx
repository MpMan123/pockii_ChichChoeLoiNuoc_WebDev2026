import { Home, Zap, CreditCard, ChevronRight } from 'lucide-react';
import { Button, Input, Select, DatePicker, InputNumber } from 'antd';

const Debts = () => {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass bg-white/60 p-6 rounded-2xl flex flex-col gap-2">
              <span className="text-xs font-semibold text-text-muted tracking-wide uppercase">TOTAL DEBT</span>
              <h3 className="text-3xl font-heading tracking-tight text-text">$142,850.00</h3>
            </div>
            <div className="glass bg-white/60 p-6 rounded-2xl flex flex-col gap-2">
              <span className="text-xs font-semibold text-text-muted tracking-wide uppercase">UPCOMING (30D)</span>
              <h3 className="text-3xl font-heading tracking-tight text-warning">$1,240.32</h3>
            </div>
            <div className="glass bg-white/60 p-6 rounded-2xl flex flex-col gap-2">
              <span className="text-xs font-semibold text-text-muted tracking-wide uppercase">AVERAGE APR</span>
              <h3 className="text-3xl font-heading tracking-tight text-success">4.2%</h3>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-heading text-primary-dark">Upcoming Bills</h3>
              <Button type="link" className="!p-0 text-text-muted hover:text-primary !h-auto">Sort by Priority</Button>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { name: "Mortgage Payment", info: "Due in 5 days • Chase Bank", amount: "$2,450.00", icon: <Home size={24} className="text-primary" />, bg: 'bg-primary/10', priority: 'High Priority', btn: 'primary' },
                { name: "Utility Bill", info: "Due in 12 days • City Electric", amount: "$184.20", icon: <Zap size={24} className="text-warning" />, bg: 'bg-warning/10', priority: 'Standard', btn: 'default' },
                { name: "Visa Gold Credit", info: "Due in 15 days • Minimum payment", amount: "$350.00", icon: <CreditCard size={24} className="text-danger" />, bg: 'bg-danger/10', priority: 'High Priority', btn: 'default' }
              ].map((debt, i) => (
                <div key={i} className="glass bg-white flex flex-col sm:flex-row items-start sm:items-center p-5 rounded-2xl gap-5 hover:-translate-y-0.5 hover:shadow-md transition-all">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${debt.bg}`}>
                    {debt.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-text">{debt.name}</h4>
                    <p className="text-sm text-text-muted mt-1">{debt.info}</p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1 shrink-0">
                    <h4 className="text-lg font-bold text-text">{debt.amount}</h4>
                    <span className={`badge ${debt.priority === 'High Priority' ? 'badge-warning' : ''}`}>{debt.priority}</span>
                  </div>
                  <Button 
                    type={debt.btn as "primary" | "default"} 
                    className={`mt-4 sm:mt-0 font-semibold w-full sm:w-auto h-10 px-6 rounded-xl ${debt.btn === 'primary' ? 'bg-primary hover:!bg-primary-dark border-none shadow-sm' : 'border-[#E2E8F0] hover:!border-primary hover:!text-primary'}`}
                  >
                    Pay Now
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="glass p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-primary/5 to-transparent">
                <div>
                  <h3 className="mb-2 text-lg font-heading text-primary-dark">Your path to freedom</h3>
                  <p className="text-muted text-sm max-w-md">Paying an extra $50/mo towards your Visa Gold Credit will make you debt-free 4 months earlier. Pockii recommends this adjustment.</p>
                </div>
                <Button type="primary" className="shrink-0 h-10 px-6 rounded-xl font-semibold bg-primary hover:!bg-primary-dark border-none shadow-sm flex items-center gap-2">
                  Apply Strategy <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="glass bg-white p-6 sm:p-8 rounded-3xl sticky top-8">
            <h3 className="mb-6 text-xl font-heading text-primary-dark">Add New Debt</h3>

            <div className="mb-5 flex flex-col gap-2">
              <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">DEBT LABEL</label>
              <Input 
                size="large"
                className="bg-black/5 hover:bg-white focus:bg-white border-[#E2E8F0] rounded-xl text-sm transition-all" 
                placeholder="e.g. Student Loan" 
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-5">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">AMOUNT</label>
                <InputNumber 
                  size="large"
                  prefix="$"
                  className="w-full bg-black/5 hover:bg-white focus:bg-white border-[#E2E8F0] rounded-xl text-sm transition-all" 
                  placeholder="0.00" 
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">INTEREST %</label>
                 <InputNumber 
                  size="large"
                  suffix="%"
                  className="w-full bg-black/5 hover:bg-white focus:bg-white border-[#E2E8F0] rounded-xl text-sm transition-all" 
                  placeholder="0.0" 
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-5">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">DUE DATE</label>
                <DatePicker 
                  size="large"
                  className="w-full bg-black/5 hover:bg-white focus:bg-white border-[#E2E8F0] rounded-xl text-sm transition-all" 
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">PRIORITY</label>
                <Select 
                  size="large"
                  defaultValue="Standard"
                  options={[
                    { value: 'Standard', label: 'Standard' },
                    { value: 'High', label: 'High Priority' }
                  ]}
                  className="w-full"
                  popupClassName="rounded-xl"
                />
              </div>
            </div>

            <Button 
                type="primary" 
                className="w-full h-12 mt-4 text-[15px] font-bold rounded-xl bg-primary hover:!bg-primary-dark border-none shadow-sm transition-transform hover:-translate-y-px"
            >
                Record Debt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debts;
