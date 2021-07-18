module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        primary: "#fb5474",
        secondary: "#e2758f",
        danger: "#dd426a",
        hover: "#FF7C76",
      },
      maxHeight: {
        "9/10": "90%",
      },
      borderRadius: {
        // large: "5rem",
      },
      dropShadow: {
        "2xl-primary": "0 25px 25px rgba(251, 84, 116, 0.5)",
        "2xxl-white": "0 0px 10px rgba(255, 255, 255, 1)",
        "2xxl-whitepink": "0 0px 10px rgba(255, 164, 202, 1)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
