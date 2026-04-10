import { useEffect, useState } from "react";
import useAxiosPublic from "../UseAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import Admin from "../../assets/image/Admi Badge.jpg";
import Trainer from "../../assets/image/Trainer.png";

const LatestPost = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const AxiosPublic = useAxiosPublic();

  useEffect(() => {
    AxiosPublic.get(`/newpost?limit=6&page=1`).then((res) => {
      setLatestPosts(res.data.classes);
    });
  }, []);

  const handlevoteForum = (id) => {
    AxiosPublic.post(`/updatevote/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Vote Added!",
          text: "Thank you for your vote",
          confirmButtonText: "OK",
        });
      }
    });
  };

  return (
    <section className="py-20 px-6 w-full" style={{ background: "#f9f6f1" }}>

      {/* Header */}
      <div className="text-center mb-14">
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-widest text-[#b37800] mb-4"
          style={{ background: "rgba(255,183,50,0.12)", border: "1px solid rgba(255,183,50,0.35)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFB732]" />
          Community Forum
        </span>

        <h2
          className="text-4xl font-bold text-[#1a1a2e] mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Latest{" "}
          <span className="text-[#FFB732] italic">Community</span> Posts
        </h2>

        <p className="text-[14.5px] font-light text-[#7a8394] max-w-md mx-auto leading-relaxed mb-4">
          Stay updated with the latest discussions, tips, and news from our fitness community.
        </p>
        <div className="w-14 h-[3px] bg-[#FFB732] rounded-full mx-auto" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {latestPosts.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{ border: "0.5px solid #ece8e0" }}
          >
            {/* Gold top bar */}
            <div className="h-[3px] bg-[#FFB732]" />

            {/* Card Body */}
            <div className="p-5 flex-1 flex flex-col">

              {/* Badge row */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-[#1a1a2e] flex items-center justify-center flex-shrink-0">
                  <img
                    src={item.Badge === "Admin" ? Admin : Trainer}
                    alt={item.Badge}
                    className="w-4 h-4 object-contain"
                  />
                </div>
                <span
                  className="text-[11px] font-medium text-[#b37800] uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(255,183,50,0.1)",
                    border: "0.5px solid rgba(255,183,50,0.3)",
                  }}
                >
                  {item.Badge}
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-[16px] font-bold text-[#1a1a2e] mb-2 leading-snug"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {item.Title}
              </h3>

              {/* Description */}
              <p className="text-[13px] text-[#7a8394] leading-relaxed flex-1 line-clamp-3 mb-4">
                {item.Description}
              </p>
            </div>

            {/* Card Footer */}
            <div
              className="flex items-center justify-between px-5 py-3.5"
              style={{ borderTop: "0.5px solid #ece8e0" }}
            >
              {/* Vote section */}
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                  style={{ background: "#f9f6f1", border: "0.5px solid #ece8e0" }}
                >
                  <span className="text-[11px] text-[#b0b8c8] font-medium">Votes</span>
                  <span className="text-[14px] font-bold text-[#1a1a2e]">{item.vote}</span>
                </div>

                <button
                  onClick={() => handlevoteForum(item._id)}
                  className="w-[34px] h-[34px] rounded-lg bg-[#1a1a2e] flex items-center justify-center transition-all duration-200 hover:bg-[#FFB732] active:scale-95 group"
                >
                  <svg
                    className="w-[15px] h-[15px] stroke-[#FFB732] group-hover:stroke-[#1a1000]"
                    fill="none"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </div>

              {/* Read more */}
              {/* <button
                className="text-[12px] font-medium text-[#1a1a2e] px-3.5 py-1.5 rounded-lg transition-all duration-200 hover:bg-[#1a1a2e] hover:text-[#FFB732]"
                style={{ border: "0.5px solid #1a1a2e" }}
              >
                Read More →
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestPost;