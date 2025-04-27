import React from "react";
import Out_Footer from "./components/out_footer";
import Out_Header from "./components/out_header";
import { Link } from "react-router-dom";

export function meta() {
  return [
    { title: "( ✦ ) PETMOSPHERE" },
    { name: "description", content: "Find your perfect pet at PETMOSPHERE!" },
  ];
}

const Landing: React.FC = () => {
  return (
      <>
        {/* Sticky Header */}
        <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md animate__animated animate__fadeIn">
          <Out_Header />
        </div>

        {/* Full-Screen Background Image */}
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/main_assets/images/bg_landing_phone.svg')] sm:bg-[url('/main_assets/images/bg_landing.svg')] animate__fadeIn"
        >
          {/* Centered Container with Button Below Image */}
          <div className="flex flex-col items-center justify-center min-h-screen text-[#F4F2F2] px-4 md:px-10 font-['Public_Sans',sans-serif] animate__animated animate__fadeIn">
            {/* Image Above the Container - Responsive logic for title image */}
            <picture className="w-full flex justify-center">
              <source
                  media="(max-width: 640px)"
                  srcSet="/main_assets/images/title_landing_phone.svg"
              />
              <source
                  media="(min-width: 641px)"
                  srcSet="/main_assets/images/title_landing.svg"
              />
              <img
                  alt="Petmosphere Logo"
                  className="w-3/4 max-w-[500px] sm:w-3/4 sm:max-w-[600px] md:w-3/4 md:max-w-[700px] lg:w-3/4 lg:max-w-[800px] xl:w-3/4 xl:max-w-[900px] mx-auto mb-6 animate__animated animate__zoomIn"
              />
            </picture>

            <div className="bg-white bg-opacity-90 px-8 py-10 text-center max-w-lg w-full animate__animated animate__zoomIn">
              <div className="mt-4">
                <Link
                    to="/login"
                    className="w-full px-6 py-3 rounded-full text-lg font-semibold transition duration-300 transform bg-[#F69332] hover:bg-[#8E57B2] hover:text-white text-white scale-110"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Out_Footer />
      </>
  );
};

export default Landing;
