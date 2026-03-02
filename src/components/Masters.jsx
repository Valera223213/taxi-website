import { motion } from 'framer-motion';
import { Award, MapPin, Shield } from 'lucide-react';

const drivers = [
    {
        name: 'Алексей',
        experience: '15 лет',
        title: 'Мастер горных дорог',
        description: 'Знает каждый поворот на серпантине Ялта — Севастополь. Его пассажиров не укачивает, а поездка проходит незаметно за созерцанием видов.',
        icon: <MapPin className="text-accent mb-4" size={32} />,
        image: 'https://api.dicebear.com/7.x/notionists/svg?seed=Alexey&backgroundColor=f3f4f6'
    },
    {
        name: 'Дмитрий',
        experience: '12 лет',
        title: 'Специалист по логистике',
        description: 'Знает тайные подъезды к закрытым санаториям ЮБК. Довезет до дверей корпуса, даже если навигатор «потерял» адрес.',
        icon: <Award className="text-accent mb-4" size={32} />,
        image: 'https://api.dicebear.com/7.x/notionists/svg?seed=Dmitry&backgroundColor=f3f4f6'
    },
    {
        name: 'Михаил',
        experience: '18 лет',
        title: 'VIP-сопровождение',
        description: 'Идеальный выбор для VIP-встреч. Пунктуален до минуты, помогает с любым объемом багажа и гарантирует полную конфиденциальность разговоров.',
        icon: <Shield className="text-accent mb-4" size={32} />,
        image: 'https://api.dicebear.com/7.x/notionists/svg?seed=Mikhail&backgroundColor=f3f4f6'
    }
];

const Masters = () => {
    return (
        <section className="py-24 bg-surface relative">
            <div className="container mx-auto px-4 z-10 relative">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4 text-white"
                    >
                        Водители, которым доверяют
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: 80 }}
                        viewport={{ once: true }}
                        className="h-1 bg-accent mx-auto rounded-full"
                    ></motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {drivers.map((driver, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-primary-dark border border-white/5 shadow-2xl p-8 rounded-2xl relative overflow-hidden group hover:border-accent/30 hover:shadow-[0_0_30px_rgba(217,119,6,0.15)] transition-all"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-surface border border-white/5 flex items-center justify-center shrink-0 shadow-inner overflow-hidden">
                                    <img src={driver.image} alt={driver.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{driver.name}</h3>
                                    <p className="text-sm font-semibold text-accent uppercase tracking-wider">Стаж {driver.experience}</p>
                                </div>
                            </div>

                            {driver.icon}
                            <h4 className="text-xl font-bold text-slate-200 mb-3">{driver.title}</h4>
                            <p className="text-slate-400 leading-relaxed">
                                {driver.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Masters;
