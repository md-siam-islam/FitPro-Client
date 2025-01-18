import { Helmet } from 'react-helmet';
import Banner from '../Banner/Banner';
import AboutSection from '../AboutSection/AboutSection';
import TeamSection from '../TeamSection/TeamSection';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home !</title>
            </Helmet>
            <Banner></Banner>
            <AboutSection></AboutSection>
            <TeamSection></TeamSection>
        </div>
    );
};

export default Home;