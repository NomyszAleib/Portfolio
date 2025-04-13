import React from "react";
import {
  Github,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  Send,
} from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

const Footer = () => {
  const { t } = useLanguage();

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

  const links = [
    { name: t("home"), href: "" },
    { name: t("about"), href: "#about" },
    { name: t("projects"), href: "#project" },
    { name: t("skills"), href: "#skills" },
    { name: t("contact"), href: "#contact" },
  ];

  const projectLinks = [
    {
      name: t("lesson_plan_title"),
      href: "https://planlekcji.elitarneliceum.edu.pl/Home/IndexEkran",
    },
    {
      name: t("daniel_rossario_title"),
      href: "",
    },
    {
      name: t("pixel_snake_title"),
      href: "https://pixelsnake.vercel.app/",
    },
    {
      name: "???",
      href: "",
    },
    {
      name: "???",
      href: "",
    },
  ];

  return (
    <footer className="bg-card relative mt-32 pt-24 pb-10 border-t border-border">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl bg-[hsl(var(--accent))] text-white rounded-full p-6 md:p-10 shadow-xl hover:shadow-[hsl(var(--accent))/0.2] transition-shadow duration-300 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              {t("footer_start_project")}
            </h3>
            <p className="text-sm md:text-base opacity-90 max-w-md">
              {t("footer_project_desc")}
            </p>
          </div>
          <button className="bg-white text-[hsl(var(--accent))] px-6 py-3 rounded-full font-medium transition-all duration-500 hover:bg-opacity-90 hover:shadow-lg transform hover:-translate-y-1">
            {t("footer_lets_do_this")}
          </button>
        </div>
        <div className="absolute inset-0 bg-[hsl(var(--accent))] z-0 overflow-hidden">
          <div className="absolute w-40 h-40 bg-white/10 rounded-full -top-20 -left-20 animate-pulse"></div>
          <div
            className="absolute w-60 h-60 bg-white/5 rounded-full -bottom-30 -right-30 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div style={{ animation: `fadeInUp 0.5s ease forwards`, opacity: 0 }}>
            <h3 className="text-xl font-bold mb-4">{t("nick")} Biela</h3>
            <p className="text-muted-foreground mb-6">
              {t("footer_about_desc")}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="social-icon"
                  style={{
                    animation: `fadeInUp ${0.7 + index * 0.1}s ease forwards`,
                    opacity: 0,
                  }}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          <div style={{ animation: `fadeInUp 0.9s ease forwards`, opacity: 0 }}>
            <h4 className="text-lg font-bold mb-4">{t("useful_links")}</h4>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li
                  key={index}
                  style={{
                    animation: `fadeInRight ${
                      1.1 + index * 0.1
                    }s ease forwards`,
                    opacity: 0,
                  }}
                >
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-[hsl(var(--accent))] transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ animation: `fadeInUp 0.7s ease forwards`, opacity: 0 }}>
            <h4 className="text-lg font-bold mb-4">{t("projects_links")}</h4>
            <ul className="space-y-2">
              {projectLinks.map((link, index) => (
                <li
                  key={index}
                  style={{
                    animation: `fadeInRight ${
                      0.9 + index * 0.1
                    }s ease forwards`,
                    opacity: 0,
                  }}
                >
                  <a
                    href={link.href}
                    className={`text-muted-foreground hover:text-[hsl(var(--accent))] transition-colors hover:translate-x-1 inline-block ${
                      link.href === "" ? "pointer-events-none opacity-50" : ""
                    }`}
                    target={link.href ? "_blank" : "_self"}
                    rel={link.href ? "noopener noreferrer" : ""}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ animation: `fadeInUp 1.1s ease forwards`, opacity: 0 }}>
            <h4 className="text-lg font-bold mb-4">{t("news")}</h4>
            <p className="text-muted-foreground mb-4">{t("news_desc")}</p>
            <div className="flex items-center justify-between bg-muted rounded-full p-2 pr-4 max-w-xs">
              <span className="px-4 text-sm text-foreground opacity-70">
                {t("email_coming_soon")}
              </span>
              <button
                className="bg-[hsl(var(--accent))] text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-opacity-90 transition-colors group"
                aria-label="Fake Subscribe"
              >
                <Send
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {t("honest_no_email_yet")}
            </p>
          </div>
        </div>
        <div
          className="mt-10 pt-6 border-t border-border text-center text-sm text-muted-foreground"
          style={{ animation: `fadeInUp 1.3s ease forwards`, opacity: 0 }}
        >
          <p>
            © {new Date().getFullYear()} {t("nick")} Biela.{" "}
            {t("all_rights_reserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
