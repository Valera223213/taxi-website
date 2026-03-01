import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Send, User, Car, CalendarDays, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { sendTelegramMessage } from '../lib/telegram';

const Hero = () => {
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        date: '',
        time: '',
        carClass: 'standard',
        name: '',
        phone: '',
        comment: '',
        agree: true
    });

    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        const fetchRoutes = async () => {
            const { data } = await supabase.from('routes').select('id, title, slug');
            if (data && data.length > 0) {
                // Shuffle the routes for random presentation
                const shuffled = [...data].sort(() => 0.5 - Math.random());
                setRoutes(shuffled);
            }
        };
        fetchRoutes();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.agree) {
            alert("Необходимо согласие с условиями.");
            return;
        }

        setIsSubmitting(true);

        const message = `
🚀 <b>Новая заявка с сайта (Главный экран)</b>
📍 <b>Откуда:</b> ${formData.from}
🏁 <b>Куда:</b> ${formData.to}
📅 <b>Дата:</b> ${formData.date}
⏰ <b>Время:</b> ${formData.time}
🚕 <b>Класс авто:</b> ${formData.carClass}
👤 <b>Имя:</b> ${formData.name || 'Не указано'}
📞 <b>Телефон:</b> ${formData.phone}
💬 <b>Комментарий:</b> ${formData.comment || 'Нет комментариев'}
`;

        const success = await sendTelegramMessage(message);

        setIsSubmitting(false);

        if (success) {
            alert('Заявка успешно отправлена! Ожидайте звонка.');
            setFormData({
                from: '', to: '', date: '', time: '', carClass: 'standard',
                name: '', phone: '', comment: '', agree: true
            });
        } else {
            alert('Для работы заявок необходимо указать Chat ID в настройках!');
        }
    };

    return (
        <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
            {/* Background Image & Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url("/hero-bg.png")',
                }}
            >
                <div className="absolute inset-0 bg-primary-dark/80 bg-gradient-to-r from-primary-dark via-primary-dark/80 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 z-10 relative flex flex-col lg:flex-row items-center gap-12">

                {/* Left Side: Headlines */}
                <div className="w-full lg:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            boxShadow: [
                                "0px 0px 0px 0px rgba(217,119,6,0)",
                                "0px 0px 20px 5px rgba(217,119,6,0.5)",
                                "0px 0px 0px 0px rgba(217,119,6,0)"
                            ]
                        }}
                        transition={{
                            opacity: { duration: 0.6 },
                            y: { duration: 0.6 },
                            boxShadow: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                        className="inline-block px-7 py-3 rounded-full bg-accent text-white mb-6 text-sm md:text-base font-black tracking-widest uppercase shadow-lg"
                    >
                        Междугороднее такси Крыма и Юга России
                    </motion.div>

                    {/* Desktop Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white hidden lg:block"
                    >
                        Цена не изменится. <br />
                        Машина приедет. <span className="text-accent italic">Гарантируем.</span>
                    </motion.h1>

                    {/* Mobile Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-5xl font-bold leading-tight mb-5 text-white lg:hidden"
                    >
                        Доедете по фиксированной цене. <br />
                        <span className="text-accent italic leading-relaxed inline-block mt-1">Без отмен и опозданий.</span>
                    </motion.h1>

                    {/* Desktop Paragraph */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed hidden lg:block mb-8 font-medium"
                    >
                        Фиксированный тариф по Крыму и Югу России на иномарках не старше 7 лет. Данные водителя за 24 часа, встреча с табличкой и пустой багажник. В салоне — только климат-контроль и тишина.
                    </motion.p>

                    {/* Mobile Paragraph */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-[17px] text-slate-300 leading-relaxed lg:hidden mb-1 font-medium"
                    >
                        Иномарки с кондиционером точно в срок. Встретим с табличкой, донесем багаж, везем плавно — на серпантинах не укачает.
                    </motion.p>

                    {/* Mobile Quick Actions (hidden on lg screens) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="lg:hidden mt-8 mb-4 flex flex-col gap-4"
                    >
                        {/* Phone Button */}
                        <a href="tel:+79782757907" className="flex items-center justify-center gap-3 w-full bg-surface/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl hover:border-accent/50 transition-colors group">
                            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent transition-colors">
                                <Phone className="text-accent group-hover:text-white transition-colors" size={24} />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-wide">+7 (978) 275-79-07</span>
                        </a>

                        {/* Order Button */}
                        <a href="#mobile-booking" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-5 rounded-2xl text-[19px] uppercase tracking-wider shadow-[0_0_20px_-5px_rgba(5,150,105,0.5)] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 mt-2">
                            Рассчитать стоимость <Car size={24} />
                        </a>
                    </motion.div>
                </div>

                {/* Right Side: Glassmorphism Booking Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="w-full lg:w-1/2 max-w-lg mx-auto"
                >
                    {/* Desktop Complex Form (hidden on mobile) */}
                    <div id="desktop-booking" className="hidden lg:block bg-surface/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative z-20 scroll-mt-24">
                        <h3 className="text-2xl font-bold text-white mb-6">Расчет и заказ такси</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Откуда */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wide">Откуда <span className="text-accent">*</span></label>
                                    <input
                                        type="text" name="from" value={formData.from} onChange={handleChange} required
                                        placeholder="Например: Аэропорт"
                                        className="w-full px-4 py-2.5 bg-surface/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all placeholder-slate-500"
                                    />
                                </div>
                                {/* Куда */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wide">Куда <span className="text-accent">*</span></label>
                                    <input
                                        type="text" name="to" value={formData.to} onChange={handleChange} required
                                        placeholder="Например: Ялта"
                                        className="w-full px-4 py-2.5 bg-surface/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all placeholder-slate-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {/* Дата */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wide">Дата подачи <span className="text-accent">*</span></label>
                                    <input
                                        type="date" name="date" value={formData.date} onChange={handleChange} required
                                        className="w-full px-4 py-2.5 bg-surface/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all placeholder-slate-500"
                                    />
                                </div>
                                {/* Время */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wide">Время <span className="text-accent">*</span></label>
                                    <input
                                        type="time" name="time" value={formData.time} onChange={handleChange} required
                                        className="w-full px-4 py-2.5 bg-surface/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all placeholder-slate-500"
                                    />
                                </div>
                                {/* Класс */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wide">Класс авто <span className="text-accent">*</span></label>
                                    <select
                                        name="carClass" value={formData.carClass} onChange={handleChange}
                                        className="w-full px-4 py-2.5 bg-surface/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all appearance-none"
                                    >
                                        <option value="economy">Эконом</option>
                                        <option value="standard">Стандарт</option>
                                        <option value="comfort">Комфорт</option>
                                        <option value="business">Бизнес</option>
                                        <option value="minivan">Минивэн</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-1">
                                    <input type="text" name="name" placeholder="Ваше имя" value={formData.name} onChange={handleChange}
                                        className="w-full px-4 py-2.5 bg-surface/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-accent outline-none placeholder-slate-500" />
                                </div>
                                <div className="sm:col-span-1">
                                    <input type="tel" name="phone" placeholder="Телефон *" required value={formData.phone} onChange={handleChange}
                                        className="w-full px-4 py-2.5 bg-surface/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-accent outline-none placeholder-slate-500" />
                                </div>
                            </div>

                            <div>
                                <textarea
                                    name="comment" rows="2" placeholder="Комментарий (рейс, количество пассажиров, детские кресла)"
                                    value={formData.comment} onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-surface/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-accent outline-none placeholder-slate-500 resize-none"
                                ></textarea>
                            </div>

                            <div className="flex items-start gap-2 pt-2">
                                <input
                                    type="checkbox" name="agree" id="agree" checked={formData.agree} onChange={handleChange}
                                    className="mt-1 shrink-0 accent-accent"
                                />
                                <label htmlFor="agree" className="text-[11px] text-slate-400 leading-tight">
                                    Нажимая на кнопку, я подтверждаю, что ознакомлен и согласен с условиями <a href="#" className="text-accent hover:underline">политики конфиденциальности</a> и <a href="#" className="text-accent hover:underline">пользовательским соглашением</a>.
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors shadow-[0_0_20px_-5px_rgba(5,150,105,0.5)] mt-4 text-lg tracking-wide uppercase flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={24} />
                                        Отправка...
                                    </>
                                ) : (
                                    <>
                                        Зафиксировать цену и авто <Car size={24} />
                                    </>
                                )}
                            </button>

                        </form>
                    </div>

                    {/* Mobile Simple Form (like CTA Form), hidden on desktop */}
                    <div id="mobile-booking" className="lg:hidden bg-surface border border-primary-light p-6 rounded-2xl shadow-xl mt-4 relative z-20">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-[13px] font-bold text-slate-300 mb-2">Ваше имя</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User size={18} className="text-slate-500" />
                                    </div>
                                    <input
                                        type="text" name="name" value={formData.name} onChange={handleChange} required
                                        className="block w-full pl-11 pr-4 py-3.5 bg-primary-dark border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all text-sm"
                                        placeholder="Как к вам обращаться"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[13px] font-bold text-slate-300 mb-2">Номер телефона</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Phone size={18} className="text-slate-500" />
                                    </div>
                                    <input
                                        type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                                        className="block w-full pl-11 pr-4 py-3.5 bg-primary-dark border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all text-sm"
                                        placeholder="+7 (___) ___-__-__"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[13px] font-bold text-slate-300 mb-2">Класс авто</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Car size={18} className="text-slate-500" />
                                    </div>
                                    <select
                                        name="carClass" value={formData.carClass} onChange={handleChange}
                                        className="block w-full pl-11 pr-8 py-3.5 bg-primary-dark border border-accent/50 rounded-xl text-white font-medium focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent appearance-none transition-all text-sm shadow-[0_0_15px_-3px_rgba(217,119,6,0.15)]"
                                    >
                                        <option value="economy">Эконом</option>
                                        <option value="standard">Стандарт</option>
                                        <option value="comfort">Комфорт</option>
                                        <option value="business">Бизнес</option>
                                        <option value="minivan">Минивэн</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[13px] font-bold text-slate-300 mb-2">Дата подачи</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <CalendarDays size={16} className="text-slate-500" />
                                        </div>
                                        <input
                                            type="date" name="date" value={formData.date} onChange={handleChange} required
                                            className="block w-full pl-9 pr-3 py-3.5 bg-primary-dark border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[13px] font-bold text-slate-300 mb-2">Время</label>
                                    <input
                                        type="time" name="time" value={formData.time} onChange={handleChange} required
                                        className="block w-full px-4 py-3.5 bg-primary-dark border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_-3px_rgba(5,150,105,0.4)]"
                            >
                                Рассчитать стоимость <Car size={20} />
                            </button>

                            <p className="text-center text-xs text-slate-500 mt-4 leading-tight">
                                Нажимая на кнопку, вы даете согласие на обработку персональных данных.
                            </p>
                        </form>
                    </div>

                    {/* Small Routes Marquee */}
                    <div className="mt-5 w-full overflow-hidden bg-surface/40 backdrop-blur-md border border-white/10 rounded-2xl py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative z-20">
                        <div className="flex justify-center items-center px-4 mb-2">
                            <span className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-1">Популярные направления</span>
                        </div>
                        {routes.length > 0 && (
                            <div className="relative w-full flex overflow-x-hidden pt-1">
                                <motion.div
                                    className="flex whitespace-nowrap items-center hover:[animation-play-state:paused]"
                                    animate={{ x: ["0%", "-50%"] }}
                                    transition={{ ease: "linear", duration: 35, repeat: Infinity }}
                                >
                                    {[...routes, ...routes].map((route, idx) => (
                                        <Link
                                            to={`/routes/${route.slug}`}
                                            key={`${route.id}-${idx}`}
                                            className="flex items-center hover:text-white transition-colors cursor-pointer group"
                                        >
                                            <span className="text-sm font-medium text-slate-300 group-hover:text-accent transition-colors mx-3">{route.title}</span>
                                            <span className="text-accent/50 text-xs shadow-sm">•</span>
                                        </Link>
                                    ))}
                                </motion.div>
                            </div>
                        )}
                    </div>

                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
