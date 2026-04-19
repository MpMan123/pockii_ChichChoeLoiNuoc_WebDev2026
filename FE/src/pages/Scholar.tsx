import { BookOpen, Search, ArrowRight, PlayCircle, Clock } from 'lucide-react';
import { Input, Button } from 'antd';

const Scholar = () => {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="glass bg-white p-6 rounded-3xl mt-4">
        <div className="relative mb-8">
          <Input
            size="large"
            prefix={<Search size={20} className="text-text-muted mr-2" />}
            className="w-full py-4 bg-[#F8FAFC] border-none rounded-2xl outline-none font-medium text-[15px] focus:ring-4 focus:ring-primary/10 transition-all hover:bg-black/5"
            placeholder="Search topics (e.g. 'compound interest', 'taxes')"
          />
        </div>

        <h3 className="text-xl font-heading text-primary-dark mb-6">Featured Lessons</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary-dark text-white rounded-[2rem] p-6 pb-8 relative overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 group-hover:scale-150 transition-transform duration-500"></div>
            <BookOpen size={32} className="text-white/80 mb-6" />
            <h4 className="text-xl font-semibold mb-2">The Magic of Compound Interest</h4>
            <p className="text-sm text-white/70 mb-8 line-clamp-2">Learn how small investments today can snowball into massive wealth tomorrow.</p>
            <Button type="link" className="!p-0 flex items-center gap-2 text-sm font-bold text-accent-gold group-hover:text-white transition-colors mt-auto">Read Article <ArrowRight size={16} /></Button>
          </div>

          <div className="bg-[#1A825F] text-white rounded-[2rem] p-6 pb-8 relative overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-black/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 group-hover:scale-150 transition-transform duration-500"></div>
            <PlayCircle size={32} className="text-white/80 mb-6" />
            <h4 className="text-xl font-semibold mb-2">Budgeting 101</h4>
            <p className="text-sm text-white/70 mb-8 line-clamp-2">A quick 5-minute video guide on structuring your weekly budget serenely.</p>
            <Button type="link" className="!p-0 flex items-center gap-2 text-sm font-bold text-accent-gold-light group-hover:text-white transition-colors mt-auto">Watch Video <ArrowRight size={16} /></Button>
          </div>

          <div className="glass bg-white border border-[#E2E8F0] rounded-[2rem] p-6 pb-8 relative overflow-hidden group hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
            <Clock size={32} className="text-primary mb-6" />
            <h4 className="text-xl font-semibold text-text mb-2">Taxes Demystified</h4>
            <p className="text-sm text-text-muted mb-8 line-clamp-2">Everything you need to know before the tax season starts. Keep calm and file on.</p>
            <Button type="link" className="!p-0 flex items-center gap-2 text-sm font-bold text-primary group-hover:text-primary-dark transition-colors mt-auto">Read Article <ArrowRight size={16} /></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scholar;
