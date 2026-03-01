import { motion } from 'framer-motion';

const routeTexts = [
    "Симферополь - Ялта",
    "Аэропорт - Севастополь",
    "Ялта - Алушта",
    "Симферополь - Евпатория",
    "Севастополь - Ялта",
    "Алушта - Аэропорт",
    "Евпатория - Симферополь",
    "Симферополь - Феодосия",
    "Ялта - Гаспра",
    "Мрия - Аэропорт"
];

const RoutesPreview = () => {
    return (
        <section className="py-12 bg-[#0f141f] overflow-hidden border-y border-white/5 flex flex-col items-center">

            <div className="container mx-auto px-4 mb-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Популярные направления</h2>
                <div className="h-1 bg-accent mx-auto w-40 rounded-full"></div>
            </div>

            {/* Pure Text Marquee */}
            <div className="relative w-full flex overflow-x-hidden bg-primary-dark py-4 border-y border-white/5 shadow-inner">
                <motion.div
                    className="flex whitespace-nowrap items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                >
                    {/* Duplicate array for seamless loop */}
                    {[...routeTexts, ...routeTexts].map((text, idx) => (
                        <div key={idx} className="flex items-center">
                            <span className="text-xl md:text-2xl font-semibold text-slate-400 mx-6 hover:text-accent transition-colors cursor-pointer">
                                {text}
                            </span>
                            {/* Separator Bullet */}
                            <span className="text-accent text-2xl mx-2">•</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="mt-10 text-center">
                <a href="/routes" className="inline-block px-8 py-3 bg-transparent border border-accent/50 text-accent rounded-full font-bold hover:bg-accent hover:text-white transition-colors shadow-[0_0_15px_-3px_rgba(217,119,6,0.3)] hover:shadow-[0_0_20px_rgba(217,119,6,0.6)]">
                    Смотреть все маршруты
                </a>
            </div>

        </section>
    );
};

export default RoutesPreview;
