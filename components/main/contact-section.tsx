"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { submitContactForm } from "@/lib/actions/contact";

const emptyForm = { name: "", email: "", phone: "", message: "", website: "" };

export function ContactSection() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "invalid" | "failed" | "stale"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const result = await submitContactForm({ ...formData, locale });
      if (result.ok) {
        setStatus("success");
        setFormData(emptyForm);
      } else {
        setStatus(result.error);
      }
    } catch {
      // Network failure, or this tab predates a deploy and its action ID is gone.
      setStatus("stale");
    }
  };

  return (
    <section
      id="contact"
      className="py-12 md:py-24 bg-background max-w-7xl mx-auto"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                {t("label")}
              </p>
              <h2 className="font-serif font-semibold text-4xl md:text-5xl text-balance leading-tight">
                {t("title")}
              </h2>
              <p className="text-muted-foreground mt-6 leading-relaxed">
                {t("description")}
              </p>
            </div>

            <div className="space-y-6">
              <Link
                href="https://maps.app.goo.gl/JNarJPRNiNZqgBwP8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 hover:opacity-80 transition-opacity"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t("office.location")}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t("office.address")}
                  </p>
                </div>
              </Link>

              <Link
                href="tel:+218916517020"
                className="flex items-start gap-4 hover:opacity-80 transition-opacity"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    {t("office.phoneLabel")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    00218916517020
                  </p>
                </div>
              </Link>

              <Link
                href="mailto:info@engroup.ly"
                className="flex items-start gap-4 hover:opacity-80 transition-opacity"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    {t("office.emailLabel")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t("office.email")}
                  </p>
                </div>
              </Link>
            </div>

            <div className="pt-6 border-t border-border">
              <h3 className="font-semibold mb-4">{t("office.hoursTitle")}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>{t("office.hours.working.day")}</span>
                  <span>{t("office.hours.working.time")}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("office.hours.friday.day")}</span>
                  <span>{t("office.hours.friday.time")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  {t("form.name")}
                </label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder={t("form.namePlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  {t("form.email")}
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder={t("form.emailPlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2"
                >
                  {t("form.phone")}
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder={t("form.phonePlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  {t("form.message")}
                </label>
                <Textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder={t("form.messagePlaceholder")}
                />
              </div>

              {/* Honeypot: hidden from people, filled in by bots. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={status === "sending"}
              >
                {status === "sending" ? t("form.sending") : t("form.submit")}
              </Button>

              <p
                role="status"
                aria-live="polite"
                className="min-h-5 text-sm flex items-start gap-2"
              >
                {status === "success" && (
                  <>
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                    {t("form.success")}
                  </>
                )}
                {(status === "invalid" || status === "failed" || status === "stale") && (
                  <>
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-destructive" />
                    <span>
                      {t(`form.errors.${status}`)}{" "}
                      {status === "stale" && (
                        <button
                          type="button"
                          onClick={() => window.location.reload()}
                          className="underline underline-offset-4"
                        >
                          {t("form.reload")}
                        </button>
                      )}
                    </span>
                  </>
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
