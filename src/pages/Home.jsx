import Hero from '../components/Hero';
import Trust from '../components/Trust';
import Services from '../components/Services';
import Masters from '../components/Masters';
import Reviews from '../components/Reviews';
import CtaForm from '../components/CtaForm';
import SeoBlock from '../components/SeoBlock';

const Home = () => {
    return (
        <main>
            <div id="home">
                <Hero />
            </div>
            {/* Fleet Section is now right after Hero per request */}
            <div id="fleet">
                <Services />
            </div>
            <Trust />
            <div id="about">
                <Masters />
                <Reviews />
            </div>
            <div id="contacts">
                <CtaForm />
            </div>

            <SeoBlock />
        </main>
    );
};

export default Home;
