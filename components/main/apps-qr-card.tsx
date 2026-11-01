"use client";

import { useState } from "react";
import { Apple, Play, QrCode } from "lucide-react";

interface AppsQrCardProps {
  iosQr: string;
  androidQr: string;
  locale: string;
}

export function AppsQrCard({ iosQr, androidQr, locale }: AppsQrCardProps) {
  const [platform, setPlatform] = useState<"ios" | "android">("ios");
  const isAr = locale === "ar";

  const currentQr = platform === "ios" ? iosQr : androidQr;

  return (
    <div className="p-4 bg-muted/40 border border-border rounded-xl space-y-3">
      {/* Header and Toggle */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <QrCode size={15} className="text-accent" />
          <span>{isAr ? "امسح بالكاميرا:" : "Scan to Download:"}</span>
        </div>

        {/* Platform Toggle */}
        <div className="inline-flex p-0.5 rounded-lg bg-background border border-border text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setPlatform("ios")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              platform === "ios"
                ? "bg-accent text-accent-foreground shadow-2xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Apple size={12} className="stroke-[2.2]" />
            <span>{isAr ? "آيفون" : "iPhone"}</span>
          </button>

          <button
            type="button"
            onClick={() => setPlatform("android")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              platform === "android"
                ? "bg-accent text-accent-foreground shadow-2xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Play size={11} className="stroke-[2.2] fill-current" />
            <span>{isAr ? "أندرويد" : "Android"}</span>
          </button>
        </div>
      </div>

      {/* QR Code Box */}
      <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
        <div className="shrink-0 p-2.5 bg-white border border-border/80 rounded-lg shadow-2xs flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentQr}
            alt={platform === "ios" ? "App Store QR Code" : "Google Play QR Code"}
            width={100}
            height={100}
            className="block"
          />
        </div>

        <div className="space-y-1 text-center sm:text-start">
          <p className="text-xs font-bold text-foreground">
            {platform === "ios"
              ? isAr
                ? "متجر Apple App Store"
                : "Apple App Store"
              : isAr
              ? "متجر Google Play"
              : "Google Play Store"}
          </p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {platform === "ios"
              ? isAr
                ? "وجّه كاميرا الآيفون لفتح التطبيق في متجر App Store."
                : "Scan with your iPhone camera to open in the App Store."
              : isAr
              ? "وجّه كاميرا الهاتف لفتح التطبيق في متجر Google Play."
              : "Scan with your phone camera to open in Google Play."}
          </p>
        </div>
      </div>
    </div>
  );
}
