import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "tailwindcss/tailwind.css";
import img1 from "../../assets/image/img1.jpg";
import img2 from "../../assets/image/img2.jpg";
import img3 from "../../assets/image/img3.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="my-16">
     <div className="max-w-7xl mx-auto">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        interval={5000}
        className="rounded-lg overflow-hidden h-full"
      >
        <div>
          <img
            src={img1}
            alt="Slide 1"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-center">
              <h2 className="text-4xl text-white font-bold mb-4">Welcome to TrackFitPro</h2>
              <p className="text-white mb-6">Your journey towards fitness starts here. Join our classes and become the best version of yourself.</p>
              <Link to={'/classes'}>

              <button
                className="bg-[#FFA500] text-white px-6 py-3 rounded-lg "
              >
                Explore Classes
              </button>
              </Link>
            </div>
          </div>
        </div>

        <div>
          <img
            src={img2}
            alt="Slide 2"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-center">
              <h2 className="text-4xl text-white font-bold mb-4">Join Our Community</h2>
              <p className="text-white mb-6">Connect with like-minded people, share your experiences, and grow together in your fitness journey.</p>
             <Link to={"/classes"}>
             <button
               
               className="bg-[#FFA500] text-white px-6 py-3 rounded-lg "
             >
               Join Community
             </button></Link>
            </div>
          </div>
        </div>

        <div>
          <img
            src={img3}
            alt="Slide 3"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-center">
              <h2 className="text-4xl text-white font-bold mb-4">Achieve Your Goals</h2>
              <p className="text-white mb-6">With expert trainers and personalized plans, track your progress and hit your fitness targets effectively.</p>
              <Link to={"/classes"}>
              <button
                className="bg-[#FFA500] text-white px-6 py-3 rounded-lg "
              >
                Set Goals
              </button>
              </Link>
            </div>
          </div>
          
        </div>

      </Carousel>
    </div>
    </div>
  );
};

export default Banner;
