"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    // Set initial active section based on scroll position
    const handleInitialScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleInitialScroll();
    window.addEventListener("scroll", handleInitialScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleInitialScroll);
    };
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
        "fixed top-0 left-0 right-0 z-[100] isolate transition-all duration-300",
        "bg-background/90 backdrop-blur-md border-b border-border/80",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 md:h-20 gap-3">
          <Link
            href="/"
            className="relative z-0 flex shrink-0 items-center hover:opacity-90 transition-opacity min-w-0"
            aria-label="Clykur home"
          >
            <Image
              src="/Clykur Logo.svg"
              alt="Clykur"
              width={540}
              height={144}
              className="h-36 w-auto md:h-44"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 flex-shrink-0">
            {navItems.map((item) => {
              const isActive =
                item.id === "careers"
                  ? isCareersPage
                  : !isCareersPage && activeSection === item.id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Button asChild size="sm">
              <Link href={isCareersPage ? "/#contact" : "#contact"}>
                Get in Touch
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button — z-10 so it stays above logo and is tappable */}
          <button
            type="button"
            className={cn(
              "md:hidden relative z-10 flex-shrink-0 min-w-[44px] min-h-[44px] p-2.5 -m-2.5 rounded-xl transition-all duration-300 ease-out [touch-action:manipulation]",
              "hover:bg-muted/60 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isMobileMenuOpen && "bg-muted/50",
            )}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsMobileMenuOpen((prev) => !prev);
            }}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="relative flex h-6 w-6 items-center justify-center">
              <Menu
                className={cn(
                  "h-6 w-6 absolute transition-all duration-300 ease-out",
                  isMobileMenuOpen
                    ? "rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100",
                )}
                aria-hidden
              />
              <X
                className={cn(
                  "h-6 w-6 absolute transition-all duration-300 ease-out",
                  isMobileMenuOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-0 opacity-0",
                )}
                aria-hidden
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu — conditional render so it reliably opens in production */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/80 bg-gradient-to-b from-muted/40 to-background">
          <div className="px-4 py-5 sm:py-6 space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.id === "careers"
                  ? isCareersPage
                  : !isCareersPage && activeSection === item.id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block rounded-xl py-3.5 px-4 text-base font-medium transition-colors duration-200",
                    isActive
                      ? "bg-foreground/10 text-foreground font-semibold"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground active:bg-muted/70",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-3">
              <Button
                asChild
                className="w-full rounded-xl h-12 font-medium text-base shadow-sm"
                size="lg"
              >
                <Link
                  href={isCareersPage ? "/#contact" : "#contact"}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
