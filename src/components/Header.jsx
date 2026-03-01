import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, Send, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

// Premium Vector Taxi Silhouette
const PremiumTaxiIcon = ({ className }) => (
    <svg viewBox="0 0 100 50" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="
            M 12 35 
            C 10 35, 5 33, 5 28 
            C 5 25, 8 23, 15 23 
            C 18 18, 25 10, 35 8 
            C 45 6, 60 8, 70 15 
            C 75 19, 85 20, 90 22 
            C 95 24, 98 28, 95 32 
            C 94 34, 90 35, 85 35 
            L 80 35 
            A 10 10 0 0 0 60 35 
            L 40 35 
            A 10 10 0 0 0 20 35 
            Z

            M 22 23 
            C 25 15, 35 12, 45 12 
            L 45 23 
            Z
            
            M 48 12 
            C 55 12, 63 15, 68 19 
            A 1 1 0 0 1 68 21
            L 48 23 
            Z
        " />
        <circle cx="30" cy="35" r="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="70" cy="35" r="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="30" cy="35" r="2.5" fill="currentColor" />
        <circle cx="70" cy="35" r="2.5" fill="currentColor" />
        <rect x="42" y="3" width="14" height="4" rx="1" fill="currentColor" />

        {/* Aerodynamic styling lines */}
        <path d="M 68 25 L 90 27" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        <path d="M 18 25 L 45 25" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    </svg>
);

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    // Handle scroll detection for sticky header styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle cross-page hash navigation
    const handleNavClick = (e, targetId, path = '/') => {
        e.preventDefault();
        setMobileMenuOpen(false);

        if (location.pathname !== path) {
            navigate(path + (targetId ? `#${targetId}` : ''));
        } else {
            if (targetId) {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    // If we just navigated to a path with a hash, wait for render and scroll
    useEffect(() => {
        if (location.hash) {
            setTimeout(() => {
                const id = location.hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0f141f]/95 backdrop-blur-md shadow-lg border-b border-white/5' : 'bg-transparent'}`}>

                {/* Top Bar - Contacts */}
                <div className="bg-[#0f141f] border-b border-white/5 py-2 hidden md:block">
                    <div className="container mx-auto px-4 flex justify-between items-center text-sm">
                        <div className="flex space-x-6 text-slate-300 items-center">
                            <a href="tel:+79782757907" className="flex items-center gap-2 text-lg font-bold text-white hover:text-accent transition-colors">
                                <Phone size={18} className="text-accent" /> +7 (978) 275-79-07
                            </a>
                        </div>

                        <div className="flex space-x-3">
                            {/* WhatsApp */}
                            <a href="https://wa.me/79782757907" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1 bg-[#25D366]/10 text-[#25D366] rounded-full hover:bg-[#25D366] hover:text-white transition-colors">
                                <MessageCircle size={14} /> <span>WhatsApp</span>
                            </a>
                            {/* Telegram */}
                            <a href="https://t.me/+79782757907" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1 bg-[#0088cc]/10 text-[#0088cc] rounded-full hover:bg-[#0088cc] hover:text-white transition-colors">
                                <Send size={14} /> <span>Telegram</span>
                            </a>
                            {/* MAX Messenger (Generic Icon) */}
                            <a href="https://max.ru/u/f9LHodD0cOKRGsPwyyH38wFRJXzuvqZlhXq10g7urwZmxvWE5cSmhXgel2c" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full hover:bg-purple-500 hover:text-white transition-colors">
                                <MessageCircle size={14} /> <span>Max</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Main Navigation */}
                <div className="container mx-auto px-4 h-16 md:h-20 flex justify-between items-center">

                    {/* Premium Typographic Logo */}
                    <div
                        className="group relative cursor-pointer flex items-center select-none"
                        onClick={(e) => handleNavClick(e, null, '/')}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="flex flex-col items-center justify-center mr-2 md:mr-4"
                        >
                            <PremiumTaxiIcon className="w-16 h-8 md:w-[88px] md:h-11 text-accent transition-transform group-hover:-translate-y-0.5" />
                        </motion.div>

                        <div className="relative flex items-center text-3xl md:text-4xl font-sans tracking-tighter transition-transform group-hover:scale-[1.03]">
                            {/* "ЮГ" part - Bold and White */}
                            <span className="font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                                ЮГ
                            </span>

                            {/* "-" separator */}
                            <span className="font-light text-slate-400 mx-0.5">-</span>

                            {/* "ОК" part - Light and Accent Color */}
                            <span className="font-light text-accent drop-shadow-[0_0_12px_rgba(217,119,6,0.6)]">
                                ОК
                            </span>

                            {/* Animated Shine Effect overlaying the text */}
                            <motion.div
                                className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
                                initial={{ x: '-150%' }}
                                animate={{ x: '150%' }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    ease: "easeInOut",
                                    repeatDelay: 3
                                }}
                                style={{
                                    WebkitBackgroundClip: "text",
                                    color: "transparent"
                                }}
                            />
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 font-medium text-slate-200">
                        <a href="/" onClick={(e) => handleNavClick(e, 'home', '/')} className="hover:text-accent transition-colors">Главная</a>
                        <a href="/routes" onClick={(e) => { e.preventDefault(); navigate('/routes'); }} className={`hover:text-accent transition-colors ${location.pathname === '/routes' ? 'text-accent' : ''}`}>Маршруты</a>
                        <a href="/#fleet" onClick={(e) => handleNavClick(e, 'fleet', '/')} className="hover:text-accent transition-colors">Наши авто</a>
                        <a href="/#about" onClick={(e) => handleNavClick(e, 'about', '/')} className="hover:text-accent transition-colors">О компании</a>
                        <a href="/#contacts" onClick={(e) => handleNavClick(e, 'contacts', '/')} className="hover:text-accent transition-colors">Контакты</a>

                        <button
                            onClick={(e) => handleNavClick(e, 'contacts', '/')}
                            className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-lg transition-transform hover:scale-105 shadow-[0_0_15px_-3px_rgba(217,119,6,0.6)] ml-4"
                        >
                            Заказать
                        </button>
                    </nav>

                    {/* Mobile Actions (Icons + Menu Toggle) */}
                    <div className="md:hidden flex items-center gap-2">
                        <div className="flex items-center gap-3 mr-2">
                            <a href="https://wa.me/79782757907" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform flex justify-center items-center drop-shadow-md">
                                <img src="/images/whatsapp.png" alt="WhatsApp" className="w-7 h-7 object-contain" />
                            </a>
                            <a href="https://t.me/+79782757907" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform flex justify-center items-center drop-shadow-md">
                                <img src="/images/telegram.png" alt="Telegram" className="w-7 h-7 object-contain" />
                            </a>
                            <a href="https://max.ru/u/f9LHodD0cOKRGsPwyyH38wFRJXzuvqZlhXq10g7urwZmxvWE5cSmhXgel2c" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform flex justify-center items-center drop-shadow-md">
                                <img src="/images/max.png" alt="Max" className="w-7 h-7 object-contain" />
                            </a>
                        </div>
                        <button
                            className="text-slate-200 p-1"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-[#0f141f]/95 backdrop-blur-xl pt-24 px-4 pb-8 flex flex-col h-screen md:hidden">
                    <nav className="flex flex-col gap-6 text-xl font-medium text-white mb-auto mt-10 text-center">
                        <a href="/" onClick={(e) => handleNavClick(e, 'home', '/')} className="border-b border-white/5 pb-4">Главная</a>
                        <a href="/routes" onClick={(e) => { e.preventDefault(); navigate('/routes'); setMobileMenuOpen(false); }} className="border-b border-white/5 pb-4">Маршруты</a>
                        <a href="/#fleet" onClick={(e) => handleNavClick(e, 'fleet', '/')} className="border-b border-white/5 pb-4">Наши авто</a>
                        <a href="/#about" onClick={(e) => handleNavClick(e, 'about', '/')} className="border-b border-white/5 pb-4">О компании</a>
                        <a href="/#contacts" onClick={(e) => handleNavClick(e, 'contacts', '/')} className="pb-4">Контакты</a>
                    </nav>

                    <div className="flex flex-col gap-4 mt-8">
                        <div className="flex justify-center gap-4 border-t border-white/5 pt-8">
                            {/* Mobile Messengers */}
                            <a href="https://wa.me/79782757907" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform flex justify-center items-center drop-shadow-lg">
                                <img src="/images/whatsapp.png" alt="WhatsApp" className="w-10 h-10 object-contain" />
                            </a>
                            <a href="https://t.me/+79782757907" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform flex justify-center items-center drop-shadow-lg">
                                <img src="/images/telegram.png" alt="Telegram" className="w-10 h-10 object-contain" />
                            </a>
                            <a href="https://max.ru/u/f9LHodD0cOKRGsPwyyH38wFRJXzuvqZlhXq10g7urwZmxvWE5cSmhXgel2c" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform flex justify-center items-center drop-shadow-lg">
                                <img src="/images/max.png" alt="Max" className="w-10 h-10 object-contain" />
                            </a>
                        </div>
                        <a href="tel:+79782757907" className="text-center font-bold text-xl py-3 text-white">
                            +7 (978) 275-79-07
                        </a>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
