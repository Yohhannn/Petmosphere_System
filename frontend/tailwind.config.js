/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      // Include paths to your HTML and JSX/TSX files
      "./index.html", // Adjust if your index file is in a different directory
      "./src/**/*.{js,ts,jsx,tsx}", // Include all files in the src directory (update as needed)
    ],
    theme: {
      extend: {
        colors: {
          primary: "#8E57B2",   // Custom Primary Color
          secondary: "#F69332", // Custom Secondary Color
        },
        fontFamily: {
          sans: ["Public Sans", "sans-serif"],
          quicksand: ["Quicksand", "sans-serif"], // Custom font for the subfont
        },
        
        animation: {
          fadeIn: 'fadeIn 1s ease-out',
          scaleUp: 'scaleUp 1s ease-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
          scaleUp: {
            '0%': { transform: 'scale(0.8)', opacity: 0 },
            '100%': { transform: 'scale(1)', opacity: 1 },
          },
        },
      },
    },
    plugins: [require("daisyui")],  // Add DaisyUI Plugin
  }
  