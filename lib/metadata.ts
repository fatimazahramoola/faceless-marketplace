import type { Metadata } from "next";
import { SITE_NAME, SITE_TAGLINE } from "./constants";

export const SITE_URL = "https://facelessmarketplace.co.za";

export const OG_IMAGE_PATH = "/og-image.png";

const defaultOgImage = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
};

export function createPageMetadata({
  title,
  description = SITE_TAGLINE,
  path = "",
}: PageMetadataOptions = {}): Metadata {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url = `${SITE_URL}${path}`;

  return {
    title: title ?? SITE_NAME,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: path || "/",
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_ZA",
      type: "website",
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [OG_IMAGE_PATH],
    },
  };
}
