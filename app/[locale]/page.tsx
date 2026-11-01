import { setRequestLocale } from "next-intl/server";
import { AboutSection } from "@/components/main/about-section";
import { ContactSection } from "@/components/main/contact-section";
import { FoundersSection } from "@/components/main/founders-section";
import { GallerySection } from "@/components/main/gallery-section";
import { HeroSection } from "@/components/main/hero-section";
import { ImageSliderSection } from "@/components/main/image-slider-section";
import { ProjectsSection } from "@/components/main/projects-section";
import { AppsSection } from "@/components/main/apps-section";
import { ServicesSection } from "@/components/main/services-section";
import { TeamSection } from "@/components/main/team-section";

// Content is edited in the ERP, not per request. Prerender and refresh hourly
// so the shared database is queried on revalidation, not on every page view.
export const revalidate = 3600;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ImageSliderSection locale={locale} />
      <ServicesSection />
      <FoundersSection />
      <ProjectsSection locale={locale} />
      <AppsSection locale={locale} />
      {/* <TeamSection /> */}
      {/* <GallerySection /> */}
      <ContactSection />
    </main>
  );
}
