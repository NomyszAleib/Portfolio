import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, Play, Download } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

const Projects = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all_projects");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const projectCategories = [
    { key: "all_projects", name: t("all_projects") },
    { key: "websites_internet_apps", name: t("websites_internet_apps") },
    { key: "games", name: t("games") },
  ];

  const projects = [
    {
      id: 1,
      title: t("lesson_plan_title"),
      description: t("lesson_plan_desc"),
      image: "/placeholder.svg",
      date: t("october_2024"),
      type: "website",
      actionType: "link",
      actionLabel: t("check"),
      actionUrl: "https://planlekcji.elitarneliceum.edu.pl/Home/IndexEkran",
    },
    // {
    //   id: 2,
    //   title: t("daniel_rossario_title"),
    //   description: t("daniel_rossario_desc"),
    //   image:
    //     "http://danielrossario.pl/wp-content/uploads/2017/01/LogoDR-Small-1.jpg",
    //   date: t("february_2025"),
    //   type: "website",
    //   actionType: "link",
    //   actionLabel: t("view_page"),
    //   actionUrl: "???",
    // },
    // {
    //   id: 3,
    //   title: t("project_aunt_title"),
    //   description: t("project_aunt_desc"),
    //   image: "/placeholder.svg",
    //   date: t("august_2025"),
    //   type: "website",
    //   actionType: "link",
    //   actionLabel: t("view_page"),
    //   actionUrl: "#",
    // },
    // {
    //   id: 4,
    //   title: t("doroblo_title"),
    //   description: t("doroblo_desc"),
    //   image: "/placeholder.svg",
    //   date: t("february_2026"),
    //   type: "website",
    //   actionType: "link",
    //   actionLabel: t("check"),
    //   actionUrl: "#",
    // },
    // {
    //   id: 5,
    //   title: t("millionaires_title"),
    //   description: t("millionaires_desc"),
    //   image: "/placeholder.svg",
    //   date: t("may_2024"),
    //   type: "game",
    //   actionType: "play",
    //   actionLabel: t("play"),
    //   actionUrl: "#",
    // },
    {
      id: 6,
      title: t("pixel_snake_title"),
      description: t("pixel_snake_desc"),
      image: "/placeholder.svg",
      date: t("september_2024"),
      type: "game",
      actionType: "play",
      actionLabel: t("play"),
      actionUrl: "https://pixelsnake.vercel.app/",
    },
    // {
    //   id: 7,
    //   title: t("game_nr1_title"),
    //   description: t("game_nr1_desc"),
    //   image: "/placeholder.svg",
    //   date: t("january_2025"),
    //   type: "game",
    //   actionType: "download",
    //   actionLabel: t("install"),
    //   actionUrl: "#",
    // },
    // {
    //   id: 8,
    //   title: t("game_nr2_title"),
    //   description: t("game_nr2_desc"),
    //   image: "/placeholder.svg",
    //   date: t("february_2025"),
    //   type: "game",
    //   actionType: "download",
    //   actionLabel: t("install"),
    //   actionUrl: "#",
    // },
  ];

  const filteredProjects = projects.filter(
    (project) =>
      activeCategory === "all_projects" ||
      (activeCategory === "websites_internet_apps" &&
        project.type === "website") ||
      (activeCategory === "games" && project.type === "game")
  );

  const renderActionIcon = (actionType) => {
    switch (actionType) {
      case "play":
        return <Play size={16} />;
      case "download":
        return <Download size={16} />;
      case "link":
      default:
        return <ExternalLink size={16} />;
    }
  };

  const handleActionClick = (project) => {
    if (
      project.actionType === "link" &&
      project.actionUrl &&
      project.actionUrl !== "#"
    ) {
      window.open(project.actionUrl, "_blank");
    } else if (
      project.actionType === "play" &&
      project.actionUrl &&
      project.actionUrl !== "#"
    ) {
      window.open(project.actionUrl, "_blank"); // Open game in new tab
    } else if (
      project.actionType === "download" &&
      project.actionUrl &&
      project.actionUrl !== "#"
    ) {
      const link = document.createElement("a");
      link.href = project.actionUrl;
      link.download = ""; // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.log("Action not implemented or URL missing for:", project.title);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="project"
      className="min-h-screen flex items-center justify-center bg-secondary/30 py-20"
    >
      <div className="container mx-auto px-4 flex flex-col items-center h-full">
        <h2
          className={`section-heading text-center ${
            isVisible ? "animate-fade-in-down" : "opacity-0"
          }`}
        >
          {t("projects_title")}
        </h2>
        <div
          className={`flex justify-center gap-4 mt-10 mb-12 flex-wrap ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {projectCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category.key)}
              className={`category-button ${
                activeCategory === category.key ? "active" : ""
              }`}
              style={{ animationDelay: isVisible ? `${index * 0.1}s` : "0s" }}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${(index % 4) * 0.1}s` }}
            >
              <div className="relative overflow-hidden h-52">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <button
                      onClick={() => handleActionClick(project)}
                      className="flex items-center justify-center gap-2 w-full bg-[hsl(var(--accent))] text-white py-2 rounded-md hover:bg-opacity-90 transition-colors"
                    >
                      {renderActionIcon(project.actionType)}
                      {project.actionLabel}
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">{project.title}</h3>
                  <span className="text-xs px-2 py-1 bg-muted rounded-full text-[hsl(var(--accent))]">
                    {project.date}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
