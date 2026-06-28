import HomePageClient from "./[locale]/HomePageClient";
import { SiteFooter, SiteHeader } from "@/components/site";
import { SiteAds } from "@/components/ads/SiteAds";
import { getLocalizedContent } from "@/lib/content";
import { getMessagesForLocale } from "@/lib/messages";
import { absoluteUrl } from "@/lib/utils";

export default function RootPage() {
  const messages = getMessagesForLocale("en");
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: messages.site.name,
    url: absoluteUrl("/"),
    description: messages.metadata.description,
    publisher: {
      "@type": "Organization",
      name: messages.site.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
        width: 512,
        height: 512,
      },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/og-image.png"),
      width: 1200,
      height: 630,
    },
    image: absoluteUrl("/images/og-image.png"),
  };

  return (
    <div className="min-h-screen bg-[#090b12] text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <SiteHeader />
      <SiteAds />
      <HomePageClient locale="en" messages={messages} content={getLocalizedContent("en")} />
      <SiteFooter />
    </div>
  );
}
