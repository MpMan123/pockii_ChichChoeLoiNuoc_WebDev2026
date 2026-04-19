import { Target, ArrowRight, ShieldCheck, Plus, Sparkles } from 'lucide-react';
import { Button, Progress } from 'antd';

const Savings = () => {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading text-primary-dark tracking-tight">Savings Goals</h2>
          <p className="text-sm text-text-muted mt-1">Secure your future. Track your milestones and watch your wealth grow.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Main Total Saved */}
          <div className="bg-primary rounded-[2rem] p-8 md:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                 <span className="text-xs font-semibold text-white/80 tracking-wider uppercase">TOTAL SAVED TOWARDS GOALS</span>
                 <h2 className="text-5xl font-heading text-white mt-3 font-medium tracking-tight">$24,850.00</h2>
                 <div className="flex items-center gap-2 mt-5">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white/20 text-white backdrop-blur-sm shadow-sm">
                       <ShieldCheck size={14} className="mr-1.5" /> On track with emergency fund
                    </span>
                 </div>
              </div>
              <div className="shrink-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md animate-pulse">
                   <Target size={48} className="text-white opacity-80" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2">
            <h3 className="text-lg font-heading text-primary-dark mb-4">Active Milestones</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Goal 1 */}
              <div className="glass bg-white p-8 rounded-3xl flex flex-col items-center text-center gap-6 hover:-translate-y-1 hover:shadow-md transition-all">
                <div className="relative flex items-center justify-center">
                   <Progress 
                      type="circle" 
                      percent={65} 
                      strokeColor="var(--color-primary)" 
                      trailColor="#F1F5F9" 
                      strokeWidth={8}
                      size={128} 
                      format={(percent) => <span className="text-2xl font-bold font-heading text-text">{percent}%</span>} 
                   />
                </div>
                <div className="w-full flex flex-col items-center">
                   <h4 className="text-xl font-semibold text-text">New Car</h4>
                   <p className="text-text-muted text-sm mt-1 mb-5 font-medium">$13,000 / $20,000</p>
                   <div className="flex items-center justify-between w-full pt-4 border-t border-black/5">
                      <span className="text-sm font-bold text-success">+ $50 this week</span>
                      <Button type="primary" className="px-3 py-1.5 text-sm rounded-lg bg-primary hover:!bg-primary-dark border-none font-semibold shadow-sm">Add Funds</Button>
                   </div>
                </div>
              </div>

              {/* Goal 2 */}
              <div className="glass bg-white p-8 rounded-3xl flex flex-col items-center text-center gap-6 hover:-translate-y-1 hover:shadow-md transition-all">
                <div className="relative flex items-center justify-center">
                   <Progress 
                      type="circle" 
                      percent={90} 
                      strokeColor="var(--color-accent-gold)" 
                      trailColor="#F1F5F9" 
                      strokeWidth={8}
                      size={128} 
                      format={(percent) => <span className="text-2xl font-bold font-heading text-text">{percent}%</span>} 
                   />
                </div>
                <div className="w-full flex flex-col items-center">
                   <h4 className="text-xl font-semibold text-text">Emergency Fund</h4>
                   <p className="text-text-muted text-sm mt-1 mb-5 font-medium">$9,000 / $10,000</p>
                   <div className="flex items-center justify-between w-full pt-4 border-t border-black/5">
                      <span className="text-sm font-bold text-success">+ $100 this week</span>
                      <Button type="primary" className="px-3 py-1.5 text-sm rounded-lg bg-primary hover:!bg-primary-dark border-none font-semibold shadow-sm">Add Funds</Button>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
             <h3 className="text-lg font-heading text-primary-dark mb-4">Recent Contributions</h3>
             <div className="glass bg-white p-6 rounded-2xl flex flex-col">
                 <div className="flex items-center gap-4 py-4 hover:bg-black/5 px-2 rounded-xl transition-colors cursor-pointer">
                     <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0"><Sparkles size={20}/></div>
                     <div className="flex-1">
                        <strong className="block text-sm text-text">New Car Contribution</strong>
                        <span className="text-xs font-medium text-text-muted">Yesterday, 10:20 AM</span>
                     </div>
                     <div className="font-bold text-success text-lg">+$150.00</div>
                 </div>
                 <div className="h-px bg-black/5 w-full my-1"></div>
                 <div className="flex items-center gap-4 py-4 hover:bg-black/5 px-2 rounded-xl transition-colors cursor-pointer">
                     <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0"><Sparkles size={20}/></div>
                     <div className="flex-1">
                        <strong className="block text-sm text-text">Emergency Fund Boost</strong>
                        <span className="text-xs font-medium text-text-muted">Oct 12, 14:00 PM</span>
                     </div>
                     <div className="font-bold text-success text-lg">+$300.00</div>
                 </div>
             </div>
          </div>

        </div>

        <div>
          <div className="glass bg-white p-8 text-center rounded-[2rem] sticky top-8 hover:shadow-md transition-shadow">
             <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-6 text-primary">
                <Plus size={36} />
             </div>
             <h3 className="text-xl font-heading text-primary-dark">New Goal</h3>
             <p className="text-sm font-medium text-text-muted mt-3 mb-8 leading-relaxed">Create a new milestone to save up for your next big adventure or purchase.</p>
             <Button className="w-full justify-center py-5 text-base rounded-xl font-bold border-2 border-[#E2E8F0] hover:!border-primary hover:!text-primary">Create Goal</Button>
          </div>

          <div className="mt-8 glass bg-bg p-8 rounded-[2rem]">
             <h4 className="text-lg font-heading text-primary-dark mb-3">Smart Saving Tips</h4>
             <p className="text-sm font-medium text-text-muted leading-relaxed">Did you know? Setting up auto-transfers right after your payday increases the success rate of your goals by 40%. Let Pockii automate this.</p>
             <a href="#" className="inline-flex items-center gap-2 mt-6 font-bold text-sm text-accent-gold hover:text-accent-gold-light transition-colors group">
                Enable Auto-Save <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Savings;
