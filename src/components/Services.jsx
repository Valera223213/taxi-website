import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Wind, Users, Briefcase } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const cars = [
    // Эконом
    { id: 1, class: 'Эконом', name: 'Лада Гранта', ac: 'Да', seats: 3, baggage: 2, image: '/images/granta.png' },
    { id: 2, class: 'Эконом', name: 'Renault Logan', ac: 'Да', seats: 3, baggage: 2, image: '/images/logan.png' },
    { id: 3, class: 'Эконом', name: 'Лада Приора', ac: 'Да', seats: 3, baggage: 2, image: '/images/priora.png' },
    { id: 4, class: 'Эконом', name: 'Chevrolet Lanos', ac: 'Да', seats: 3, baggage: 2, image: '/images/lanos.png' },

    // Стандарт
    { id: 5, class: 'Стандарт', name: 'VW Polo', ac: 'Да', seats: 4, baggage: 3, image: '/images/polo.png' },
    { id: 6, class: 'Стандарт', name: 'Kia Rio', ac: 'Да', seats: 4, baggage: 3, image: '/images/rio.png' },
    { id: 7, class: 'Стандарт', name: 'Lada Vesta', ac: 'Да', seats: 4, baggage: 3, image: '/images/vesta.png' },
    { id: 8, class: 'Стандарт', name: 'Hyundai Solaris', ac: 'Да', seats: 4, baggage: 3, image: '/images/solaris.png' },

    // Комфорт
    { id: 9, class: 'Комфорт', name: 'Skoda Octavia', ac: 'Да', seats: 4, baggage: 4, image: '/images/octavia.png' },
    { id: 10, class: 'Комфорт', name: 'Mazda 6', ac: 'Да', seats: 4, baggage: 4, image: '/images/mazda6.png' },
    { id: 11, class: 'Комфорт', name: 'Kia Optima', ac: 'Да', seats: 4, baggage: 4, image: '/images/optima.png' },
    { id: 12, class: 'Комфорт', name: 'VW Jetta', ac: 'Да', seats: 4, baggage: 4, image: '/images/jetta.png' },

    // Бизнес
    { id: 13, class: 'Бизнес', name: 'Kia K5', ac: 'Да', seats: 4, baggage: 4, image: '/images/k5.png' },
    { id: 14, class: 'Бизнес', name: 'Hyundai Sonata', ac: 'Да', seats: 4, baggage: 4, image: '/images/sonata.png' },
    { id: 15, class: 'Бизнес', name: 'Toyota Camry', ac: 'Да', seats: 4, baggage: 4, image: '/images/camry.png' },
    { id: 16, class: 'Бизнес', name: 'Nissan Teana', ac: 'Да', seats: 4, baggage: 4, image: '/images/teana.png' },

    // Минивен
    { id: 17, class: 'Минивэн', name: 'VW Transporter', ac: 'Да', seats: 'до 8', baggage: 7, image: '/images/transporter.png' },
    { id: 18, class: 'Минивэн', name: 'Toyota Alphard', ac: 'Да', seats: 'до 8', baggage: 7, image: '/images/alphard.png' },
    { id: 19, class: 'Минивэн', name: 'Kia Carnival', ac: 'Да', seats: 'до 8', baggage: 7, image: '/images/carnival.png' },
    { id: 20, class: 'Минивэн', name: 'Mercedes Vito', ac: 'Да', seats: 'до 8', baggage: 7, image: '/images/vito.png' },
];

