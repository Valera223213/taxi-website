import { useParams, Navigate, Link } from 'react-router-dom';
import CtaForm from '../components/CtaForm';
import { CheckCircle2, Navigation, Phone, MessageCircle, Send } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';

const RouteDetailPage = () => {
    const { slug } = useParams();
    const [route, setRoute] = useState(null);
    const [allRoutes, setAllRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRouteData = async () => {
            setLoading(true);
            try {
                // Fetch specific route
                const { data: routeData, error: routeError } = await supabase
                    .from('routes')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (routeError) throw routeError;
                setRoute(routeData);

                // Fetch all routes for popular directions
                const { data: allData, error: allError } = await supabase
                    .from('routes')
                    .select('id, slug, title');

                if (allError) throw allError;
                setAllRoutes(allData || []);

            } catch (err) {
                console.error("Error fetching route:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRouteData();
        window.scrollTo(0, 0);
    }, [slug]);

    const randomPopularRoutes = useMemo(() => {
        if (!route || allRoutes.length === 0) return [];
        const otherRoutes = allRoutes.filter(r => r.slug !== route.slug);
        // Shuffle the array and take the first 3
        return [...otherRoutes].sort(() => 0.5 - Math.random()).slice(0, 3);
    }, [route, allRoutes]);

    const carClasses = [
        { id: 'economy', name: 'ЭКОНОМ', image: '/images/granta.png' },
        { id: 'standard', name: 'СТАНДАРТ', image: '/images/logan.png' },
        { id: 'comfort', name: 'КОМФОРТ', image: '/images/k5.png' },
        { id: 'business', name: 'БИЗНЕС', image: '/images/camry.png' },
        { id: 'minivan', name: 'МИНИВЭН', image: '/images/vito.png' },
    ];

    if (loading) {
        return (
            <div className="pt-28 pb-10 bg-primary-dark min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
        );
    }

    if (error || !route) {
        return <Navigate to="/routes" replace />;
    }

    return (
        <div className="pt-28 pb-10 bg-primary-dark min-h-screen font-sans text-slate-300">
            <div className="container mx-auto px-4">

                {/* Breadcrumbs */}
                <div className="flex items-center flex-wrap gap-y-2 text-sm text-slate-400 mb-8 bg-white/5 py-3 px-5 rounded-lg border border-white/5">
                    <span className="font-medium mr-2">Вы здесь:</span>
                    <Link to="/" className="text-accent hover:text-accent-hover transition-colors shrink-0">Главная</Link>
                    <span className="mx-2 shrink-0">/</span>
                    <Link to="/routes" className="hover:text-accent transition-colors shrink-0">Маршруты</Link>
                    <span className="mx-2 shrink-0">/</span>
                    <span className="text-white font-medium break-words max-w-full">Такси {route.title}</span>
                </div>

                {/* Main SEO Header */}
                <h1 className="text-3xl md:text-5xl font-black text-center text-white mb-10 tracking-tight">
                    Такси {route.title}
                </h1>

                {/* Content Block */}
                <div className="max-w-4xl mx-auto bg-surface rounded-2xl shadow-lg border border-white/10 p-8 md:p-12 mb-16">
                    <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6 text-[15px] md:text-base">
                        <p>{route.fullDesc}</p>
                        <p>На линии выходят только подготовленные водители с опытом дальних поездок. Маршрут выстраивается заранее с учётом дорожной обстановки, что позволяет выбрать оптимальный путь и обеспечить своевременное прибытие.</p>
                        <p className="font-medium text-white border-l-4 border-accent pl-4 italic bg-white/5 p-4 rounded-r-lg">
                            Протяжённость маршрута составляет примерно {route.distance}, среднее время в дороге — {route.time} в зависимости от ситуации на трассе.
                        </p>
                    </div>
                </div>

                {/* Pricing Grid Header */}
                <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-10">
                    Цена такси {route.title}
                </h2>

                {/* Pricing Cards Grid (Competitor Style) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6 mb-20 bg-surface/50 p-6 md:p-10 rounded-3xl border border-white/5">
                    {carClasses.map((carClass) => (
                        <div key={carClass.id} className="bg-surface rounded-xl overflow-hidden shadow-lg flex flex-col items-center hover:-translate-y-1 hover:shadow-2xl hover:border-accent/40 transition-all duration-300 border border-white/10 group">
                            {/* Car Image Area */}
                            <div className="w-full pt-6 pb-2 px-4 flex justify-center items-center h-40 relative">
                                <img
                                    src={carClass.image}
                                    alt={`Такси ${carClass.name}`}
                                    className="max-w-full max-h-full object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        // Fallback if image not found during dev
                                        e.target.onerror = null;
                                        e.target.src = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=300&q=80";
                                    }}
                                />
                            </div>

                            {/* Content Area */}
                            <div className="w-full text-center pb-6 border-t border-white/10 pt-5 bg-white/5">
                                <h3 className="font-bold text-white tracking-wide mb-1.5">{carClass.name}</h3>
                                <div className="text-accent font-black text-xl mb-4">{route.prices[carClass.id]} руб</div>

                                <a
                                    href="/#contacts"
                                    className="inline-block bg-[#25D366] text-white text-sm font-bold px-6 py-2 rounded-full hover:bg-green-600 transition-colors shadow-sm shadow-green-500/20"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const cta = document.getElementById('contacts');
                                        if (cta) cta.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    Заказать
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Additional SEO Details Block */}
                <div className="max-w-4xl mx-auto bg-surface rounded-2xl shadow-lg border border-white/10 p-8 md:p-12 mb-20">
                    <div className="text-center mb-10 border-b border-white/10 pb-8">
                        <h3 className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-[0.2em]">ТЕЛЕФОН ДЛЯ ЗАКАЗА</h3>
                        <a href="tel:+79782757907" className="text-3xl md:text-4xl font-black text-accent hover:text-accent-hover transition-colors inline-block hover:scale-105 duration-300">
                            +7 (978) 275-79-07
                        </a>
                    </div>

                    <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-p:leading-relaxed text-[15px] md:text-base">
                        {route.extra_seo ? (
                            <div dangerouslySetInnerHTML={{ __html: route.extra_seo }} />
                        ) : (
                            <>
                                <p>Стоимость такси <strong>{route.title}</strong> рассчитывается индивидуально — с учётом класса автомобиля, количества пассажиров и дополнительных пожеланий, таких как заезды или длительные остановки. Итоговая сумма согласовывается заранее и остаётся фиксированной — никаких доплат по прибытии.</p>

                                <p className="font-bold text-white mt-8 mb-5 text-lg">Уточнить актуальную цену такси {route.title} можно несколькими способами:</p>
                                <ul className="list-none pl-0 space-y-4 mb-8">
                                    <li className="flex items-center text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5"><span className="text-xl mr-4">📞</span><span>Позвонить оператору;</span></li>
                                    <li className="flex items-center text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5"><span className="text-xl mr-4">💬</span><span>Написать в чат на сайте;</span></li>
                                    <li className="flex items-center text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5"><span className="text-xl mr-4">📱</span><span>Отправить сообщение в мессенджер (WhatsApp, Telegram, Max).</span></li>
                                </ul>

                                <p className="font-bold text-white mt-10 mb-5 text-lg">Что включено в услугу такси {route.title}:</p>
                                <ul className="list-none pl-0 space-y-4">
                                    <li className="flex items-start text-slate-300 bg-white/5 p-4 rounded-xl border border-white/5"><span className="text-2xl mr-4 mt-0.5">🧒</span><span><strong>Детское кресло</strong> — предоставляется бесплатно по предварительному запросу.</span></li>
                                    <li className="flex items-start text-slate-300 bg-white/5 p-4 rounded-xl border border-white/5"><span className="text-2xl mr-4 mt-0.5">🏷️</span><span><strong>Скидка 10%</strong> при оформлении трансфера туда и обратно.</span></li>
                                    <li className="flex items-start text-slate-300 bg-white/5 p-4 rounded-xl border border-white/5"><span className="text-2xl mr-4 mt-0.5">🐾</span><span><strong>Перевозка питомцев</strong> — по согласованию.</span></li>
                                    <li className="flex items-start text-slate-300 bg-white/5 p-4 rounded-xl border border-white/5"><span className="text-2xl mr-4 mt-0.5">📄</span><span><strong>Предоставление документов</strong> и чеков (для командировочных) — по запросу.</span></li>
                                </ul>

                                <div className="mt-12 p-6 bg-accent/10 border border-accent/20 rounded-xl">
                                    <p className="m-0 text-slate-200">Такси <strong>{route.title}</strong> от сервиса «Юг-Ок» — это своевременная подача автомобиля, комфортная поездка и профессиональная организация маршрута. Забронировать трансфер можно по телефону или через онлайн-форму — диспетчер работает круглосуточно.</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Popular Directions Block */}
                <div className="max-w-4xl mx-auto mb-20 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                        Популярные направления
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-left max-w-4xl mx-auto">
                        {randomPopularRoutes.map(popularRoute => (
                            <Link
                                key={popularRoute.id}
                                to={`/routes/${popularRoute.slug}`}
                                className="text-accent hover:text-accent-hover hover:underline transition-colors flex items-center justify-center md:justify-start"
                            >
                                <span className="text-slate-500 mr-2 text-xl leading-none">•</span>
                                Такси {popularRoute.title}
                            </Link>
                        ))}
                    </div>

                    {/* Route Image Output */}
                    <div className="mt-12 max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-64 md:h-80 relative group">
                        <img
                            src={route.image_url}
                            alt={`Такси ${route.title}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80";
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-black/40 to-transparent"></div>

                        {/* Top Overlay: Contact & Messengers */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10 transition-opacity">
                            <a href="tel:+79782757907" className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3 shadow-lg hover:bg-black/80 hover:border-accent/50 hover:scale-105 active:scale-95 transition-all duration-300 group/phone cursor-pointer">
                                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 border border-accent/20 group-hover/phone:scale-110 transition-transform">
                                    <Phone size={16} className="text-accent group-hover/phone:animate-pulse" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-white text-xs font-black tracking-widest uppercase leading-none mb-1">Заказ такси</span>
                                    <span className="text-accent text-[15px] font-bold leading-none tracking-wide">+7 (978) 275-79-07</span>
                                </div>
                            </a>
                            <div className="flex flex-col gap-2">
                                <a href="https://wa.me/79782757907" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="w-10 h-10 rounded-full hover:scale-125 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(37,211,102,0.6)] active:scale-95 transition-all duration-300 shadow-xl overflow-hidden flex justify-center items-center backdrop-blur-md border border-white/20">
                                    <img src="/images/whatsapp.png" alt="WhatsApp" className="w-full h-full" />
                                </a>
                                <a href="https://t.me/+79782757907" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="w-10 h-10 rounded-full hover:scale-125 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,136,204,0.6)] active:scale-95 transition-all duration-300 shadow-xl overflow-hidden flex justify-center items-center backdrop-blur-md border border-white/20">
                                    <img src="/images/telegram.png" alt="Telegram" className="w-full h-full" />
                                </a>
                                <a href="https://max.ru/u/f9LHodD0cOKRGsPwyyH38wFRJXzuvqZlhXq10g7urwZmxvWE5cSmhXgel2c" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="w-10 h-10 rounded-full hover:scale-125 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] active:scale-95 transition-all duration-300 shadow-xl overflow-hidden flex justify-center items-center backdrop-blur-md border border-white/20">
                                    <img src="/images/max.png" alt="Max" className="w-full h-full" />
                                </a>
                            </div>
                        </div>
                        <div className="absolute bottom-6 left-0 right-0 px-6">
                            <h4 className="text-2xl font-bold text-white mb-1 shadow-black drop-shadow-lg">Такси {route.title}</h4>
                            <p className="text-accent font-semibold tracking-wide uppercase text-sm shadow-black drop-shadow-md">Комфорт и безопасность</p>
                        </div>
                    </div>
                </div>

                {/* Guarantees Box */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl text-white flex flex-col items-start relative overflow-hidden group">
                        <div className="absolute right-[-20%] top-[-20%] text-white/5 group-hover:scale-110 transition-transform duration-500">
                            <CheckCircle2 size={150} />
                        </div>
                        <h4 className="font-bold text-lg mb-2 relative z-10">ФИКСИРОВАННЫЙ ТАРИФ</h4>
                        <p className="text-sm text-blue-100 relative z-10">Стоимость заказа не меняется во время поездки</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-2xl text-white flex flex-col items-start relative overflow-hidden group">
                        <div className="absolute right-[-20%] top-[-20%] text-white/5 group-hover:scale-110 transition-transform duration-500">
                            <Navigation size={150} />
                        </div>
                        <h4 className="font-bold text-lg mb-2 relative z-10">КАЧЕСТВЕННЫЙ СЕРВИС</h4>
                        <p className="text-sm text-blue-100 relative z-10">Проверенные водители, чистые автомобили</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl text-white flex flex-col items-start relative overflow-hidden group">
                        <div className="absolute right-[-20%] top-[-20%] text-white/5 group-hover:scale-110 transition-transform duration-500">
                            <CheckCircle2 size={150} />
                        </div>
                        <h4 className="font-bold text-lg mb-2 relative z-10">САМЫЕ НИЗКИЕ ЦЕНЫ</h4>
                        <p className="text-sm text-blue-100 relative z-10">Гарантия низких цен. Оплата картой или наличными</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-2xl text-white flex flex-col items-start relative overflow-hidden group">
                        <div className="absolute right-[-20%] top-[-20%] text-white/5 group-hover:scale-110 transition-transform duration-500">
                            <Navigation size={150} />
                        </div>
                        <h4 className="font-bold text-lg mb-2 relative z-10">РАННЕЕ БРОНИРОВАНИЕ</h4>
                        <p className="text-sm text-blue-100 relative z-10">Ранний заказ такси на любую дату, без предоплаты</p>
                    </div>
                </div>

                {/* Form Section */}
                <div id="contacts" className="scroll-mt-24">
                    <h3 className="text-2xl font-bold text-center text-white mb-8">Оформить заявку</h3>
                    <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                        <CtaForm />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RouteDetailPage;
