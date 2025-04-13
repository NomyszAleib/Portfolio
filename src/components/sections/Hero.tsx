import React, { useEffect, useRef, useState } from "react";
import {
  Github,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
} from "lucide-react";
import Typed from "typed.js";
import { useLanguage } from "@/hooks/use-language";

const Hero = () => {
  const { t, language } = useLanguage();
  const typedRef = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (textRef.current) observer.observe(textRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typedRef.current && isVisible) {
      if (typed.current) typed.current.destroy();

      const strings =
        language === "pl"
          ? ["Programistą", "WebDeveloperem", "Twórcą Gier", "Designerem"]
          : ["Programmer", "WebDeveloper", "GameCreator", "Designer"];

      typed.current = new Typed(typedRef.current, {
        strings,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        loop: true,
      });
    }

    return () => {
      if (typed.current) typed.current.destroy();
    };
  }, [language, isVisible]);

  const socialLinks = [
    {
      icon: <Youtube size={24} />,
      href: "https://youtube.com/@nomysz6108?si=4pfC07qooPXVKbBb",
      label: "YouTube",
    },
    {
      icon: <Instagram size={24} />,
      href: "https://www.instagram.com/n0mysz?igsh=cmZvMXp1YzJ6ejJ1&utm_source=qr",
      label: "Instagram",
    },
    {
      icon: <Facebook size={24} />,
      href: "https://www.facebook.com/szymon.biela.129",
      label: "Facebook",
    },
    {
      icon: <Twitter size={24} />,
      href: "https://x.com/n0mysz_?s=21&t=GcnnpaqX3gtr0kag_UT6QA",
      label: "Twitter",
    },
    {
      icon: <Github size={24} />,
      href: "https://github.com/NomyszAleib",
      label: "GitHub",
    },
    {
      icon: <Linkedin size={24} />,
      href: "https://www.linkedin.com/in/szymon-biela-61097835a/",
      label: "LinkedIn",
    },
  ];

  return (
    <section
      id="top"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-20 h-full">
        <div
          ref={textRef}
          className={`w-full md:w-1/2 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 w-full flex items-center flex-wrap gap-2">
            <span>{t("hello")}</span>
            <span className="name-highlight">{t("nick")}</span>
          </h1>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-8 w-full">
            {t("iam")}
            <span
              ref={typedRef}
              className="text-[hsl(var(--accent))] font-semibold"
            ></span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 w-full">
            {t("developer_description")}
          </p>
          <div className="flex gap-8 mt-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="social-icon"
                style={{
                  animation: isVisible
                    ? `fadeInUp ${0.5 + index * 0.1}s ease forwards`
                    : "none",
                  opacity: isVisible ? 1 : 0,
                }}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        <div
          ref={imageRef}
          className={`w-full md:w-1/2 flex justify-center ${
            isVisible ? "animate-fade-in-down" : "opacity-0"
          }`}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[hsl(var(--accent)/0.2)] blur-xl animate-pulse"></div>{" "}
            <div className="relative w-80 h-80 sm:w-[28rem] sm:h-[28rem] lg:w-[32rem] lg:h-[32rem] rounded-full overflow-hidden border-4 border-[hsl(var(--accent)/0.5)] animate-border-pulse">
              <img
                src="/image/profilowe.jpg"
                alt="Szymon Biela"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
