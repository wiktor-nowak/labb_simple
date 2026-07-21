import localFont from "next/font/local";

export const magion = localFont({
  src: [
    {
      path: "../public/fonts/Magion_Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Magion_Italic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-magion",
});

export const sinter = localFont({
  src: [
    { path: "../public/fonts/Sinter_Thin.otf", weight: "100", style: "normal" },
    {
      path: "../public/fonts/Sinter_Thin_Italic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/Sinter_X-Light.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/Sinter_X-Light_Italic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/Sinter_Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Sinter_Light_Italic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Sinter_Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Sinter_Regular_Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Sinter_Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Sinter_Medium_Italic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Sinter_Demi_Italic.otf",
      weight: "600",
      style: "italic",
    },
    { path: "../public/fonts/Sinter_Bold.otf", weight: "700", style: "normal" },
    {
      path: "../public/fonts/Sinter_Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/Sinter_Black_Italic.otf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../public/fonts/Sinter_Ultra.otf",
      weight: "950",
      style: "normal",
    },
    {
      path: "../public/fonts/Sinter_Ultra_Italic.otf",
      weight: "950",
      style: "italic",
    },
  ],
  variable: "--font-sinter",
});
