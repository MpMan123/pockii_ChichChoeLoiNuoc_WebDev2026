import { CheckCircle2, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DailyQuizzes = () => {
   const navigate = useNavigate();

   return (
      <div className="flex flex-col animate-fade-in max-w-4xl mx-auto py-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Available Quiz */}
            <div className="glass bg-white p-8 rounded-3xl flex flex-col justify-between border-2 border-primary/20 hover:border-primary/50 transition-colors shadow-sm">
               <div>
                  <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                     New
                  </div>
                  <h3 className="font-heading text-2xl text-text mb-2">Today's Challenge</h3>
                  <p className="text-text-muted text-sm mb-6 leading-relaxed">Test your knowledge on Macroeconomics and Personal Budgeting. Takes ~2 minutes.</p>
                  <ul className="space-y-3 mb-8">
                     <li className="flex items-center text-sm font-medium text-text">
                        <CheckCircle2 size={18} className="text-success mr-3" /> 3 Questions
                     </li>
                     <li className="flex items-center text-sm font-medium text-text">
                        <CheckCircle2 size={18} className="text-accent-gold mr-3" /> Earn up to +30 pts
                     </li>
                  </ul>
               </div>
               <button
                  className="btn btn-primary w-full justify-center py-4 text-base rounded-xl flex items-center gap-2 group border-none"
                  onClick={() => navigate('/quizzes/active')}
               >
                  Start Quiz <PlayCircle size={20} className="group-hover:scale-110 transition-transform" />
               </button>
            </div>

            {/* Past Quizzes / Stats */}
            <div className="flex flex-col gap-6">
               <div className="glass bg-primary-dark p-8 rounded-3xl text-white shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
                  <h4 className="font-heading text-xl mb-2 relative z-10">Current Streak</h4>
                  <div className="text-5xl font-bold font-heading text-accent-gold tracking-tight relative z-10">4 Days</div>
                  <p className="text-sm text-white/70 mt-3 relative z-10">Complete today's quiz to keep it going!</p>
               </div>

               <div className="glass bg-white p-6 rounded-3xl shadow-sm">
                  <h4 className="font-heading text-lg text-primary-dark mb-4">Past Results</h4>
                  <div className="space-y-3">
                     <div className="flex items-center justify-between p-3 rounded-xl hover:bg-black/5 transition-colors cursor-pointer border border-transparent hover:border-black/5">
                        <div>
                           <strong className="block text-sm text-text font-semibold">Oct 15 Quiz</strong>
                           <span className="text-xs text-text-muted font-medium">3/3 correct</span>
                        </div>
                        <span className="text-success font-bold">+30 pts</span>
                     </div>
                     <div className="flex items-center justify-between p-3 rounded-xl hover:bg-black/5 transition-colors cursor-pointer border border-transparent hover:border-black/5">
                        <div>
                           <strong className="block text-sm text-text font-semibold">Oct 14 Quiz</strong>
                           <span className="text-xs text-text-muted font-medium">2/3 correct</span>
                        </div>
                        <span className="text-accent-gold font-bold">+20 pts</span>
                     </div>
                     <button className="w-full text-center text-sm font-semibold text-primary mt-2 py-2 hover:bg-primary/5 rounded-lg transition-colors border-none">See all past quizzes</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default DailyQuizzes;
