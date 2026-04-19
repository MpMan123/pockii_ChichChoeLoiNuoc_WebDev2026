import { ShoppingBag, Coffee, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from 'antd';

const Leaderboard = () => {
   return (
      <div className="flex flex-col gap-6 animate-fade-in">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left column: Leaderboard & Challenges */}
            <div className="lg:col-span-2 flex flex-col gap-8">

               {/* Ranks list */}
               <div className="glass bg-white p-6 md:p-8 rounded-3xl shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                     <h3 className="text-lg font-heading text-primary-dark">Global Friends</h3>
                     <div className="flex bg-[#F1F5F9] p-1 rounded-full">
                        <Button type="text" className="px-4 py-1.5 h-auto rounded-full text-sm font-semibold text-text bg-white shadow-sm transition-all hover:bg-white hover:text-text">Global</Button>
                        <Button type="text" className="px-4 py-1.5 h-auto rounded-full text-sm font-semibold text-text-muted hover:!text-text hover:!bg-transparent transition-all">Friends</Button>
                     </div>
                  </div>

                  <div className="flex flex-col gap-3">
                     <div className="flex items-center px-4 py-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
                        <div className="w-12 text-center">Rank</div>
                        <div className="flex-1 ml-4">Member</div>
                        <div className="w-24 text-right">Efficiency</div>
                        <div className="w-20 text-right">Level</div>
                     </div>

                     {/* User 1 */}
                     <div className="flex items-center px-4 py-3 rounded-2xl bg-white border border-[#F1F5F9] shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 text-center font-heading text-xl font-bold text-primary">1</div>
                        <div className="flex-1 ml-4 flex items-center gap-3">
                           <img src="https://i.pravatar.cc/150?u=1" className="w-10 h-10 rounded-full object-cover shadow-sm" alt="Avatar" />
                           <div className="flex flex-col">
                              <strong className="text-sm font-bold text-text">Elena Vance</strong>
                              <span className="text-xs text-text-muted">@elena_v</span>
                           </div>
                        </div>
                        <div className="w-24 text-right font-heading font-semibold text-lg text-text">98%</div>
                        <div className="w-20 text-right"><span className="badge">124</span></div>
                     </div>

                     {/* User 2 */}
                     <div className="flex items-center px-4 py-3 rounded-2xl bg-white border border-[#F1F5F9] shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 text-center font-heading text-xl font-bold text-text">2</div>
                        <div className="flex-1 ml-4 flex items-center gap-3">
                           <img src="https://i.pravatar.cc/150?u=2" className="w-10 h-10 rounded-full object-cover shadow-sm" alt="Avatar" />
                           <div className="flex flex-col">
                              <strong className="text-sm font-bold text-text">Alex Hou</strong>
                              <span className="text-xs text-text-muted">@alexh</span>
                           </div>
                        </div>
                        <div className="w-24 text-right font-heading font-semibold text-lg text-text">94%</div>
                        <div className="w-20 text-right"><span className="badge">116</span></div>
                     </div>

                     {/* Current User */}
                     <div className="flex items-center px-4 py-4 rounded-2xl bg-gradient-to-br from-primary-dark to-primary text-white shadow-lg transform hover:scale-[1.02] transition-transform my-2">
                        <div className="w-12 text-center font-heading text-2xl font-bold text-accent-gold">4</div>
                        <div className="flex-1 ml-4 flex items-center gap-3">
                           <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" className="w-11 h-11 rounded-full object-cover border-2 border-accent-gold shadow-md" alt="Avatar" />
                           <div className="flex flex-col">
                              <strong className="text-sm font-bold text-white">Sarah Miller (You)</strong>
                              <span className="text-xs font-medium text-accent-gold-light">@sarahm</span>
                           </div>
                        </div>
                        <div className="w-24 text-right font-heading font-semibold text-xl text-white">91%</div>
                        <div className="w-20 text-right"><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm shadow-sm">110</span></div>
                     </div>
                  </div>
               </div>

               <div className="mt-4">
                  <h3 className="text-lg font-heading text-primary-dark mb-4">Active Quests</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div className="glass bg-white p-6 rounded-3xl flex flex-col border border-black/5 hover:-translate-y-1 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                           <CheckCircle2 className="text-success" size={24} />
                           <span className="text-xs font-bold text-success uppercase tracking-wider bg-success/10 px-2 py-1 rounded-md">Completed</span>
                        </div>
                        <h4 className="text-lg font-semibold text-text mb-2">Log a debt precisely</h4>
                        <p className="text-sm text-text-muted mb-6">You correctly classified and logged an active debt.</p>
                        <Button type="primary" className="w-full justify-center mt-auto rounded-xl bg-primary hover:!bg-primary-dark border-none shadow-sm font-semibold h-10">Claim 50 pts</Button>
                     </div>

                     <div className="glass bg-white p-6 rounded-3xl flex flex-col border border-black/5 hover:-translate-y-1 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                           <ShoppingBag className="text-text-muted" size={24} />
                           <span className="text-xs font-bold text-text-muted uppercase tracking-wider bg-black/5 px-2 py-1 rounded-md">0/1</span>
                        </div>
                        <h4 className="text-lg font-semibold text-text mb-2">Invite a Study Buddy</h4>
                        <p className="text-sm text-text-muted mb-6">Learn together and earn 100 points both.</p>
                        <Button className="w-full justify-center mt-auto rounded-xl border-2 border-[#E2E8F0] hover:!border-primary hover:!text-primary font-semibold h-10">Invite</Button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right column: Voucher Store */}
            <div className="flex flex-col gap-8">
               <div className="bg-gradient-to-br from-primary-dark to-primary text-white p-8 rounded-[2rem] shadow-lg text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                  <span className="text-xs font-semibold text-white/80 tracking-wider uppercase relative z-10">YOUR BALANCE</span>
                  <h1 className="text-5xl font-heading mt-3 mb-2 font-medium relative z-10">12,450 <span className="text-lg font-sans font-medium text-white/80">pts</span></h1>
                  <p className="text-sm text-white/80 relative z-10 mb-8 max-w-xs mx-auto">Redeem your points for rewards to boost your financial serenity.</p>
                  <Button type="text" className="w-full h-auto py-3.5 rounded-xl font-bold transition-colors relative z-10 shadow-sm border border-white/20 bg-white/20 text-white hover:!bg-white/30 hover:!text-white backdrop-blur-md">Earn More Points</Button>
               </div>

               <div className="glass bg-white p-6 rounded-3xl">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="text-lg font-heading text-primary-dark">Available Vouchers</h3>
                     <Button type="link" className="!p-0 text-primary font-semibold text-sm flex items-center hover:underline h-auto">See All <ChevronRight size={16} className="ml-1" /></Button>
                  </div>

                  <div className="flex flex-col gap-4">
                     {/* Store Card 1 */}
                     <div className="rounded-2xl overflow-hidden border border-black/5 hover:-translate-y-1 hover:shadow-lg transition-all bg-white group cursor-pointer text-left">
                        <div className="h-32 bg-[#0f4f34] flex items-center justify-center relative overflow-hidden">
                           <Coffee size={40} className="text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                        <div className="p-5">
                           <span className="badge mb-3">Food & Drink</span>
                           <h4 className="text-lg font-semibold text-text mb-2">10% off at Starbucks</h4>
                           <p className="text-xs text-text-muted leading-relaxed line-clamp-2">Enjoy your favorite morning brew with a sustainable discount. Valid at all participating locations.</p>
                           <div className="flex items-center justify-between mt-5 pt-4 border-t border-black/5">
                              <strong className="text-primary font-heading text-xl">1,200 pts</strong>
                              <Button type="primary" className="px-4 py-1.5 h-auto text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-primary hover:!bg-primary-dark border-none shadow-sm">Redeem</Button>
                           </div>
                        </div>
                     </div>

                     {/* Category tags */}
                     <div className="mt-2 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap bg-primary text-white cursor-pointer shadow-sm">All Categories</span>
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap bg-black/5 text-text-muted hover:bg-black/10 cursor-pointer transition-colors">Travel</span>
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap bg-black/5 text-text-muted hover:bg-black/10 cursor-pointer transition-colors">Fashion</span>
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap bg-black/5 text-text-muted hover:bg-black/10 cursor-pointer transition-colors">Lifestyle</span>
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </div>
   );
};

export default Leaderboard;