const Services = () => {
    return (
        <section className="py-24 bg-[#0f141f] relative overflow-visible">
            {/* Custom Swiper Styles for Pagination */}
            <style>{`
                .swiper-pagination-custom {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 1.5rem;
                    gap: 0.75rem;
                }
                .swiper-pagination-custom .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    background-color: rgba(255, 255, 255, 0.2);
                    border-radius: 9999px;
                    opacity: 1;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    margin: 0 !important;
                }
                .swiper-pagination-custom .swiper-pagination-bullet:hover {
                    background-color: rgba(255, 255, 255, 0.4);
                }
                .swiper-pagination-custom .swiper-pagination-bullet-active {
                    width: 32px;
                    background-color: #d97706 !important; /* accent color */
                }
                .swiper-button-disabled {
                    opacity: 0 !important;
                    pointer-events: none;
                }
            `}</style>

            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4 text-white"
                    >
                        Наши автомобили
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: 80 }}
                        viewport={{ once: true }}
                        className="h-1 bg-accent mx-auto rounded-full mb-6"
                    ></motion.div>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                        Выберите подходящий класс авто для вашей поездки. Все фотографии автомобилей можно будет заменить на ваши реальные снимки.
                    </p>
                </div>
            </div> {/* Close text container */}

            {/* Carousel Container */}
            <div className="relative max-w-7xl mx-auto group px-4">
                {/* Custom Navigation Arrows */}
                <button
                    className="swiper-button-prev-custom absolute left-6 md:-left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-primary-light border border-white/10 text-slate-300 rounded-full flex justify-center items-center shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:bg-accent hover:border-accent hover:text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                    aria-label="Previous cars"
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    className="swiper-button-next-custom absolute right-6 md:-right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-primary-light border border-white/10 text-slate-300 rounded-full flex justify-center items-center shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:bg-accent hover:border-accent hover:text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                    aria-label="Next cars"
                >
                    <ChevronRight size={24} />
                </button>

                <div className="pb-8 pt-4">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={24}
                        slidesPerView={1}
                        slidesPerGroup={1}
                        grabCursor={true}
                        preloadImages={true}
                        updateOnImagesReady={true}
                        watchSlidesProgress={true}
                        breakpoints={{
                            1024: {
                                slidesPerView: 4,
                                slidesPerGroup: 4
                            }
                        }}
                        navigation={{
                            prevEl: '.swiper-button-prev-custom',
                            nextEl: '.swiper-button-next-custom'
                        }}
                        pagination={{
                            clickable: true,
                            el: '.swiper-pagination-custom',
                        }}
                        className="w-full h-full"
                    >
                        {cars.map((car, index) => (
                            <SwiperSlide key={car.id} className="h-auto">
                                <div
                                    className="h-full bg-primary-dark border border-white/5 rounded-2xl overflow-hidden shadow-2xl hover:border-accent/30 hover:shadow-[0_0_30px_rgba(217,119,6,0.15)] transition-all flex flex-col pointer-events-none"
                                >
                                    {/* Header Badge */}
                                    <div className="bg-accent py-2 text-center text-white font-bold tracking-wider uppercase text-sm">
                                        {car.class}
                                    </div>

                                    {/* Car Image Area */}
                                    <div className="h-44 bg-white/5 relative overflow-hidden flex items-center justify-center p-4">
                                        <img
                                            src={car.image}
                                            alt={car.name}
                                            className="w-[200px] h-[120px] object-contain drop-shadow-2xl relative z-10 pointer-events-none select-none"
                                            draggable="false"
                                        />
                                        {/* Subtle gradient over image space */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent opacity-60 z-0"></div>
                                    </div>

                                    {/* Car Details */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-2xl font-bold text-white text-center mb-6 pointer-events-auto">{car.name}</h3>

                                        {/* Specs Footer */}
                                        <div className="mt-auto grid flex-grow gap-2 pointer-events-auto">
                                            <div className="bg-primary-light py-2.5 px-4 rounded-lg flex items-center justify-between border border-white/5">
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <Wind size={16} /> <span className="text-sm">Кондиционер</span>
                                                </div>
                                                <span className="font-semibold text-slate-200 text-sm">{car.ac}</span>
                                            </div>
                                            <div className="bg-primary-light py-2.5 px-4 rounded-lg flex items-center justify-between border border-white/5">
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <Users size={16} /> <span className="text-sm">Мест</span>
                                                </div>
                                                <span className="font-semibold text-slate-200 text-sm">{car.seats}</span>
                                            </div>
                                            <div className="bg-primary-light py-2.5 px-4 rounded-lg flex items-center justify-between border border-white/5">
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <Briefcase size={16} /> <span className="text-sm">Багаж</span>
                                                </div>
                                                <span className="font-semibold text-slate-200 text-sm">{car.baggage}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Swiper Pagination Target */}
                <div className="swiper-pagination-custom"></div>
            </div>
        </section>
    );
};

export default Services;
