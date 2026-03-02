import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if the user has already consented
        const hasConsented = localStorage.getItem('cookie_consent');
        if (!hasConsented) {
            // Slight delay before showing so it doesn't jarringly appear instantly
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed bottom-0 left-0 right-0 z-[100] p-4 pointer-events-none"
                >
                    <div className="max-w-4xl mx-auto bg-surface/95 backdrop-blur-xl border border-white/10 p-5 md:p-6 rounded-2xl shadow-2xl pointer-events-auto text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-slate-300 text-sm md:text-[15px] max-w-2xl leading-relaxed">
                            Сайт использует сервис веб-аналитики Яндекс Метрика с помощью технологии «cookie».
                            Это позволяет нам анализировать взаимодействие посетителей с сайтом и делать его лучше.
                            Продолжая пользоваться сайтом, вы соглашаетесь с использованием файлов cookie.
                        </div>
                        <button
                            onClick={handleAccept}
                            className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                        >
                            Соглашаюсь!
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieBanner;
