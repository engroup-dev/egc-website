"use client";
import { useState, useEffect, type MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import LocaleSwitcher from "../localeSwitcher";
import { useTranslations } from "next-intl";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav");

  const handleLinkClick = (e: MouseEvent, href: string) => {
    if (href.includes("#")) {
      e.preventDefault();
      const [, hash] = href.split("#");
      const id = hash;
      const el =
        typeof document !== "undefined" ? document.getElementById(id) : null;
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        if (typeof window !== "undefined") {
          window.history.pushState(null, "", `#${id}`);
        }
      } else {
        router.push(href);
      }
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/#about", label: t("about") },
    { href: "/#founders", label: t("coFounders") },
    { href: "/#projects", label: t("projects") },
    // { href: "/#gallery", label: t("gallery") },
    { href: "/#contact", label: t("contact") },
  ];

  const container = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0.04 } },
  };

  const item = { hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0 } };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "h-18" : "h-20"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={(e: MouseEvent) => {
              if (pathname === "/") {
                e.preventDefault();
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  window.history.pushState(null, "", "/");
                }
                setIsMobileMenuOpen(false);
              }
            }}
            className={`font-serif font-semibold tracking-tight transition-all duration-300 ${
              isScrolled ? "text-xl" : "text-2xl"
            }`}
          >
            {/* Desktop: full logo */}
            <Image
              src="/logos/egclogow-removebg-preview.png"
              alt="EGC Logo"
              width={210}
              height={100}
              className="hidden lg:block object-contain"
            />

            {/* Mobile: animated swap between small and full logo */}
            <div className="block lg:hidden">
              <AnimatePresence initial={false} mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="logo-full"
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center"
                  >
                    <Image
                      src="/logos/egclogow-removebg-preview.png"
                      alt="EGC Full"
                      width={190}
                      height={100}
                      className="object-contain"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="logo-small"
                    initial={{ opacity: 0, y: -4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center"
                  >
                    <Image
                      src="/logos/egclogow-removebg-small.png"
                      alt="EGC Small"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-sm uppercase tracking-wider hover:text-accent transition-colors ${
                  pathname === link.href ? "text-accent" : ""
                }`}
              >
                <motion.span
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {link.label}
                </motion.span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {/* The EGC Builder Pill Button with Company Symbol */}
            <Link
              href="/#apps"
              onClick={(e) => handleLinkClick(e, "/#apps")}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/40 bg-accent/10 hover:bg-accent hover:border-accent transition-all text-xs font-semibold shadow-2xs"
              title="EGC Builder — تطبيقات ومنظومة المشاريع"
            >
              <Image
                src="/logos/egclogow-removebg-small.png"
                alt="EGC"
                width={16}
                height={16}
                className="object-contain transition-transform group-hover:scale-110"
              />
              <span className="font-semibold text-accent group-hover:text-white transition-colors tracking-wide">
                EGC Builder
              </span>
            </Link>

            <LocaleSwitcher />
            <Button
              asChild
              variant="default"
              size="sm"
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                handleLinkClick(e, "/#contact");
              }}
            >
              <Link href="/#contact">{t("contactUs")}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile quick EGC Builder pill */}
            <Link
              href="/#apps"
              onClick={(e) => handleLinkClick(e, "/#apps")}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-accent/40 bg-accent/10 text-accent text-xs font-semibold"
              title="EGC Builder"
            >
              <Image
                src="/logos/egclogow-removebg-small.png"
                alt="EGC"
                width={14}
                height={14}
                className="object-contain"
              />
              <span className="text-[11px] font-bold">EGC Builder</span>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-1"
            >
              <motion.span
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.18 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden py-6 border-t border-border"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <motion.div
                className="flex flex-col gap-4"
                variants={container}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.href} variants={item}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`text-sm uppercase tracking-wider hover:text-accent transition-colors ${
                        pathname === link.href ? "text-accent" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile EGC Builder Pill inside drawer */}
                <motion.div variants={item} className="pt-2">
                  <Link
                    href="/#apps"
                    onClick={(e) => handleLinkClick(e, "/#apps")}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-accent/40 bg-accent/10 text-accent font-semibold text-xs"
                  >
                    <Image
                      src="/logos/egclogow-removebg-small.png"
                      alt="EGC"
                      width={18}
                      height={18}
                      className="object-contain"
                    />
                    <span className="font-bold text-sm tracking-wide">
                      EGC Builder
                    </span>
                  </Link>
                </motion.div>

                <div className="flex justify-between items-center pt-2">
                  <motion.div variants={item}>
                    <div aria-label="Change language">
                      <LocaleSwitcher />
                    </div>
                  </motion.div>
                  <motion.div variants={item}>
                    <Button
                      asChild
                      variant="default"
                      size="sm"
                    >
                      <Link
                        href="/#contact"
                        onClick={(e) => {
                          setIsMobileMenuOpen(false);
                          handleLinkClick(e, "/#contact");
                        }}
                      >
                        {t("contactUs")}
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
