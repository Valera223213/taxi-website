import { motion } from 'framer-motion';
import { BadgeCheck, Clock, MessageSquare } from 'lucide-react';

const trustItems = [
    {
        icon: <BadgeCheck className="text-accent h-10 w-10 mb-4" />,
        title: '100% подача авто',
        description: 'Если мы подтвердили заказ — машина будет у вашего выхода. Мы не отменяем поездки ради более выгодных заказов.'
    },
    {
        icon: <MessageSquare className="text-accent h-10 w-10 mb-4" />,
        title: 'За 24 часа до выезда',
        description: 'Вы получаете SMS с прямым номером водителя, маркой и госномером авто. Никакой неопределенности в день вылета.'
    },
    {
        icon: <Clock className="text-accent h-10 w-10 mb-4" />,
        title: '0 ₽ за ожидание',
        description: 'Мы сами отслеживаем задержки рейсов и поездов. Водитель будет ждать вас столько, сколько нужно, без доплат.'
    }
];

const Trust = () => {
    return (
        <section className="py-24 bg-surface relative">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        Гарантии спокойной поездки
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: 80 }}
                        viewport={{ once: true }}
                        className="h-1 bg-accent mx-auto rounded-full"
                    ></motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {trustItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-primary-dark border border-primary-light p-8 rounded-2xl hover:border-accent/40 hover:shadow-[0_0_30px_rgba(217,119,6,0.1)] transition-all group"
                        >
                            <div className="transform group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Trust;
