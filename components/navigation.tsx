"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();
  const isCareersPage = pathname === "/careers";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const sections = [
      "products",
      "about",
      "services",
      "process",
      "portfolio",
      "case-studies",
      "faq",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) setActiveSection(id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { href: "/#products", label: "Products", id: "products" },
    { href: "/#about", label: "About", id: "about" },
    { href: "/#services", label: "Services", id: "services" },
    { href: "/#portfolio", label: "Portfolio", id: "portfolio" },
    { href: "/careers", label: "Careers", id: "careers" },
    { href: "/#contact", label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        isScrolled
          ? "border-b border-border/80 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/Clykur Logo.svg"
              alt="Clykur"
              width={540}
              height={144}
              className="h-36 w-auto md:h-44"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive =
                item.id === "careers"
                  ? isCareersPage
                  : activeSection === item.id;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm transition-colors",
                    isActive
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <Button
              asChild
              size="sm"
              className="rounded-2xl px-5 py-2 shadow-sm hover:shadow-md transition-all"
            >
              <Link href={isCareersPage ? "/#contact" : "#contact"}>
                Get in Touch
              </Link>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((p) => !p)}
            className="md:hidden p-2 rounded-xl"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[#FF3B1F] pt-24 md:hidden"
          >
            <div className="flex flex-col h-full justify-between px-6 pb-10">
              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-3xl font-semibold text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <Button
                asChild
                size="lg"
                className="w-full rounded-2xl bg-white text-[#FF3B1F] shadow-sm hover:shadow-md"
              >
                <Link
                  href={isCareersPage ? "/#contact" : "#contact"}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get in Touch
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}