import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import fallbackData from '../lib/fallbackRoutes.json';

const PreFooter = () => {
    const [routes, setRoutes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const fetchPromise = supabase.from('routes').select('slug, title, image_url, prices').order('created_at', { ascending: true });
                const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 4000));

                const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);
                if (error || !data) throw error || new Error('No data');
                setRoutes(data);
            } catch (error) {
                console.warn("Using fallback routes in PreFooter:", error.message);
                setRoutes(fallbackData.value || []);
            }
        };
        fetchRoutes();
    }, []);

    // Rotate cards every 5 seconds
    useEffect(() => {
        if (routes.length <= 3) return; // No need to rotate if 3 or fewer routes exist
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % routes.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [routes.length]);

    // Get 3 visible routes for the carousel
    const visibleRoutes = [];
    if (routes.length > 0) {
        for (let i = 0; i < Math.min(3, routes.length); i++) {
            visibleRoutes.push(routes[(currentIndex + i) % routes.length]);
        }
    }

    return (
        <div className="bg-[#131926] py-16 border-t border-white/5 relative z-10 w-full mt-auto">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {/* Column 1: Компания */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-6">Компания</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><a href="#" className="hover:text-accent transition-colors flex items-center"><span className="mr-2 text-accent">•</span> О компании</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors flex items-center"><span className="mr-2 text-accent">•</span> Междугородние перевозки</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors flex items-center"><span className="mr-2 text-accent">•</span> Автопарк</a></li>
                        </ul>
                    </div>

                    {/* Column 2: Популярные направления (Rotating Mini Cards) */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-6">Популярные направления</h4>
                        {routes.length === 0 ? (
                            <div className="animate-pulse flex flex-col gap-4">
                                {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white/5 rounded-lg w-full"></div>)}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 relative overflow-hidden" style={{ minHeight: '260px' }}>
                                {visibleRoutes.map((route, idx) => {
                                    const minPrice = route.prices?.economy || route.prices?.standard || '';

                                    return (
                                        <Link
                                            to={`/routes/${route.slug}`}
                                            key={`${route.slug}-${currentIndex}-${idx}`} // Force re-render for very simple transition
                                            className="relative group rounded-lg overflow-hidden h-20 block shadow-lg border border-white/10"
                                        >
                                            <div className="absolute inset-0 animate-fade-in-fast">
                                                <img
                                                    src={route.image_url}
                                                    alt={route.title}
                                                    loading="lazy"
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80";
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-r from-[#131926]/95 via-[#131926]/80 to-transparent"></div>
                                                <div className="absolute inset-0 p-4 flex flex-col justify-center border-l-2 border-accent/0 group-hover:border-accent transition-all">
                                                    <span className="text-white font-bold text-[15px] leading-tight group-hover:text-accent transition-colors truncate">Такси {route.title}</span>
                                                    {minPrice && <span className="text-slate-300 text-xs font-medium mt-1">Цена от {minPrice} руб.</span>}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Column 3: Контакты */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-6">Контакты</h4>
                        <div className="space-y-6 text-slate-300">
                            <a href="tel:+79782757907" className="flex items-center hover:text-accent transition-colors group">
                                <Phone className="mr-5 text-accent group-hover:scale-110 transition-transform" size={28} />
                                <span className="text-2xl font-bold">+7 (978) 275-79-07</span>
                            </a>
                            <a href="mailto:info@yug-ok.ru" className="flex items-center hover:text-accent transition-colors group">
                                <Mail className="mr-5 text-accent group-hover:scale-110 transition-transform" size={28} />
                                <span className="text-xl">info@yug-ok.ru</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreFooter;
