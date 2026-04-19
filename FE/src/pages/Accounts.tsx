import React from 'react';
import { Button } from 'antd';
import { 
  Plus, 
  RefreshCcw, 
  Star, 
  Landmark, 
  User, 
  Pencil, 
  MoreVertical, 
  PiggyBank, 
  Wallet, 
  TrendingUp, 
  Settings 
} from 'lucide-react';

const Accounts = () => {
  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-10 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-heading font-bold text-text mb-2 tracking-tight">Quản lý tài khoản</h1>
          <p className="text-sm font-medium text-text-muted">Tổ chức tài chính của bạn một cách thanh thản.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            className="flex items-center gap-2 h-11 px-5 rounded-xl border-none bg-accent-gold/20 text-accent-gold hover:!bg-accent-gold/30 hover:!text-accent-gold-dark font-semibold text-sm transition-all"
          >
            <RefreshCcw size={16} />
            Kết nối ngân hàng
          </Button>
          <Button 
            className="flex items-center gap-2 h-11 px-5 rounded-xl border-none bg-primary text-white hover:!bg-primary-dark hover:!text-white font-semibold text-sm shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <Plus size={18} />
            Thêm tài khoản mới
          </Button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Account Card */}
        <div className="lg:col-span-2 relative bg-[#4a856a] rounded-[2rem] p-8 text-white shadow-xl overflow-hidden min-h-[220px] flex flex-col justify-between group">
          {/* Faded Background Icon */}
          <Landmark size={140} className="absolute -right-6 -bottom-6 opacity-20 text-white transform -rotate-12 transition-transform duration-500 group-hover:rotate-0" />
          
          <div className="relative z-10 flex justify-between items-start">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
              <Star size={12} className="fill-white" />
              TÀI KHOẢN CHÍNH
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center transition-colors backdrop-blur-sm">
                <Pencil size={14} />
              </button>
              <button className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center transition-colors backdrop-blur-sm">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>

          <div className="relative z-10 mt-8">
            <p className="text-white/80 text-sm font-medium mb-1">Số dư hiện tại</p>
            <div className="flex items-baseline gap-1">
              <h2 className="text-5xl font-heading font-bold tracking-tight">42.850.000</h2>
              <span className="text-2xl font-bold">đ</span>
            </div>
          </div>

          <div className="relative z-10 flex items-end justify-between mt-8">
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
            <p className="text-xs text-white/70 font-medium">Cập nhật 2 phút trước</p>
          </div>
        </div>

        {/* Savings Fund */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-black/[0.03] flex flex-col justify-between">
          <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center text-primary-dark mb-6">
            <PiggyBank size={24} className="fill-primary-dark/20" />
          </div>
          <div>
            <h3 className="font-bold text-text text-base">Quỹ tiết kiệm</h3>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-heading font-bold text-primary-dark tracking-tight">125.000.000</span>
              <span className="text-lg font-bold text-text-muted">đ</span>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex justify-between text-[11px] font-bold text-text-muted tracking-widest uppercase mb-2">
              <span>MỤC TIÊU</span>
              <span className="text-text">80%</span>
            </div>
            <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary-dark rounded-full w-[80%]"></div>
            </div>
          </div>
        </div>

        {/* Spending Wallet */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-black/[0.03] flex flex-col justify-between">
          <div className="w-12 h-12 rounded-2xl bg-accent-gold/10 flex items-center justify-center text-accent-gold-dark mb-6">
            <Wallet size={24} className="fill-accent-gold/20" />
          </div>
          <div>
            <h3 className="font-bold text-text text-base">Ví chi tiêu</h3>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-heading font-bold text-primary-dark tracking-tight">8.420.000</span>
              <span className="text-lg font-bold text-text-muted">đ</span>
            </div>
          </div>
          <div className="flex gap-2 mt-8">
            <span className="text-[10px] font-bold bg-accent-gold/20 text-accent-gold-dark px-2.5 py-1 rounded-full uppercase tracking-widest">TIỀN MẶT</span>
            <span className="text-[10px] font-bold bg-black/5 text-text-muted px-2.5 py-1 rounded-full uppercase tracking-widest">HÀNG NGÀY</span>
          </div>
        </div>

        {/* Investments */}
        <div className="bg-[#fbfcfa] rounded-[2rem] p-8 shadow-sm border border-black/[0.03] flex flex-col justify-between">
          <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center text-success mb-6">
            <TrendingUp size={24} className="" />
          </div>
          <div>
            <h3 className="font-bold text-text text-base">Đầu tư chứng khoán</h3>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-heading font-bold text-primary-dark tracking-tight">320.000.000</span>
              <span className="text-base font-bold text-primary-dark">đ</span>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-1.5 text-xs font-bold text-success">
            <TrendingUp size={14} />
            <span>+12.4% tháng này</span>
          </div>
        </div>

        {/* Add New Item */}
        <button className="bg-transparent rounded-[2rem] p-8 border-2 border-dashed border-black/10 hover:border-primary/40 hover:bg-primary/5 transition-all flex flex-col items-center justify-center text-center gap-4 min-h-[200px] cursor-pointer group">
          <div className="w-14 h-14 rounded-full bg-black/5 group-hover:bg-primary/10 flex items-center justify-center text-text-muted group-hover:text-primary transition-colors">
            <Plus size={24} />
          </div>
          <div>
            <h3 className="font-bold text-text text-base mb-1 group-hover:text-primary transition-colors">Thêm mục mới</h3>
            <p className="text-xs text-text-muted font-medium">Quỹ du lịch, hưu trí hoặc ví mới</p>
          </div>
        </button>
      </div>

      {/* Connected Banks List */}
      <div className="mt-4">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-xl font-heading font-bold text-text">Ngân hàng đã kết nối</h2>
          <a href="#" className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
            Xem tất cả <span className="text-base leading-none">&rsaquo;</span>
          </a>
        </div>

        <div className="bg-white rounded-3xl p-4 shadow-sm border border-black/[0.03] flex flex-col gap-2">
          {/* Vietcombank */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white hover:bg-black/[0.01] rounded-2xl transition-colors border border-transparent hover:border-black/5 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#005B3A] shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                <span className="text-white font-bold text-xl italic font-serif">V</span>
              </div>
              <div>
                <h4 className="font-bold text-text text-base">Vietcombank</h4>
                <p className="text-xs text-text-muted font-medium mt-0.5">Kết nối lần cuối: Hôm nay, 08:30</p>
              </div>
            </div>
            
            <div className="flex justify-between sm:justify-end items-center gap-6 sm:gap-10 sm:min-w-[350px]">
              <div className="text-left sm:text-right">
                <p className="font-bold text-text text-[15px]">**** 8890</p>
                <p className="text-[10px] uppercase tracking-widest text-text-muted font-bold mt-0.5">THẺ TÍN DỤNG</p>
              </div>
              <div className="flex items-center gap-2">
                <Button className="h-9 px-4 rounded-xl border-none bg-black/5 text-text-muted hover:!bg-black/10 hover:!text-text text-xs font-bold transition-all">
                  Ngắt kết nối
                </Button>
                <Button type="text" className="w-9 h-9 p-0 flex items-center justify-center rounded-xl text-text-muted hover:!bg-black/5 hover:!text-text transition-all">
                  <Settings size={18} />
                </Button>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-black/5"></div>

          {/* Techcombank */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white hover:bg-black/[0.01] rounded-2xl transition-colors border border-transparent hover:border-black/5 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#E51B24] shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                 <span className="text-white font-bold text-xl italic font-sans">T</span>
              </div>
              <div>
                <h4 className="font-bold text-text text-base">Techcombank</h4>
                <p className="text-xs text-text-muted font-medium mt-0.5">Kết nối lần cuối: Hôm qua, 14:15</p>
              </div>
            </div>
            
            <div className="flex justify-between sm:justify-end items-center gap-6 sm:gap-10 sm:min-w-[350px]">
              <div className="text-left sm:text-right">
                <p className="font-bold text-text text-[15px]">**** 1234</p>
                <p className="text-[10px] uppercase tracking-widest text-text-muted font-bold mt-0.5">TÀI KHOẢN THANH TOÁN</p>
              </div>
              <div className="flex items-center gap-2">
                <Button className="h-9 px-4 rounded-xl border-none bg-black/5 text-text-muted hover:!bg-black/10 hover:!text-text text-xs font-bold transition-all">
                  Ngắt kết nối
                </Button>
                <Button type="text" className="w-9 h-9 p-0 flex items-center justify-center rounded-xl text-text-muted hover:!bg-black/5 hover:!text-text transition-all">
                  <Settings size={18} />
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Accounts;
