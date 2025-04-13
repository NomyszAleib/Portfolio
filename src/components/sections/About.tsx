import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/hooks/use-language";

const About = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen flex items-center justify-center bg-secondary/30 py-20"
    >
      <div className="container mx-auto px-4 flex flex-col items-center gap-10 h-full">
        <h2
          className={`section-heading text-center ${
            isVisible ? "animate-fade-in-down" : "opacity-0"
          }`}
        >
          {t("about_title")}
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-20 w-full">
          <div
            className={`w-full md:w-1/3 ${
              isVisible ? "animate-fade-in-left" : "opacity-0"
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[hsl(var(--accent)/0.3)] via-transparent to-[hsl(var(--accent)/0.3)] animate-gradient-rotate"></div>{" "}
              <div className="relative w-full rounded-full overflow-hidden border-4 border-transparent glow-ring">
                <img
                  src="/image/profilowe.jpg"
                  alt="Szymon Biela"
                  className="w-full rounded-full object-cover relative z-10"
                />
              </div>
            </div>
          </div>
          <div
            className={`w-full md:w-2/3 ${
              isVisible ? "animate-fade-in-right" : "opacity-0"
            }`}
          >
            <div className="space-y-6 text-lg">
              <p>{t("about_paragraph1")}</p>
              <p>{t("about_paragraph2")}</p>
              <p>{t("about_paragraph3")}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              {[
                {
                  href: "#contact",
                  label: t("contact_me"),
                  className: "gradient-button",
                },
                {
                  href: "#project",
                  label: t("view_projects"),
                  className: "gradient-button",
                },
                {
                  href: "/CV_Szymon_Biela.pdf",
                  label: t("download_cv"),
                  className: "download-btn",
                  download: true,
                },
              ].map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  download={button.download}
                  className={`relative rounded-full overflow-hidden transition-all ${
                    button.className
                  } ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {button.download ? (
                    <div className="button-content">
                      <div className="svg-container">
                        <svg
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          height="25"
                          width="25"
                          className="download-icon"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="none"
                            d="M0 0h24v24H0z"
                            stroke="none"
                          ></path>
                          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                          <path d="M7 11l5 5l5 -5"></path>
                          <path d="M12 4l0 12"></path>
                        </svg>
                      </div>
                      <div className="text-container">
                        <span className="text">{button.label}</span>
                      </div>
                    </div>
                  ) : (
                    <span className="relative z-10 flex items-center justify-center h-12 px-8 font-bold">
                      {button.label}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
