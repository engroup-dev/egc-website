"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="font-serif font-semibold text-3xl mb-4">
              {t("company.name")}
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed mb-6 max-w-md">
              {t("company.description")}
            </p>
            <div className="text-sm text-primary-foreground/60">
              {t("company.established")}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t("links.title")}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/#about"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t("links.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#founders"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t("links.founders")}
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t("links.projects")}
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t("links.gallery")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#apps"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t("links.apps")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {t("links.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">
              {t("services.title")}
            </h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li>{t("services.items.1")}</li>
              <li>{t("services.items.2")}</li>
              <li>{t("services.items.3")}</li>
              <li>{t("services.items.4")}</li>
              <li>{t("services.items.5")}</li>
              <li>{t("services.items.6")}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>{t("bottom", { year: currentYear })}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
