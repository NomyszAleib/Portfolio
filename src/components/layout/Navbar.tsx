import React, { useState, useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/hooks/use-language";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerClose,
} from "@/components/ui/drawer";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { name: t("about"), href: "#about" },
    { name: t("skills"), href: "#skills" },
    { name: t("projects"), href: "#projects" },
    { name: t("contact"), href: "#contact" },
  ];

  // Funkcja do przewijania do sekcji
  const scrollToSection = (href) => {
    closeMenu();
    const sectionId = href.replace("#", "");
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-2 left-4 right-4 z-50 transition-all duration-300 rounded-3xl border ${
        isScrolled
          ? "bg-[hsl(var(--background)/0.9)] backdrop-blur-md shadow-md py-2 border-[hsl(var(--border))]"
          : "bg-transparent py-4 border-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-xl font-bold animate-fade-in-left"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src="/logo/logo.svg"
              alt="Szymon Biela Logo"
              className="h-8 w-8"
              onError={(e) => {
                console.warn("Failed to load logo, using fallback");
                e.target.src = "/logo/fallback-logo.png";
              }}
            />
            <span className="text-accent">Szymon</span>
            <span>Biela</span>
          </a>
          <div className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex items-center gap-6">
              {navLinks.map((link, index) => (
                <li
                  key={index}
                  className="relative group"
                  style={{
                    animation: `fadeInDown ${0.3 + index * 0.1}s ease forwards`,
                    opacity: 0,
                  }}
                >
                  <a
                    href={link.href}
                    className="nav-link-animated transition-all duration-300 hover:backdrop-blur-sm hover:bg-[hsl(var(--background)/0.3)] hover:rounded-md hover:px-2 hover:py-1"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div
              className="relative transition-all duration-300 hover:scale-110 group"
              style={{ animation: `fadeInDown 0.7s ease forwards`, opacity: 0 }}
            >
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-full hover:bg-[hsl(var(--background)/0.3)] hover:backdrop-blur-sm transition-all"
                aria-label="Change language"
              >
                <Globe size={20} className="text-foreground" />
                <span className="ml-1 text-xs font-bold absolute top-[-4px] right-[-4px] bg-[hsl(var(--accent))] text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {language.toUpperCase()}
                </span>
              </button>
            </div>
            <div
              className="relative transition-all duration-300 hover:scale-110 group"
              style={{ animation: `fadeInDown 0.8s ease forwards`, opacity: 0 }}
            >
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-[hsl(var(--background)/0.3)] hover:backdrop-blur-sm transition-all"
                aria-label={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                {theme === "dark" ? (
                  <Sun size={20} className="text-foreground" />
                ) : (
                  <Moon size={20} className="text-foreground" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1 md:hidden">
            <div
              className="relative transition-all duration-300 hover:scale-110 group"
              style={{ animation: `fadeInDown 0.7s ease forwards`, opacity: 0 }}
            >
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-full hover:bg-muted transition-colors group-hover:backdrop-blur-sm group-hover:bg-background/30"
                aria-label="Change language"
              >
                <Globe size={20} className="text-foreground" />
                <span className="ml-1 text-xs font-bold absolute top-[-4px] right-[-4px] bg-accent text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {language.toUpperCase()}
                </span>
              </button>
            </div>
            <div
              className="relative transition-all duration-300 hover:scale-110 group"
              style={{ animation: `fadeInDown 0.8s ease forwards`, opacity: 0 }}
            >
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-muted transition-colors group-hover:backdrop-blur-sm group-hover:bg-background/30"
                aria-label={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                {theme === "dark" ? (
                  <Sun size={20} className="text-foreground" />
                ) : (
                  <Moon size={20} className="text-foreground" />
                )}
              </button>
            </div>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-[hsl(var(--background)/0.3)] hover:backdrop-blur-sm transition-all"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              style={{ animation: `fadeInDown 0.9s ease forwards`, opacity: 0 }}
            >
              <Menu size={24} className="text-foreground" />
            </button>
          </div>
        </nav>
      </div>
      <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DrawerOverlay className="bg-transparent" />
        <DrawerContent className="h-[80vh] bg-[hsl(var(--background))] border-[hsl(var(--border))]">
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-10">
              <a
                href="/"
                className="flex items-center gap-2 text-xl font-bold animate-fade-in-left"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <img
                  src="/logo/logo.svg"
                  alt="Szymon Biela Logo"
                  className="h-8 w-8"
                  onError={(e) => {
                    console.warn("Failed to load logo, using fallback");
                    e.target.src = "/logo/fallback-logo.png";
                  }}
                />
                <span className="text-[hsl(var(--accent))]">Szymon</span>
                <span>Biela</span>
              </a>
              <DrawerClose
                className="p-2 rounded-full hover:bg-muted transition-colors"
                style={{
                  animation: `fadeInRight 0.3s ease forwards`,
                  opacity: 0,
                }}
              >
                <X size={24} className="text-foreground" />
              </DrawerClose>
            </div>
            <ul className="flex flex-col space-y-8">
              {navLinks.map((link, index) => (
                <li
                  key={index}
                  className="transform transition-all duration-300 hover:translate-x-2"
                  style={{
                    animation: `fadeInRight ${
                      0.3 + index * 0.1
                    }s ease forwards`,
                    opacity: 0,
                  }}
                >
                  <a
                    href={link.href}
                    className="text-2xl font-medium flex items-center space-x-2 group"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                  >
                    <span className="w-0 h-0.5 bg-[hsl(var(--accent))] transition-all duration-300 group-hover:w-5"></span>
                    <span className="group-hover:text-[hsl(var(--accent))] transition-colors">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-auto bg-[hsl(var(--secondary)/0.5)] p-4 rounded-lg flex justify-center items-center gap-6 border border-[hsl(var(--border))]">
              <div
                className="relative transition-all duration-300 hover:scale-110 group"
                style={{ animation: `fadeInUp 0.7s ease forwards`, opacity: 0 }}
              >
                <button
                  onClick={toggleLanguage}
                  className="p-2 rounded-full hover:bg-[hsl(var(--background)/0.3)] hover:backdrop-blur-sm transition-all"
                  aria-label="Change language"
                >
                  <Globe size={20} className="text-foreground" />
                  <span className="ml-1 text-xs font-bold absolute top-[-4px] right-[-4px] bg-[hsl(var(--accent))] text-white rounded-full w-4 h-4 flex items-center justify-center">
                    {language.toUpperCase()}
                  </span>
                </button>
              </div>
              <div
                className="relative transition-all duration-300 hover:scale-110 group"
                style={{ animation: `fadeInUp 0.8s ease forwards`, opacity: 0 }}
              >
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-[hsl(var(--background)/0.3)] hover:backdrop-blur-sm transition-all"
                  aria-label={
                    theme === "dark"
                      ? "Switch to light mode"
                      : "Switch to dark mode"
                  }
                >
                  {theme === "dark" ? (
                    <Sun size={20} className="text-foreground" />
                  ) : (
                    <Moon size={20} className="text-foreground" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default Navbar;
