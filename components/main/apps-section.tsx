import QRCode from "qrcode";
import {
  ShieldCheck,
  Zap,
  HardHat,
  Layers,
  MonitorSmartphone,
} from "lucide-react";
import { AppsShowcase } from "./apps-showcase";

export async function AppsSection({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  // Official store URLs
  const iosAppStoreUrl =
    "https://apps.apple.com/us/app/egc-builder/id6757635369";
  const androidPlayStoreUrl =
    "https://play.google.com/store/apps/details?id=com.egc.builder";

  // Direct download endpoints for desktop
  const windowsDownloadUrl = "/api/download/windows";
  const macDownloadUrl = "/api/download/mac";
  const allReleasesUrl =
    "https://github.com/engroup-dev/egc-management/releases";

  // Generate crisp QR codes for both stores (Error correction H ensures instant scan from screen)
  const [iosQr, androidQr] = await Promise.all([
    QRCode.toDataURL(iosAppStoreUrl, {
      width: 140,
      margin: 1,
      color: { dark: "#18181b", light: "#ffffff" },
      errorCorrectionLevel: "H",
    }),
    QRCode.toDataURL(androidPlayStoreUrl, {
      width: 140,
      margin: 1,
      color: { dark: "#18181b", light: "#ffffff" },
      errorCorrectionLevel: "H",
    }),
  ]);

  return (
    <section
      id="apps"
      className="py-20 md:py-28 bg-card/40 border-t border-b border-border/70 scroll-mt-20 relative overflow-hidden"
    >
      {/* Subtle architectural background texture */}
      <div className="absolute inset-0 bg-radial from-accent/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card text-xs font-semibold text-accent shadow-xs tracking-wide">
            <MonitorSmartphone size={15} className="text-accent" />
            <span>
              {isAr
                ? "البنية الرقمية المتكاملة للمجموعة الهندسية"
                : "EGC Digital Architecture Ecosystem"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-foreground leading-tight">
            {isAr
              ? "منظومة الإدارة والمتابعة الميدانية"
              : "Integrated Management & Field System"}
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {isAr
              ? "بنية رقمية موحدة تجمع بين إدارة المشاريع والمالية وجداول الكميات من أجهزة الكمبيوتر، والمتابعة الميدانية ورصد الإنجاز اللحظي عبر الهواتف الذكية في مواقع العمل."
              : "A unified platform combining financial controls and BOQs from desktop workstations with real-time field progress tracking on mobile devices."}
          </p>
        </div>

        {/* ─── The Luxury Interactive App Showcase ────────────────────── */}
        <AppsShowcase
          locale={locale}
          iosQr={iosQr}
          androidQr={androidQr}
          windowsDownloadUrl={windowsDownloadUrl}
          macDownloadUrl={macDownloadUrl}
          iosAppStoreUrl={iosAppStoreUrl}
          androidPlayStoreUrl={androidPlayStoreUrl}
          allReleasesUrl={allReleasesUrl}
        />

        {/* 4 Architectural Innovation Pillars */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-card border border-border rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
              <HardHat size={20} />
            </div>
            <h4 className="font-semibold text-sm text-foreground">
              {isAr ? "الربط الميداني اللحظي" : "Site Connection"}
            </h4>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              {isAr
                ? "توثيق الأعمال اليومية للمقاولين ومتابعة نسب الإنجاز الفعلي على أرض الواقع بالصور اللحظية."
                : "Daily contractor logs and tracking actual on-site milestone progress."}
            </p>
          </div>

          <div className="p-6 bg-card border border-border rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
              <ShieldCheck size={20} />
            </div>
            <h4 className="font-semibold text-sm text-foreground">
              {isAr ? "حوكمة ومصفوفة الصلاحيات" : "Access Governance"}
            </h4>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              {isAr
                ? "تحديد دقيق لصلاحيات كل مهندس ومشرف (عرض، كلفة، تنفيذ، جداول كميات) على كل مشروع بشكل مستقل."
                : "Granular multi-layer permissions for engineers and project managers."}
            </p>
          </div>

          <div className="p-6 bg-card border border-border rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
              <Zap size={20} />
            </div>
            <h4 className="font-semibold text-sm text-foreground">
              {isAr ? "المزامنة السحابية الفورية" : "Cloud Sync"}
            </h4>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              {isAr
                ? "قاعدة بيانات سحابية موحدة وفورية تضمن مزامنة لحظية وحفظ كافة السجلات والمستندات بأعلى درجات الأمان."
                : "Centralized real-time cloud sync keeping all project records and data secure."}
            </p>
          </div>

          <div className="p-6 bg-card border border-border rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
              <Layers size={20} />
            </div>
            <h4 className="font-semibold text-sm text-foreground">
              {isAr ? "جداول الكميات والكلف (BOQ)" : "BOQ & Financial Precision"}
            </h4>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              {isAr
                ? "حساب دقيق لكلف المشاريع، الدفعات المستحقة، وتوزيع الحصص وسجلات الصرف بدقة هندسية متناهية."
                : "Detailed financial accounting, contractor disbursements, and cost controls."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
