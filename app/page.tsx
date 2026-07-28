import Header from "./components/Header";
import Hero from "./components/Hero";
import { getFolderImages } from "./lib/imagekit";

export default async function Home() {
  const [mobileImages, desktopImages] = await Promise.all([
    getFolderImages("LABB/labb_mobile").catch((error) => {
      console.error("Failed to load ImageKit mobile hero images:", error);
      return [];
    }),
    getFolderImages("LABB/labb_desktop").catch((error) => {
      console.error("Failed to load ImageKit desktop hero images:", error);
      return [];
    }),
  ]);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-ink">
      <Hero
        mobileImages={mobileImages}
        desktopImages={desktopImages}
        urlEndpoint={process.env.IMAGEKIT_URL_ENDPOINT}
      />
      <Header />
    </div>
  );
}
