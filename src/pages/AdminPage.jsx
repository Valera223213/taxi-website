import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LogOut, Plus, Edit2, Trash2, Image as ImageIcon, Save, X, Loader2 } from 'lucide-react';

// Simple Russian to English transliteration for slug generation
const translit = (str) => {
    const ru = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
        'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i',
        'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh',
        'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e',
        'ю': 'yu', 'я': 'ya',
        ' ': '-', '_': '-', ',': '', '.': '', '?': '', '!': ''
    };
    return str.toLowerCase().split('').map(char => ru[char] || char).join('').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
};

const AdminPage = () => {
    const [session, setSession] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [authError, setAuthError] = useState('');

    const [routes, setRoutes] = useState([]);
    const [loadingRoutes, setLoadingRoutes] = useState(true);

    const [editingRoute, setEditingRoute] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [savingRoute, setSavingRoute] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        full_desc: '',
        extra_seo: '',
        prices: { economy: 0, standard: 0, comfort: 0, business: 0, minivan: 0 },
        image_url: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (session) {
            fetchRoutes();
        }
    }, [session]);

    const fetchRoutes = async () => {
        setLoadingRoutes(true);
        const { data, error } = await supabase.from('routes').select('*').order('created_at', { ascending: false });
        if (!error && data) {
            setRoutes(data);
        }
        setLoadingRoutes(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoadingAuth(true);
        setAuthError('');
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setAuthError('Неверный логин или пароль');
        setLoadingAuth(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const openCreateForm = () => {
        setFormData({
            id: null,
            title: '',
            full_desc: '',
            extra_seo: '',
            prices: { economy: 0, standard: 0, comfort: 0, business: 0, minivan: 0 },
            image_url: '',
        });
        setImageFile(null);
        setImagePreview(null);
        setIsFormOpen(true);
    };

    const openEditForm = (route) => {
        setFormData({
            id: route.id,
            title: route.title || '',
            full_desc: route.full_desc || '',
            extra_seo: route.extra_seo || '',
            prices: route.prices || { economy: 0, standard: 0, comfort: 0, business: 0, minivan: 0 },
            image_url: route.image_url || '',
        });
        setImageFile(null);
        setImagePreview(route.image_url);
        setIsFormOpen(true);
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const uploadImage = async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('route-images')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('route-images').getPublicUrl(filePath);
        return data.publicUrl;
    };

    const saveRoute = async (e) => {
        e.preventDefault();
        setSavingRoute(true);

        try {
            let finalImageUrl = formData.image_url;
            if (imageFile) {
                finalImageUrl = await uploadImage(imageFile);
            }

            const routePayload = {
                title: formData.title,
                slug: translit(formData.title), // auto-generate slug for URL
                full_desc: formData.full_desc,
                extra_seo: formData.extra_seo,
                prices: formData.prices,
                image_url: finalImageUrl,
            };

            if (formData.id) {
                // Update
                const { error } = await supabase.from('routes').update(routePayload).eq('id', formData.id);
                if (error) throw error;
            } else {
                // Insert
                const { error } = await supabase.from('routes').insert([routePayload]);
                if (error) throw error;
            }

            setIsFormOpen(false);
            fetchRoutes();
        } catch (error) {
            console.error("Error saving route:", error);
            alert("Ошибка при сохранении: " + error.message);
        } finally {
            setSavingRoute(false);
        }
    };

    const deleteRoute = async (id) => {
        if (!window.confirm("Вы уверены, что хотите удалить этот маршрут?")) return;

        try {
            const { error } = await supabase.from('routes').delete().eq('id', id);
            if (error) throw error;
            fetchRoutes();
        } catch (error) {
            alert("Ошибка при удалении: " + error.message);
        }
    };

    if (!session) {
        return (
            <div className="min-h-screen bg-primary-dark pt-32 pb-20 flex items-center justify-center px-4">
                <div className="bg-surface p-8 outline outline-1 outline-white/10 rounded-2xl w-full max-w-md shadow-2xl relative z-20">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Вход для сотрудника</h2>
                    <form onSubmit={handleLogin} className="space-y-5">
                        {authError && <div className="p-3 bg-red-500/20 text-red-300 rounded-lg text-sm border border-red-500/50">{authError}</div>}

                        <div>
                            <label className="block text-slate-400 mb-2 text-sm font-medium">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-primary-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 mb-2 text-sm font-medium">Пароль</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-primary-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loadingAuth}
                            className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center"
                        >
                            {loadingAuth ? <Loader2 className="animate-spin" /> : 'Войти'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary-dark pt-28 pb-20 px-4 md:px-8 font-sans">
            <div className="max-w-6xl mx-auto relative z-20">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-surface p-6 rounded-2xl outline outline-1 outline-white/10 shadow-lg">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Панель управления</h1>
                        <p className="text-slate-400">Добавление и редактирование маршрутов</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <button
                            onClick={openCreateForm}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-lg font-bold transition-colors shadow-lg shadow-accent/20"
                        >
                            <Plus size={20} />
                            Добавить маршрут
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2.5 rounded-lg transition-colors"
                            title="Выйти"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>

                {/* Dashboard / Form Toggle */}
                {!isFormOpen ? (
                    <div className="bg-surface rounded-2xl outline outline-1 outline-white/10 shadow-2xl overflow-hidden">
                        {loadingRoutes ? (
                            <div className="p-12 flex justify-center">
                                <Loader2 className="animate-spin text-accent" size={40} />
                            </div>
                        ) : routes.length === 0 ? (
                            <div className="p-12 text-center text-slate-400">
                                Маршрутов пока нет. Добавьте первый маршрут.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-slate-300">
                                    <thead className="bg-[#131926] text-slate-400 border-b border-white/10">
                                        <tr>
                                            <th className="p-4 font-medium rounded-tl-2xl">Обложка</th>
                                            <th className="p-4 font-medium">Маршрут</th>
                                            <th className="p-4 font-medium">Эконом (От)</th>
                                            <th className="p-4 font-medium text-right rounded-tr-2xl">Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {routes.map(r => (
                                            <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="p-4">
                                                    <img src={r.image_url} alt="" className="w-16 h-12 object-cover rounded-md" onError={e => { e.target.src = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=200&q=80" }} />
                                                </td>
                                                <td className="p-4 font-bold text-white">{r.title}</td>
                                                <td className="p-4 text-accent font-semibold">{r.prices?.economy} ₽</td>
                                                <td className="p-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button onClick={() => openEditForm(r)} className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-md transition-colors" title="Редактировать"><Edit2 size={18} /></button>
                                                        <button onClick={() => deleteRoute(r.id)} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-md transition-colors" title="Удалить"><Trash2 size={18} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-surface rounded-2xl outline outline-1 outline-white/10 shadow-2xl p-6 md:p-10 mb-20 animate-fade-in-fast">
                        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                {formData.id ? <Edit2 className="text-accent" /> : <Plus className="text-accent" />}
                                {formData.id ? 'Редактировать маршрут' : 'Новый маршрут'}
                            </h2>
                            <button onClick={() => setIsFormOpen(false)} className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"><X size={24} /></button>
                        </div>

                        <form onSubmit={saveRoute} className="space-y-10">
                            {/* 1. Title */}
                            <div>
                                <label className="block text-slate-300 mb-3 font-bold text-lg">1. Название маршрута <span className="text-slate-500 text-sm font-normal ml-2">(Например: Симферополь - Ялта)</span></label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Симферополь - Ялта"
                                    className="w-full text-lg bg-primary-dark border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent transition-colors"
                                />
                            </div>

                            {/* 2. SEO 1 */}
                            <div>
                                <label className="block text-slate-300 mb-3 font-bold text-lg">2. Описание маршрута (SEO 1)</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={formData.full_desc}
                                    onChange={e => setFormData({ ...formData, full_desc: e.target.value })}
                                    placeholder="Закажите междугороднее такси по маршруту Симферополь - Ялта..."
                                    className="w-full bg-primary-dark border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent transition-colors resize-y"
                                ></textarea>
                            </div>

                            {/* 3. Prices */}
                            <div className="bg-primary-dark/50 p-6 rounded-2xl border border-white/5">
                                <label className="block text-slate-300 mb-6 font-bold text-lg">3. Цены по классам автомобилей</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
                                    {['economy', 'standard', 'comfort', 'business', 'minivan'].map(cls => (
                                        <div key={cls}>
                                            <label className="block text-slate-400 mb-2 text-sm font-bold uppercase tracking-wider">{
                                                cls === 'economy' ? 'Эконом' :
                                                    cls === 'standard' ? 'Стандарт' :
                                                        cls === 'comfort' ? 'Комфорт' :
                                                            cls === 'business' ? 'Бизнес' : 'Минивэн'
                                            }</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    required
                                                    value={formData.prices[cls] || ''}
                                                    onChange={e => setFormData({
                                                        ...formData,
                                                        prices: { ...formData.prices, [cls]: Number(e.target.value) }
                                                    })}
                                                    className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white text-lg font-bold focus:outline-none focus:border-accent transition-colors pr-10"
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₽</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 4. SEO 2 */}
                            <div>
                                <label className="block text-slate-300 mb-3 font-bold text-lg">
                                    4. Как заказать и что включено (SEO 2)
                                    <span className="text-slate-500 text-sm font-normal block mt-1">
                                        (Текст под кнопками связи. Можно использовать HTML теги, например &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;&lt;li&gt;. Оставьте пустым для стандартного шаблона)
                                    </span>
                                </label>
                                <textarea
                                    rows="6"
                                    value={formData.extra_seo}
                                    onChange={e => setFormData({ ...formData, extra_seo: e.target.value })}
                                    placeholder="<p>Стоимость такси рассчитывается индивидуально...</p>"
                                    className="w-full font-mono text-sm bg-primary-dark border border-white/10 rounded-xl px-4 py-4 text-accent focus:outline-none focus:border-accent transition-colors resize-y"
                                ></textarea>
                            </div>

                            {/* 5. Image */}
                            <div>
                                <label className="block text-slate-300 mb-3 font-bold text-lg">5. Обложка маршрута</label>

                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-primary-dark/30 p-6 rounded-2xl border border-white/5">
                                    <div className="w-full md:w-64 h-40 bg-surface rounded-xl border border-white/10 overflow-hidden flex items-center justify-center shrink-0 relative group">
                                        {imagePreview ? (
                                            <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                                        ) : (
                                            <div className="text-center flex flex-col items-center">
                                                <ImageIcon className="text-slate-500 mb-2" size={32} />
                                                <span className="text-slate-500 text-sm">Нет фото</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                            <span className="text-white text-sm font-bold">Заменить фото</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 w-full">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="block w-full text-slate-400 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 file:cursor-pointer cursor-pointer file:transition-colors transition-colors rounded-xl border border-white/5 p-2 bg-primary-dark"
                                        />
                                        <p className="text-sm text-slate-500 mt-3">Горизонтальное фото, желательно с городом. Оно будет показано в списке всех маршрутов и в самом низу на странице.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/10 flex justify-end gap-4 mt-12">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="px-6 py-3.5 text-slate-300 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-colors"
                                >
                                    Отмена
                                </button>
                                <button
                                    type="submit"
                                    disabled={savingRoute || (!imageFile && !formData.image_url)}
                                    className="px-8 py-3.5 bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg transition-colors flex items-center gap-2 shadow-lg shadow-accent/20"
                                >
                                    {savingRoute ? <Loader2 className="animate-spin" /> : <Save size={24} />}
                                    Сохранить маршрут
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
