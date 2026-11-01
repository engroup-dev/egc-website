"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Download,
  ShieldCheck,
  CheckCircle2,
  HardHat,
  Camera,
  Activity,
  FileSpreadsheet,
  Clock,
  ExternalLink,
  Apple,
  Play,
  Wifi,
  Battery,
  ClipboardCheck,
} from "lucide-react";

interface AppsShowcaseProps {
  locale: string;
  iosQr: string;
  androidQr: string;
  windowsDownloadUrl: string;
  macDownloadUrl: string;
  iosAppStoreUrl: string;
  androidPlayStoreUrl: string;
  allReleasesUrl: string;
}

export function AppsShowcase({
  locale,
  iosQr,
  androidQr,
  windowsDownloadUrl,
  macDownloadUrl,
  iosAppStoreUrl,
  androidPlayStoreUrl,
  allReleasesUrl,
}: AppsShowcaseProps) {
  const [activePlatform, setActivePlatform] = useState<"desktop" | "mobile">(
    "desktop",
  );
  const [mobileQrType, setMobileQrType] = useState<"ios" | "android">("ios");
  const isAr = locale === "ar";

  return (
    <div className="mt-12 space-y-10">
      {/* ─── Platform Switcher Tabs ─────────────────────────────────── */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-card border border-border shadow-xs">
          <button
            type="button"
            onClick={() => setActivePlatform("desktop")}
            className={`relative flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
              activePlatform === "desktop"
                ? "text-accent-foreground font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activePlatform === "desktop" && (
              <motion.div
                layoutId="activePlatformPill"
                className="absolute inset-0 bg-accent rounded-xl shadow-xs"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Monitor size={17} />
              <span>
                {isAr
                  ? "منظومة الإدارة والمكتب (Desktop)"
                  : "Management & Office (Desktop)"}
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActivePlatform("mobile")}
            className={`relative flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
              activePlatform === "mobile"
                ? "text-accent-foreground font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activePlatform === "mobile" && (
              <motion.div
                layoutId="activePlatformPill"
                className="absolute inset-0 bg-accent rounded-xl shadow-xs"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Smartphone size={17} />
              <span>
                {isAr
                  ? "تطبيق الموقع الميداني (EGC Builder)"
                  : "Field Site App (EGC Builder)"}
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* ─── Main Interface Workstation Window ────────────────────────── */}
      <div className="relative rounded-2xl border border-border/90 bg-card shadow-2xl overflow-hidden backdrop-blur-sm">
        {/* Window Chrome Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-muted/50 border-b border-border text-xs">
          {/* Traffic Light Window Dots */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400/80 border border-red-500/30" />
            <span className="w-3 h-3 rounded-full bg-amber-400/80 border border-amber-500/30" />
            <span className="w-3 h-3 rounded-full bg-emerald-400/80 border border-emerald-500/30" />
            <span className="text-[11px] font-mono text-muted-foreground ms-2 hidden sm:inline">
              {activePlatform === "desktop"
                ? "egc-management.workstation"
                : "egc-builder.mobile"}
            </span>
          </div>

          {/* Live Status Pill */}
          <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {isAr
                ? "المزامنة السحابية متصلة ولحظية"
                : "Cloud Real-time Connected"}
            </span>
          </div>
        </div>

        {/* Dynamic Interactive Stage */}
        <div className="p-6 md:p-10 lg:p-12">
          <AnimatePresence mode="wait">
            {activePlatform === "desktop" ? (
              /* ─── Desktop Interface Showcase ────────────────────────── */
              <motion.div
                key="desktop-stage"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                {/* Interface Preview Frame */}
                <div className="rounded-xl border border-border/80 bg-background/80 p-5 md:p-7 shadow-inner space-y-6">
                  {/* Top Bar: فندق فينيسيا */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold">
                        EGC
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="text-base font-bold text-foreground font-serif">
                            {isAr ? "مشروع فندق فينيسيا" : "Venicia Hotel Project"}
                          </span>
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {isAr ? "قيد التنفيذ • بنغازي" : "In Progress • Benghazi"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="px-2.5 py-1 rounded bg-muted border border-border font-mono text-[11px]">
                        BOQ: #2026-HTL-VEN
                      </span>
                    </div>
                  </div>

                  {/* 3 Live KPI Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {isAr ? "نسبة الإنجاز الفعلي" : "Actual Milestone Progress"}
                        </span>
                        <Activity size={14} className="text-accent" />
                      </div>
                      <div className="text-2xl font-bold font-serif text-foreground">
                        84.5%
                      </div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full w-[84.5%]" />
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {isAr ? "بنود المقايسة المعتمدة (BOQ)" : "Approved BOQ Items"}
                        </span>
                        <FileSpreadsheet size={14} className="text-accent" />
                      </div>
                      <div className="text-2xl font-bold font-serif text-foreground">
                        148 / 162
                      </div>
                      <span className="text-[10px] text-emerald-600 font-semibold">
                        {isAr ? "مطابقة تامة للمواصفات المعمارية ✓" : "Fully compliant with specs ✓"}
                      </span>
                    </div>

                    <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {isAr ? "مصفوفة الصلاحيات" : "Access Governance"}
                        </span>
                        <ShieldCheck size={14} className="text-accent" />
                      </div>
                      <div className="text-2xl font-bold font-serif text-foreground">
                        {isAr ? "4 مستويات" : "4 Levels"}
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {isAr ? "صلاحيات مشروطة لكل مهندس ومشرف" : "Granular roles per engineer"}
                      </span>
                    </div>
                  </div>

                  {/* Recent Realtime Logs Feed in Interface */}
                  <div className="rounded-lg bg-card/60 border border-border p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} className="text-accent" />
                        <span>
                          {isAr
                            ? "آخر الأنشطة والاعتمادات الميدانية اللحظية:"
                            : "Recent Site Activity & Approvals:"}
                        </span>
                      </span>
                      <span className="text-[10px] text-accent font-mono">LIVE SYNC</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2.5 rounded bg-background border border-border/60">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                          <span className="text-foreground">
                            {isAr
                              ? "اعتماد توريد الرخام الطبيعي وحجر الواجهات الخارجية"
                              : "Approved natural stone supply for exterior facade"}
                          </span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          {isAr ? "قبل 14 دقيقة" : "14m ago"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded bg-background border border-border/60">
                        <div className="flex items-center gap-2.5">
                          <Camera size={15} className="text-accent shrink-0" />
                          <span className="text-foreground">
                            {isAr
                              ? "الموقع الميداني: رفع 4 صور لتوثيق أعمال العزل المائي للأساسات"
                              : "Site log: 4 photos uploaded for foundation waterproofing"}
                          </span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          {isAr ? "قبل ساعة" : "1h ago"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ─── Integrated Desktop Actions (Clean & Direct) ──────── */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-muted/40 border border-border">
                  <div className="text-center sm:text-start">
                    <h4 className="text-sm font-bold text-foreground">
                      EGC Management
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {isAr ? "تطبيق أجهزة الكمبيوتر" : "Desktop Application"}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <a
                      href={windowsDownloadUrl}
                      className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold text-xs hover:bg-accent transition-colors shadow-xs rounded-lg group"
                    >
                      <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
                      <span>{isAr ? "تحميل لنظام Windows (.exe)" : "Download for Windows"}</span>
                    </a>

                    <a
                      href={macDownloadUrl}
                      className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border text-foreground font-semibold text-xs hover:bg-muted transition-colors shadow-xs rounded-lg group"
                    >
                      <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
                      <span>{isAr ? "تحميل لنظام Mac (.dmg)" : "Download for Mac"}</span>
                    </a>

                    <a
                      href={allReleasesUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 text-muted-foreground hover:text-accent transition-colors rounded-lg border border-border bg-card"
                      title={isAr ? "سجل جميع الإصدارات على GitHub" : "View releases on GitHub"}
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ─── Mobile Interface Showcase (EGC Builder) ───────────── */
              <motion.div
                key="mobile-stage"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* ─── Realistic iPhone 16 Pro Mockup Frame ───────────────── */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="w-[285px] sm:w-[315px] rounded-[48px] p-3 bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 border-2 border-neutral-600/70 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] relative">
                    {/* Screen Glass */}
                    <div className="rounded-[38px] bg-background border border-border/70 p-4 space-y-3.5 text-start overflow-hidden relative shadow-inner">
                      {/* iOS Status Bar */}
                      <div className="flex items-center justify-between text-[11px] font-semibold text-foreground px-1 pt-0.5">
                        <span className="tracking-tight font-mono text-[10px]">9:41</span>
                        {/* Dynamic Island */}
                        <div className="w-20 h-4 bg-black rounded-full flex items-center justify-end px-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <div className="flex items-center gap-1.5 opacity-80 text-[10px]">
                          <Wifi size={11} />
                          <span className="font-mono text-[9px]">5G</span>
                          <Battery size={13} />
                        </div>
                      </div>

                      {/* App Navigation Bar */}
                      <div className="flex items-center justify-between pt-1 border-b border-border/80 pb-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-accent text-accent-foreground flex items-center justify-center font-bold text-xs shadow-2xs">
                            R
                          </div>
                          <div>
                            <p className="text-xs font-bold text-foreground leading-tight">
                              EGC Builder
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              {isAr ? "الموقع الميداني" : "Field App"}
                            </p>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {isAr ? "متصل لحظياً" : "Online"}
                        </span>
                      </div>

                      {/* Active Project Card: فندق فينيسيا */}
                      <div className="p-3 rounded-xl bg-card border border-border/90 space-y-2 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-accent tracking-wide uppercase">
                            {isAr ? "المشروع الحالي" : "Active Project"}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground">
                            #HTL-VEN
                          </span>
                        </div>
                        <p className="text-xs font-bold text-foreground">
                          {isAr ? "مشروع فندق فينيسيا — بنغازي" : "Venicia Hotel — Benghazi"}
                        </p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-muted-foreground">
                            <span>{isAr ? "إنجاز الهيكل الخرساني" : "Concrete Structure"}</span>
                            <span className="font-bold text-foreground">74%</span>
                          </div>
                          <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-accent rounded-full w-[74%]" />
                          </div>
                        </div>
                      </div>

                      {/* Site Daily Log Card */}
                      <div className="p-3 rounded-xl bg-muted/40 border border-border/80 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-semibold text-foreground flex items-center gap-1">
                            <ClipboardCheck size={12} className="text-accent" />
                            <span>{isAr ? "يوميات التنفيذ الميدانية" : "Daily Site Log"}</span>
                          </span>
                          <span className="text-muted-foreground">10:30 ص</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-snug">
                          {isAr
                            ? "استكمال صب وتسوية خرسانة الدور الرابع، فحص مكعبات الخرسانة، حضور 18 فنياً ومقاولاً."
                            : "Finished 4th-floor slab casting, verified concrete tests with 18 site personnel."}
                        </p>
                      </div>

                      {/* Photo Attachment Stamp */}
                      <div className="p-2.5 rounded-lg bg-card border border-border flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Camera size={14} className="text-accent shrink-0" />
                          <span className="text-[10px] font-medium text-foreground">
                            {isAr ? "6 صور فوتوغرافية موثقة" : "6 Geotagged site photos"}
                          </span>
                        </div>
                        <span className="text-[9px] text-emerald-600 font-bold">
                          {isAr ? "معتمدة ✓" : "Approved ✓"}
                        </span>
                      </div>

                      {/* Mobile Bottom Home Bar */}
                      <div className="pt-1 flex justify-center">
                        <div className="w-28 h-1 bg-foreground/30 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Information, Store Buttons, and QR */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                      <HardHat size={14} />
                      <span>
                        {isAr
                          ? "تطبيق المهندسين والمشرفين في موقع العمل"
                          : "Built for Site Engineers"}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
                      EGC Builder — Mobile Field App
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                      {isAr
                        ? "صُمم خصيصاً ليعمل في بيئة مواقع البناء الميدانية: تسجيل يوميات الأعمال، التقاط صور الإنجاز التوثيقية، ورصد الدفعات والغرامات فور وقوعها مع مزامنة فورية في قاعدة البيانات المركزية."
                        : "Specially engineered for job-site execution: log daily activities, capture geotagged milestone photos, track contractor penalties, and sync in real time."}
                    </p>
                  </div>

                  {/* Store Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0 pt-1">
                    <a
                      href={iosAppStoreUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground font-semibold text-xs hover:bg-accent transition-colors shadow-xs rounded-xl"
                    >
                      <span className="flex items-center gap-2">
                        <Apple size={16} />
                        <span>Apple App Store</span>
                      </span>
                      <ExternalLink size={13} className="opacity-70" />
                    </a>

                    <a
                      href={androidPlayStoreUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between px-4 py-3 bg-card border border-border text-foreground font-semibold text-xs hover:bg-muted transition-colors shadow-xs rounded-xl"
                    >
                      <span className="flex items-center gap-2">
                        <Play size={14} className="fill-current" />
                        <span>Google Play Store</span>
                      </span>
                      <ExternalLink size={13} className="opacity-70" />
                    </a>
                  </div>

                  {/* Refined Scannable QR Component */}
                  <div className="p-4 rounded-xl bg-muted/40 border border-border flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto lg:mx-0">
                    <div className="shrink-0 p-2 bg-white border border-border rounded-lg shadow-2xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={mobileQrType === "ios" ? iosQr : androidQr}
                        alt="EGC Apps QR Code"
                        width={90}
                        height={90}
                        className="block"
                      />
                    </div>

                    <div className="space-y-2 text-center sm:text-start flex-1">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <span className="text-xs font-bold text-foreground">
                          {isAr ? "امسح للتنزيل على هاتفك:" : "Scan to download:"}
                        </span>
                        <div className="inline-flex p-0.5 rounded-md bg-background border border-border text-[10px] font-semibold">
                          <button
                            type="button"
                            onClick={() => setMobileQrType("ios")}
                            className={`px-2 py-0.5 rounded cursor-pointer ${
                              mobileQrType === "ios"
                                ? "bg-accent text-accent-foreground font-bold"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {isAr ? "آيفون" : "iPhone"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setMobileQrType("android")}
                            className={`px-2 py-0.5 rounded cursor-pointer ${
                              mobileQrType === "android"
                                ? "bg-accent text-accent-foreground font-bold"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {isAr ? "أندرويد" : "Android"}
                          </button>
                        </div>
                      </div>

                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {mobileQrType === "ios"
                          ? isAr
                            ? "وجّه كاميرا الآيفون لفتح التطبيق في متجر App Store."
                            : "Point your iPhone camera to open directly in the App Store."
                          : isAr
                          ? "وجّه كاميرا الهاتف لفتح التطبيق في متجر Google Play."
                          : "Point your phone camera to open directly in Google Play."}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
