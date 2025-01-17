import { Link } from "react-router-dom";
import img from "../../assets/image/Gym-structure-1080x675.png"
const AboutSection = () => {
    return (
      <section className="bg-gray-100 py-12 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          {/* Left Side: Image */}
          <div className="lg:w-1/2">
            <img
              src={img}
              alt="About Us"
              className="rounded-lg shadow-lg"
            />
          </div>
  
          {/* Right Side: Text Content */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">About Our Organization</h2>
            <p className="text-gray-600 text-lg mb-6">
              We are dedicated to bringing the best services to our clients, focusing on 
              innovation, sustainability, and excellence. Our mission is to empower individuals 
              and communities to achieve their goals through our tailored solutions.
            </p>
            <p className="text-gray-600 text-lg mb-6">
              With a team of experienced professionals, we strive to deliver outstanding results 
              and create lasting relationships with our clients. Join us in making a difference 
              in the world.
            </p>
            <Link to={'/classes'}><button className="btn bg-[#FFA500] px-6 py-3 rounded-full text-white font-semibold">
              Learn More
            </button></Link>
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutSection;
  