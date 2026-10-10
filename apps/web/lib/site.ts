import type { Metadata } from "next";

export const SITE_URL = "https://nubo.davidumoru.me";
export const SITE_NAME = "Nubo";
export const SITE_TITLE = "Nubo - Open-source icons for React and SVG";
export const SITE_DESCRIPTION =
  "An open-source icon family for apps, sites, docs and slides. Every icon comes in Line, Fill and Duo, for React or plain SVG.";
export const REPO_URL = "https://github.com/davidumoru/nubo-icons";

// Next replaces openGraph and twitter wholesale rather than merging them with the layout's, so every page
// builds its full set here instead of inheriting part of it.
export function pageMetadata({
  title,
  description,
  path,
  canonical = path,
  image,
}: {
  title?: string;
  description: string;
  path: string;
  canonical?: string;
  image: string;
}): Metadata {
  const fullTitle = title ? `${title} - ${SITE_NAME}` : SITE_TITLE;
  return {
    ...(title ? { title: { absolute: fullTitle } } : {}),
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@theumoru",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
