import Header from "./components/Header";
import Hero from "./components/Hero";
import { getFolderImages } from "./lib/imagekit";

export default async function Home() {
  let images: string[] = [];
  try {
    images = await getFolderImages("labb_simple");
  } catch (error) {
    console.error("Failed to load ImageKit hero images:", error);
  }

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-ink">
      <Hero images={images} urlEndpoint={process.env.IMAGEKIT_URL_ENDPOINT} />
      <Header />
    </div>
  );
}
