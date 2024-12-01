import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fax App",
    short_name: "Fax",
    description: "An AI-Powered chat assistant for fact-cheking",
    start_url: "/",
    display: "standalone",
    background_color: "#F2EFE4",
    theme_color: "#100F0D",
    icons: [
      {
        src: "/icon192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
