import React from 'react';
import WebVersion from "~/routes/utility/util_web_version";

const Out_Footer = () => {
  return (
    <footer className="bg-[#8E57B2] text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">

        {/* Logo and Description */}
        <div className="flex flex-col items-center md:items-start">
          <a href="/team" className="flex flex-col items-center">
            <div className="w-6 h-6 mb-1">
              <img src="/main_assets/icons/icon_team.png" alt="Team" />
            </div>
            <p className="text-lg text-white">
              <b className="hover:text-[#F69332]">ABOUT OUR TEAM</b>
            </p>
          </a>
          <p className="text-sm text-white text-center mt-2">
            Join us in adopting pets and giving them a forever home!
          </p>
        </div>


        {/* Social Media Links */}
        <div className="flex flex-row gap-4 mt-4 md:mt-0">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F69332] transition"
          >
            <img src="/main_assets/icons/icon_fb.svg" alt="Facebook" className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F69332] transition"
          >
            <img src="/main_assets/icons/icon_insta.svg" alt="Instagram" className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-gray-300 mt-4">
        © 2025 PETMOSPHERE. All Rights Reserved
        <div style={{ color: "#f0d7c0" }}>{WebVersion}</div>
      </div>
    </footer>
  );
};

export default Out_Footer;
