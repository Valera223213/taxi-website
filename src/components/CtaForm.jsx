import { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Phone, User, CalendarDays, Loader2 } from 'lucide-react';
import { sendTelegramMessage } from '../lib/telegram';

const CtaForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        carClass: 'comfort',
        date: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const message = `
🛎 <b>Новая заявка с сайта (Нижняя форма)</b>
👤 <b>Имя:</b> ${formData.name}
📞 <b>Телефон:</b> ${formData.phone}
🚕 <b>Класс авто:</b> ${formData.carClass}
📅 <b>Дата:</b> ${formData.date || 'Не указана'}
`;

        const success = await sendTelegramMessage(message);

        setIsSubmitting(false);

        if (success) {
            alert('Заявка отправлена! Мы свяжемся с вами в течение 5 минут.');
            setFormData({ name: '', phone: '', carClass: 'comfort', date: '' });
        } else {
            alert('Для работы заявок необходимо указать Chat ID в настройках!');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section className="py-24 relative overflow-hidden bg-[#0f141f]">
            {/* Decorative blurry background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-accent/15 blur-[120px] rounded-full z-0 pointer-events-none"></div>

            <div className="container mx-auto px-4 z-10 relative">
                <div className="max-w-5xl mx-auto bg-primary-dark rounded-3xl overflow-hidden shadow-2xl border border-white/5 flex flex-col lg:flex-row">

                    <div className="p-10 lg:p-16 lg:w-1/2 flex flex-col justify-center relative bg-gradient-to-br from-[#0a0f1d] to-primary-dark">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent pointer-events-none"></div>

                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight z-10"
                        >
                            Забронируйте автомобиль и забудьте о проблемах с дорогой.
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-300 text-lg leading-relaxed mb-8 z-10"
                        >
                            Оставьте заявку, и мы закрепим за вами конкретный автомобиль выбранного класса. Цена останется неизменной вне зависимости от погоды или пробок.
                        </motion.p>

                        <div className="space-y-4 hidden md:block z-10">
                            <div className="flex items-center gap-3 text-emerald-400">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                    <span className="font-bold text-sm">✓</span>
                                </div>
                                <span className="font-medium text-sm lg:text-base">Четкая цена до посадки</span>
                            </div>
                            <div className="flex items-center gap-3 text-emerald-400">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                    <span className="font-bold text-sm">✓</span>
                                </div>
                                <span className="font-medium text-sm lg:text-base">Водитель встретит с табличкой</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary-dark p-8 lg:p-16 lg:w-1/2 relative border-l border-white/5">
                        <motion.form
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Ваше имя</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User size={18} className="text-slate-500" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="block w-full pl-11 pr-4 py-3 bg-[#0a0f1d] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                        placeholder="Как к вам обращаться"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Номер телефона</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Phone size={18} className="text-slate-500" />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="block w-full pl-11 pr-4 py-3 bg-[#0a0f1d] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                        placeholder="+7 (___) ___-__-__"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Класс авто</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Car size={18} className="text-slate-500" />
                                        </div>
                                        <select
                                            name="carClass"
                                            value={formData.carClass}
                                            onChange={handleChange}
                                            className="block w-full pl-11 pr-8 py-3 bg-[#0a0f1d] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent appearance-none transition-all"
                                        >
                                            <option value="economy">Эконом</option>
                                            <option value="standard">Стандарт</option>
                                            <option value="comfort">Комфорт</option>
                                            <option value="business">Бизнес</option>
                                            <option value="minivan">Минивэн</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Дата поездки</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <CalendarDays size={18} className="text-slate-500" />
                                        </div>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="block w-full pl-11 pr-4 py-3 bg-[#0a0f1d] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-8 bg-accent hover:bg-accent-hover disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-accent/50 group flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Отправка...
                                    </>
                                ) : (
                                    "Оставить заявку"
                                )}
                                <Car className="group-hover:translate-x-1 transition-transform" size={20} />
                            </button>

                            <p className="text-center text-xs text-slate-500 mt-4">
                                Нажимая на кнопку, вы даете согласие на обработку персональных данных.
                            </p>
                        </motion.form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CtaForm;
