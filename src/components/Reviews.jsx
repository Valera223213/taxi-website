import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
    {
        name: 'Екатерина В.',
        date: '12 августа 2025',
        text: '«Заказывали трансфер из аэропорта в Гурзуф с двумя детьми. Очень боялась, что забудут кресла (у других сервисов такое было). Здесь водитель Сергей отзвонился за день, приехал заранее. Машина — новенькая Шкода, идеально чистая. Доехали очень мягко, детей не укачало. Спасибо за спокойное начало отпуска!»',
        rating: 5,
        image: '/images/review1.jpg'
    },
    {
        name: 'Игорь М.',
        date: '28 сентября 2025',
        text: '«Ездил по работе в Севастополь. Нужны были официальные документы для бухгалтерии. Водитель встретил с табличкой, помог с чемоданом, в конце поездки выдал чек с QR-кодом. Цена совпала с той, что была на сайте, копейка в копейку. Сервис уровня столицы, рекомендую.»',
        rating: 5,
        image: '/images/review2.jpg'
    },
    {
        name: 'Оксана П.',
        date: '03 октября 2025',
        text: '«Прилетели поздно ночью, рейс задержали на 2 часа. Была уверена, что такси уедет. Нет, водитель дождался, встретил, еще и чемоданы сам донес. Машина была с нормальным кондиционером, а не просто открытыми окнами. Очень вежливый и аккуратный водитель. Теперь только с вами.»',
        rating: 5,
        image: '/images/review3.jpg'
    }
];

const Rating = ({ stars }) => {
    return (
        <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={16}
                    className={i < stars ? "fill-accent text-accent" : "text-white/20"}
                />
            ))}
        </div>
    );
};

const Reviews = () => {
    return (
        <section className="py-24 bg-[#0f141f] relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4 text-white"
                    >
                        Оценки наших пассажиров
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: 80 }}
                        viewport={{ once: true }}
                        className="h-1 bg-accent mx-auto rounded-full mb-6"
                    ></motion.div>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Реальные отзывы людей, которые доверили нам свои поездки.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-primary-dark border border-white/5 p-8 rounded-2xl shadow-2xl hover:shadow-[0_0_30px_rgba(217,119,6,0.1)] hover:border-accent/30 transition-all flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-surface border border-white/5 shadow-inner flex items-center justify-center overflow-hidden shrink-0">
                                        <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white leading-tight">{review.name}</h4>
                                        <span className="text-xs text-slate-500">{review.date}</span>
                                    </div>
                                </div>
                                <div className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded-md border border-green-500/20">
                                    Проверен
                                </div>
                            </div>

                            <Rating stars={review.rating} />

                            <p className="text-slate-300 text-sm leading-relaxed flex-grow">
                                {review.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
