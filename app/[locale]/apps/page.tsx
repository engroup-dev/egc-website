import { AppsSection } from "@/components/main/apps-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "تطبيقات ومنظومة EGC | تحميل النسخ للكمبيوتر والهاتف"
      : "EGC Applications | Download Desktop & Mobile Apps",
    description: isAr
      ? "حمّل منظومة المجموعة الهندسية (EGC Management & Builder) لأجهزة الكمبيوتر والهواتف الذكية لمتابعة وإدارة المشاريع لحظياً."
      : "Download EGC Management and EGC Builder apps for Desktop and Mobile to monitor and manage engineering projects in real-time.",
  };
}

export default async function AppsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="min-h-screen pt-20">
      <AppsSection locale={locale} />
    </main>
  );
}
