// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./src/ui/screens/**/*.{tsx,ts}",
    "./src/ui/components/**/*.{tsx,ts}",
    "./src/ui/navigation/**/*.{tsx,ts}",
  ],
  theme: {
    fontFamily: {}, //we need to keep this for tailwind-rn parser
    extend: {
      colors: {
        gray: {
          100: "#f7f7f7",
          200: "#eaeaea",
          300: "#cacaca",
          400: "#aaaaaa",
          500: "#757575",
          600: "#4c4c4c",
          700: "#202020",
          overlayStart: "rgba(32, 32, 32, 0.4)",
          overlayEnd: "rgba(32, 32, 32, 0.01)",
        },
        primary: {
          100: "#f7f2ea",
          200: "#decaaa",
          300: "#b78c47",
          400: "#976d29",
          500: "#836433",
        },
        secondary: {
          100: "#f3f6f6",
          200: "#356464",
          300: "#1C5050",
          400: "#033d3d",
          500: "#022b2b",
        },
      },
    },
  },
  plugins: [],
  // eslint-disable-next-line no-undef
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};
