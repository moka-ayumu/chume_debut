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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
