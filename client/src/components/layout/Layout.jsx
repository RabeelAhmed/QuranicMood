import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden transition-colors duration-300">
            {/* Background Pattern */}
            <div className="fixed inset-0 z-[-1] pointer-events-none opacity-[var(--pattern-opacity)]">
                 <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="islamic-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-400 dark:text-gray-600"/>
                             <circle cx="20" cy="20" r="2" fill="currentColor" className="text-accent-gold" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
                </svg>
            </div>

            <Header />
            
            <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
                 <Outlet />
            </main>
            
            <Footer />
        </div>
    );
};

export default Layout;
