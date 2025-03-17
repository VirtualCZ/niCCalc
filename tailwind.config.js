/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-100": "#0f0e16",
        "primary-200": "#12111a",
        "primary-300": "#14131e",
        "primary-400": "#171621",
        "primary-500": "#191825", // OG
        "primary-600": "#302f3b",
        "primary-700": "#474651",
        "primary-800": "#5e5d66",
        "primary-900": "#75747c",
        "secondary-100": "#503899",
        "secondary-200": "#5e41b3",
        "secondary-300": "#6b4acc",
        "secondary-400": "#7954e6",
        "secondary-500": "#865dff", // OG
        "secondary-600": "#926dff",
        "secondary-700": "#9e7dff",
        "secondary-800": "#aa8eff",
        "secondary-900": "#b69eff",
        terciary: "#E384FF",
        quaternary: "#FFA3FD",
      },
    },
  },
  plugins: [],
};

/* module.exports = {
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      primary: "#191825",
      secondary: "#865DFF",
      terciary: "#E384FF",
      quaternary: "#FFA3FD"
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
};
 */
