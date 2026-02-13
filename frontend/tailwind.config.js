const plugin = require("@tailwindcss/typography");
const defaultTheme = require("tailwindcss/defaultTheme");

const FONT_SCALE = 0.85;

const scaleFontSize = (value, scale = FONT_SCALE) => {
  if (typeof value === "number") return value * scale;
  if (typeof value !== "string") return value;

  const match = value.match(/^([\d.]+)(rem|em|px)$/);
  if (!match) return value;

  const [, number, unit] = match;
  return `${parseFloat(number) * scale}${unit}`;
};

const scaledFontSize = Object.fromEntries(
  Object.entries(defaultTheme.fontSize).map(([key, val]) => {
    if (Array.isArray(val)) {
      const [size, options] = val;
      const scaledSize = scaleFontSize(size);

      if (options && options.lineHeight !== undefined) {
        return [
          key,
          [
            scaledSize,
            { ...options, lineHeight: scaleFontSize(options.lineHeight) },
          ],
        ];
      }

      return [key, [scaledSize, options]];
    }

    return [key, scaleFontSize(val)];
  }),
);

module.exports = {
  plugins: [require("@tailwindcss/typography")],
  theme: {
    fontSize: scaledFontSize,
    extend: {
      animation: {
        "star-movement-bottom":
          "star-movement-bottom linear infinite alternate",
        "star-movement-top": "star-movement-top linear infinite alternate",
      },
      keyframes: {
        "star-movement-bottom": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(-100%, 0%)", opacity: "0" },
        },
        "star-movement-top": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(100%, 0%)", opacity: "0" },
        },
      },
    },
  },
};
