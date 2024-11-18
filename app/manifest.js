export default function manifest() {
  return {
    name: "Currency Rate",
    short_name: "CurrencyRate",
    description: "Convert from one currency to another",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/rate_192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/rate_512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
