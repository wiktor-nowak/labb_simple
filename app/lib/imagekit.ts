const IMAGEKIT_API_BASE = "https://api.imagekit.io/v1";

type ImageKitFile = {
  type: "file" | "folder";
  fileType?: "image" | "non-image";
  url: string;
};

/** Server-only: lists every image file directly inside an ImageKit folder. */
export async function getFolderImages(folderPath: string): Promise<string[]> {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("IMAGEKIT_PRIVATE_KEY is not set");
  }

  const auth = Buffer.from(`${privateKey}:`).toString("base64");
  const path = folderPath.startsWith("/") ? folderPath : `/${folderPath}`;

  const res = await fetch(
    `${IMAGEKIT_API_BASE}/files?path=${encodeURIComponent(path)}&fileType=image&limit=1000`,
    {
      headers: { Authorization: `Basic ${auth}` },
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) {
    throw new Error(
      `ImageKit list files failed: ${res.status} ${await res.text()}`,
    );
  }

  const files: ImageKitFile[] = await res.json();
  return files.filter((file) => file.type === "file").map((file) => file.url);
}
