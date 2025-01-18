import { Helmet } from 'react-helmet';
import Banner from '../Banner/Banner';
import AboutSection from '../AboutSection/AboutSection';
import TeamSection from '../TeamSection/TeamSection';
import Subscribe from '../SubscribeSection/Subscribe';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home !</title>
            </Helmet>
            <Banner></Banner>
            <AboutSection></AboutSection>
            <TeamSection></TeamSection>
            <Subscribe></Subscribe>
        </div>
    );
};

export default Home;