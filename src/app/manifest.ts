import type { MetadataRoute } from "next";
import { webManifest } from "@/lib/ai-resources/web-manifest";

/** Web app manifest, served at /manifest.webmanifest. */
export default function manifest(): MetadataRoute.Manifest {
  return webManifest();
}
