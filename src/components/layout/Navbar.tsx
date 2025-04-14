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

  const scrollToSection = (href) => {
    const sectionId = href.replace("#", "");
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 80;
      const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: sectionPosition - headerOffset,
        behavior: "smooth",
      });
    }
    closeMenu();
  };

  const navLinks = [
    { name: t("about"), href: "#about" },
    { name: t("skills"), href: "#skills" },
    { name: t("projects"), href: "#project" },
    { name: t("contact"), href: "#contact" },
  ];

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
          <a href="#" className="flex items-center gap-2 text-xl font-bold">
            <img src="logo/logo.svg" alt="logo" className="h-8 w-8" />
            <span className="text-accent">Szymon</span>Biela
          </a>
          <div className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex items-center gap-6">
              {navLinks.map((link, index) => (
                <li key={index} className="relative group">
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
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-[hsl(var(--background)/0.3)] transition-all"
            >
              <Globe size={20} />
              <span className="ml-1 text-xs font-bold absolute -top-1 -right-1 bg-[hsl(var(--accent))] text-white rounded-full w-4 h-4 flex items-center justify-center">
                {language.toUpperCase()}
              </span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[hsl(var(--background)/0.3)] transition-all"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <Globe size={20} />
              <span className="ml-1 text-xs font-bold absolute -top-1 -right-1 bg-accent text-white rounded-full w-4 h-4 flex items-center justify-center">
                {language.toUpperCase()}
              </span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-[hsl(var(--background)/0.3)] transition-all"
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </div>
      <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DrawerOverlay className="bg-transparent" />
        <DrawerContent className="h-[80vh] bg-[hsl(var(--background))] border-[hsl(var(--border))]">
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-10">
              <a href="#" className="flex items-center gap-2 text-xl font-bold">
                <img src="logo/logo.svg" alt="logo" className="h-8 w-8" />
                <span className="text-[hsl(var(--accent))]">Szymon</span>Biela
              </a>
              <DrawerClose className="p-2 rounded-full hover:bg-muted transition-colors">
                <X size={24} />
              </DrawerClose>
            </div>
            <ul className="flex flex-col space-y-8">
              {navLinks.map((link, index) => (
                <li key={index}>
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
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-full hover:bg-[hsl(var(--background)/0.3)] transition-all"
              >
                <Globe size={20} />
                <span className="ml-1 text-xs font-bold absolute -top-1 -right-1 bg-[hsl(var(--accent))] text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {language.toUpperCase()}
                </span>
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-[hsl(var(--background)/0.3)] transition-all"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default Navbar;
