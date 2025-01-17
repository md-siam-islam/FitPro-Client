import { Helmet } from 'react-helmet';
import Banner from '../Banner/Banner';
import AboutSection from '../AboutSection/AboutSection';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home !</title>
            </Helmet>
            <Banner></Banner>
            <AboutSection></AboutSection>
        </div>
    );
};

export default Home;