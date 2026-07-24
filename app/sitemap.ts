import type { MetadataRoute } from "next";

const SITE_URL = "https://labbstudio.pl";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
    { path: "/studio", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/wynajem", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/kontakt", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/jak-dotrzec", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/regulamin-wynajmu", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/regulamin-studia", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/polityka-prywatnosci", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
