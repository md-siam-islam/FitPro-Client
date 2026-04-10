import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../assets/image/img1.jpg";
import img2 from "../../assets/image/img2.jpg";
import img3 from "../../assets/image/img3.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  // const slideData = [
  //   {
  //     image: img1,
  //     title: "PUSH YOUR LIMITS",
  //     heading: "Build Your Body, Transform Your Life",
  //     description: "Join the elite fitness community and get access to world-class trainers and personalized workout plans.",
  //     btnText: "Explore Classes",
  //     link: "/classes"
  //   },
  //   {
  //     image: img2,
  //     title: "STAY MOTIVATED",
  //     heading: "Expert Training for Better Results",
  //     description: "Our certified trainers are here to guide you every step of the way. No more excuses, just results.",
  //     btnText: "Meet Trainers",
  //     link: "/trainer"
  //   },
  //   {
  //     image: img3,
  //     title: "JOIN THE TRIBE",
  //     heading: "FitPro Community is Waiting for You",
  //     description: "Share your progress, join forums, and stay connected with fitness enthusiasts around the globe.",
  //     btnText: "Join Community",
  //     link: "/forum"
  //   }
  // ];

  return (
    // <div className="w-full overflow-hidden"> 
    //   <Carousel
    //     showArrows={true}
    //     autoPlay={true}
    //     infiniteLoop={true}
    //     showThumbs={false}
    //     showStatus={false}
    //     interval={5000}
    //     transitionTime={800}
    //     className="w-full"
    //   >
    //     {slideData.map((slide, index) => (
    //       <div key={index} className="relative h-[500px] md:h-[600px] lg:h-[750px] w-full">
    //         {/* Background Image */}
    //         <img
    //           src={slide.image}
    //           alt={slide.title}
    //           className="w-full h-full object-cover"
    //         />
            
    //         {/* Dark Overlay with Content */}
    //         <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
    //           <div className="max-w-4xl px-6 text-center text-white">
    //             <p className="text-[#FFA500] font-bold tracking-[4px] mb-4 animate-bounce">
    //               {slide.title}
    //             </p>
    //             <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
    //               {slide.heading}
    //             </h1>
    //             <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
    //               {slide.description}
    //             </p>
    //             <Link to={slide.link}>
    //               <button className="bg-[#FFA500] hover:bg-white hover:text-[#FFA500] text-white px-10 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-110 shadow-lg">
    //                 {slide.btnText}
    //               </button>
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </Carousel>
    // </div>

    <div className="relative flex min-h-[600px] w-full overflow-hidden">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${img1})` }}
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(10,10,20,0.93) 0%, rgba(10,10,20,0.82) 50%, rgba(10,10,20,0.45) 100%)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-1 min-w-0 flex-col justify-center px-12 py-16">
        
        {/* Tag */}
        <div
          className="mb-4 flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs uppercase tracking-widest"
          style={{
            background: "rgba(255,183,50,0.12)",
            border: "0.5px solid rgba(255,183,50,0.45)",
            color: "#FFB732",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ background: "#FFB732" }}
          />
          About Our Organization
        </div>

        {/* Headline */}
        <h1
          className="mb-3 text-4xl font-black leading-tight tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif", color: "#f5f0e8" }}
        >
          Empowering People.
          <br />
          <span className="italic" style={{ color: "#FFB732" }}>
            Delivering Excellence.
          </span>
        </h1>

        {/* Divider */}
        <div
          className="mb-4 h-[3px] w-14 rounded-full"
          style={{ background: "#FFB732" }}
        />

        {/* Description */}
        <p className="mb-4 max-w-[540px] text-sm font-light leading-relaxed text-slate-400">
          We bring the best services to our clients — grounded in innovation,
          sustainability, and excellence. Our mission is to empower individuals
          and communities to achieve their goals through tailored solutions.
        </p>

        {/* Pills */}
        <div className="mb-5 flex flex-wrap gap-2">
          {["Innovation", "Sustainability", "Excellence", "Lasting Relationships"].map(
            (item) => (
              <span
                key={item}
                className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-slate-300"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "0.5px solid rgba(255,255,255,0.1)",
                }}
              >
                <span
                  className="h-1 w-1 rounded-full flex-shrink-0"
                  style={{ background: "#FFB732" }}
                />
                {item}
              </span>
            )
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            className="rounded-lg px-6 py-2.5 text-sm font-medium transition hover:opacity-90 active:scale-95"
            style={{ background: "#FFB732", color: "#1a1000" }}
          >
            Learn More →
          </button>
          <button
            className="rounded-lg px-5 py-2.5 text-sm text-slate-400 transition hover:text-yellow-400"
            style={{ border: "0.5px solid rgba(255,255,255,0.15)" }}
          >
            Contact Us
          </button>
        </div>

      </div>

      

      {/* Stats Column */}
      <div className="relative z-10 hidden w-48 flex-shrink-0 flex-col justify-center gap-3 py-12 pr-9 lg:flex">
        {[
          { num: "500+", label: "Clients Served" },
          { num: "10+", label: "Years of Trust" },
          { num: "98%", label: "Satisfaction Rate" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-4"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "0.5px solid rgba(255,183,50,0.15)",
              borderLeft: "2px solid #FFB732",
            }}
          >
            <div
              className="text-2xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: "#FFB732" }}
            >
              {stat.num}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-slate-500">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

    </div>
    
  );
};

export default Banner;