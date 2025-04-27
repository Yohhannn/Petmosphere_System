import React from 'react';
import WebVersion from "~/routes/utility/util_web_version";

const In_Footer = () => {
    return (
        <footer className="bg-[#8E57B2] text-white py-6">
            {/* Bottom Text */}
            <div className="text-center text-sm text-gray-300 mt-4">
                © 2025 PETMOSPHERE. All Rights Reserved
                <div style={{ color: "#f0d7c0" }}>{WebVersion}</div>
            </div>
        </footer>
    );
};

export default In_Footer;
