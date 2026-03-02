import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Phone, MessageCircle, Send } from 'lucide-react';
import fallbackData from '../lib/fallbackRoutes.json';

const RoutesPage = () => {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                // Fetch with a 4-second timeout
                const fetchPromise = supabase
                    .from('routes')
                    .select('*')
                    .order('created_at', { ascending: true });

                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Supabase request timed out')), 4000)
                );

                const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);

                if (error) throw error;
                if (!data) throw new Error('No data returned');

                setRoutes(data);
            } catch (error) {
                console.warn("Using fallback routes due to error:", error.message);
                setRoutes(fallbackData.value || []);
            } finally {
                setLoading(false);
            }
        };

        fetchRoutes();
    }, []);
    return (
        <div className="pt-28 pb-20 bg-primary-dark min-h-screen">
            <div className="container mx-auto px-4">

                {/* Breadcrumb / Title */}
                <div className="mb-12">
                    <div className="text-sm text-slate-400 mb-2">
                        <a href="/" className="hover:text-accent transition-colors">Главная</a>
                        <span className="mx-2">/</span>
                        <span className="text-white">Маршруты</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Популярные <span className="text-accent">Маршруты</span></h1>
                    <p className="text-slate-400 max-w-2xl text-lg">Выбирайте нужное направление. Мы гарантируем фиксированную цену и подачу автомобиля точно ко времени.</p>
                </div>

                {/* SEO Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {routes.map((route) => (
                            <div
                                key={route.id}
                                onClick={() => navigate(`/routes/${route.slug}`)}
                                className="bg-surface rounded-2xl overflow-hidden shadow-lg border border-white/10 flex flex-col group hover:border-accent/40 hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98] active:duration-75 transition-all relative cursor-pointer"
                            >
                                <div className="h-56 overflow-hidden relative">
                                    <img
                                        src={route.image_url}
                                        alt={`Такси ${route.title}`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80";
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"></div>

                                    {/* Top Overlay: Contact & Messengers */}
                                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-20 transition-opacity">
                                        <a href="tel:+79782757907" onClick={(e) => e.stopPropagation()} className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 shadow-lg hover:bg-black/80 hover:border-accent/50 hover:scale-105 active:scale-95 active:duration-75 transition-all duration-300 group/phone cursor-pointer">
                                            <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 group-hover/phone:scale-110 transition-transform">
                                                <Phone size={12} className="text-accent group-hover/phone:animate-pulse" />
                                            </div>
                                            <div className="flex flex-col text-left">
                                                <span className="text-white text-[10px] font-black tracking-wider uppercase leading-none mb-0.5">Заказ такси</span>
                                                <span className="text-accent text-xs font-bold leading-none">+7 (978) 275-79-07</span>
                                            </div>
                                        </a>
                                        <div className="flex flex-col gap-1.5">
                                            <a href="https://wa.me/79782757907" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="w-8 h-8 rounded-full hover:scale-125 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(37,211,102,0.6)] active:scale-95 active:duration-75 transition-all duration-300 shadow-lg overflow-hidden flex justify-center items-center backdrop-blur-md">
                                                <img src="/images/whatsapp.png" alt="WhatsApp" className="w-full h-full" />
                                            </a>
                                            <a href="https://t.me/+79782757907" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="w-8 h-8 rounded-full hover:scale-125 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(0,136,204,0.6)] active:scale-95 active:duration-75 transition-all duration-300 shadow-lg overflow-hidden flex justify-center items-center backdrop-blur-md">
                                                <img src="/images/telegram.png" alt="Telegram" className="w-full h-full" />
                                            </a>
                                            <a href="https://max.ru/u/f9LHodD0cOKRGsPwyyH38wFRJXzuvqZlhXq10g7urwZmxvWE5cSmhXgel2c" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="w-8 h-8 rounded-full hover:scale-125 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] active:scale-95 active:duration-75 transition-all duration-300 shadow-lg overflow-hidden flex justify-center items-center backdrop-blur-md">
                                                <img src="/images/max.png" alt="Max" className="w-full h-full" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 flex-grow flex flex-col items-center text-center bg-surface relative pointer-events-none">
                                    <h3 className="text-xl font-bold text-white mb-2 tracking-wide">Такси {route.title}</h3>
                                    <p className="text-accent text-sm font-semibold mb-4 uppercase tracking-widest">Низкие цены</p>

                                    <div className="mt-auto w-full flex items-center justify-between border-t border-white/10 pt-4">
                                        <span className="text-slate-400 text-sm">Цена со скидкой</span>
                                        <span className="text-white font-bold bg-white/10 px-3 py-1 rounded-md">от {route.prices.economy} ₽</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default RoutesPage;
