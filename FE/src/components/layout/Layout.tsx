import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  return (
    <div className="flex h-screen bg-bg overflow-hidden relative">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto px-8 md:px-12 py-8 scroll-smooth view-transition-name-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
