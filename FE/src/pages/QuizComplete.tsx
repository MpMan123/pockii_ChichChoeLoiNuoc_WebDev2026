import { Trophy, ArrowRight, Share2, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuizComplete = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in py-10 w-full max-w-lg mx-auto">
            <div className="glass bg-white p-10 md:p-14 rounded-[2.5rem] w-full text-center flex flex-col items-center shadow-lg relative overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-accent-gold/10 rounded-full blur-3xl -z-10"></div>
                
                <div className="relative mb-8">
                    <div className="w-24 h-24 rounded-full bg-accent-gold flex items-center justify-center shadow-[0_10px_25px_rgba(210,168,104,0.4)] animate-[bounce_2s_infinite]">
                        <Trophy size={48} className="text-white" />
                    </div>
                    {/* Floating stars */}
                    <Star size={20} className="absolute -top-2 -right-4 text-accent-gold-light animate-[spin_4s_linear_infinite]" />
                    <Star size={16} className="absolute bottom-2 -left-6 text-accent-gold-light animate-[spin_3s_linear_infinite_reverse]" />
                </div>

                <h1 className="font-heading text-4xl text-primary-dark tracking-tight mb-2">Phenomenal!</h1>
                <p className="text-text-muted font-medium mb-8">You answered 3/3 questions correctly.</p>

                <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-2xl flex items-center gap-6 mb-10 w-full justify-center">
                    <div className="flex flex-col items-end border-r border-[#E2E8F0] pr-6">
                        <span className="text-xs font-bold text-text-muted tracking-wider uppercase">POINTS EARNED</span>
                        <span className="font-heading text-3xl font-bold text-success">+30</span>
                    </div>
                    <div className="flex flex-col items-start pl-2">
                        <span className="text-xs font-bold text-text-muted tracking-wider uppercase">NEW BALANCE</span>
                        <span className="font-heading text-3xl font-bold text-primary-dark">12,480</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <button 
                        className="flex-1 btn btn-primary flex items-center justify-center gap-2 py-4 rounded-xl text-base shadow-md group border-none"
                        onClick={() => navigate('/scholar')}
                    >
                        Back to Scholar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="sm:w-16 btn bg-white border-2 border-[#E2E8F0] text-text hover:bg-[#F8FAFC] flex items-center justify-center gap-2 py-4 rounded-xl">
                        <Share2 size={20} className="text-text-muted" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizComplete;
