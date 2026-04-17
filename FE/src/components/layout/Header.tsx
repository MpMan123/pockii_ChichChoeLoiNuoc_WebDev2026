import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, User } from 'lucide-react';
import { Input, Modal, Avatar } from 'antd';
import { useAuth } from '../../context/AuthContext';

const routeNames: Record<string, string> = {
    '/': 'Dashboard',
    '/dashboard': 'Dashboard',
    '/debts': 'Debts',
    '/savings': 'Savings',
    '/leaderboard': 'Leaderboard',
    '/scholar': 'Scholar',
    '/quizzes': 'Daily Quizzes',
    '/financial-quiz': 'Financial Quiz',
    '/quiz-complete': 'Quiz Complete'
};

const Header = () => {
    const location = useLocation();
    const { user } = useAuth();
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const currentTitle = routeNames[location.pathname] || 'Pockii Overview';

    return (
        <>
        <header className="sticky top-0 z-10 w-full flex items-center justify-between px-8 py-5 bg-bg/80 backdrop-blur-md border-b border-[#E2E8F0]">
            <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-dark">{currentTitle}</h1>
            </div>

            <div className="flex items-center gap-5">
                <div className="hidden lg:block relative">
                    <Input 
                        size="large"
                        prefix={<Search className="text-text-muted mr-2" size={16} />}
                        placeholder="Search anything..."
                        className="bg-white !rounded-full border-transparent shadow-sm text-sm hover:!border-[#E2E8F0] focus-within:!ring-2 focus-within:!ring-primary/20 transition-all w-64 md:w-80 lg:w-96 overflow-hidden py-2"
                        style={{ borderRadius: '9999px' }}
                    />
                </div>

                <button className="relative p-2.5 bg-white rounded-full text-text-muted hover:text-primary transition-all cursor-pointer shadow-sm border border-transparent hover:border-[#E2E8F0]">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-danger rounded-full border-2 border-white"></span>
                </button>

                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setIsViewModalOpen(true)}>
                    <Avatar size={40} className="border-2 border-white shadow-md transition-all group-hover:border-primary flex items-center justify-center bg-gray-100 text-gray-500" icon={<User size={20} />} />
                </div>
            </div>
        </header>

        <Modal 
            title={<span className="font-heading text-xl text-primary-dark">User Profile</span>} 
            open={isViewModalOpen} 
            onCancel={() => setIsViewModalOpen(false)} 
            footer={null}
            centered
        >
            <div className="py-6 flex flex-col items-center gap-4 text-center">
                <Avatar size={80} icon={<User size={40} />} className="bg-primary text-white shadow-sm" />
                <div>
                     <h3 className="text-xl font-bold text-text">{user?.name || user?.email?.split('@')[0] || 'Unknown Member'}</h3>
                     <p className="text-text-muted text-sm font-medium">Bronze II - {user?.email || 'N/A'}</p>
                </div>
            </div>
        </Modal>
        </>
    );
};

export default Header;
