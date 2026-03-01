import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import RoutesPage from './pages/RoutesPage';
import RouteDetailPage from './pages/RouteDetailPage';
import PreFooter from './components/PreFooter';
import AdminPage from './pages/AdminPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-primary-dark font-sans text-slate-300 selection:bg-accent selection:text-white">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/routes/:slug" element={<RouteDetailPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>

        {/* Pre-Footer Section for additional links & rotating routes */}
        <PreFooter />

        {/* Simple Footer */}
        <footer className="py-8 bg-[#0f141f] border-t border-white/5 text-center text-slate-500 text-sm mt-auto">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="shrink-0 text-slate-400">© {new Date().getFullYear()} Юг-Ок. Все права защищены.</p>

            <p className="text-[11px] text-slate-500 max-w-2xl text-center md:mx-4">
              Вся представленная на сайте информация, касающаяся товаров, работ и услуг, носит информационный характер и не является публичной офертой, определяемой положениями ст. 437 Гражданского Кодекса РФ. Все цены носят информационный характер и являются ориентировочными.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 shrink-0 mt-2 md:mt-0">
              <a href="#" className="hover:text-accent">Политика конфиденциальности</a>
              <a href="#" className="hover:text-accent">Пользовательское соглашение</a>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
