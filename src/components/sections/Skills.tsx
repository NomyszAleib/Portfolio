import React, { useEffect, useState, useRef } from "react";
import { Code, Layers, Database, Terminal } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/hooks/use-language";

const Skills = () => {
  const [mounted, setMounted] = useState(false);
  const [activeView, setActiveView] = useState("programming_skills");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
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

  const skillCategories = [
    {
      title: t("frontend_development"),
      icon: <Code className="w-12 h-12 text-accent" />,
      skills: [
        "HTML",
        "CSS",
        "Java Script",
        "TypeScript",
        "React.js",
        "Vite",
        "Bootstrap",
        "Tailwind CSS",
      ],
    },
    {
      title: t("backend_development"),
      icon: <Database className="w-12 h-12 text-accent" />,
      skills: [
        "C# (.NET)",
        "PHP",
        "JavaScript (Node.js)",
        "Java",
        "PostgreSQL",
        "MySQL",
        "Microsoft SQL Server",
        "CI/CD",
      ],
    },
    {
      title: t("game_development"),
      icon: <Layers className="w-12 h-12 text-accent" />,
      skills: [
        "C++",
        "C#",
        "JavaScript/TypeScript",
        "Python",
        "Unity",
        "FL Studio",
        "Git",
      ],
    },
    {
      title: t("tools_others"),
      icon: <Terminal className="w-12 h-12 text-accent" />,
      skills: [
        "Visual Studio",
        "Android Studio",
        "Unity Editor",
        "IntelliJ IDEA",
        "GitHub",
      ],
    },
  ];

  const skillLevels = {
    HTML: 95,
    CSS: 90,
    "Java Script": 75,
    TypeScript: 70,
    "React.js": 75,
    Vite: 70,
    Bootstrap: 90,
    "Tailwind CSS": 75,
    "C# (.NET)": 60,
    PHP: 85,
    "JavaScript (Node.js)": 65,
    Java: 45,
    PostgreSQL: 55,
    MySQL: 80,
    "Microsoft SQL Server": 75,
    "CI/CD": 60,
    "C++": 75,
    "C#": 70,
    "JavaScript/TypeScript": 75,
    Python: 55,
    Unity: 70,
    "FL Studio": 45,
    Git: 85,
    "Visual Studio": 95,
    "Android Studio": 60,
    "Unity Editor": 75,
    "IntelliJ IDEA": 80,
    GitHub: 90,
  };

  const professionalSkills = [
    { name: t("creativity"), percentage: 85, pathClass: "path-1" },
    { name: t("communication"), percentage: 80, pathClass: "path-2" },
    { name: t("problem_solving"), percentage: 75, pathClass: "path-3" },
    { name: t("teamwork"), percentage: 90, pathClass: "path-4" },
  ];

  const viewCategories = [
    { key: "programming_skills", name: t("programming_skills") },
    { key: "professional_skills", name: t("professional_skills") },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="container mx-auto px-4 flex flex-col items-center h-full">
        <h2
          className={`section-heading text-center ${
            isVisible ? "animate-fade-in-down" : "opacity-0"
          }`}
        >
          {t("skills_title")}
        </h2>
        <div
          className={`flex justify-center gap-4 mt-10 mb-6 flex-wrap ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {viewCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveView(category.key)}
              className={`px-5 py-2 rounded-full transition-colors ${
                activeView === category.key
                  ? "bg-[hsl(var(--accent))] text-white"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
              style={{ animationDelay: isVisible ? `${index * 0.1}s` : "0s" }}
            >
              {category.name}
            </button>
          ))}
        </div>
        {activeView === "programming_skills" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-8 w-full">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className={`bg-card p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-border ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-6 mb-6">
                  {category.icon}
                  <h3 className="text-3xl font-bold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-3 mt-6">
                  {category.skills.map((skill, idx) => (
                    <TooltipProvider key={idx}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="px-4 py-2 bg-secondary text-foreground rounded-full text-base cursor-pointer transition-all duration-300 hover:bg-[hsl(var(--accent))] hover:text-white">
                            {skill}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-center">
                            <p className="font-bold">
                              {skill}: {skillLevels[skill]}%
                            </p>
                            <Progress
                              value={skillLevels[skill]}
                              className="w-40 h-2 mt-1"
                            />
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-8 w-full">
            {professionalSkills.map((skill, index) => (
              <div
                key={index}
                className={`flex flex-col items-center ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold mb-4">{skill.name}</h3>
                <div className="radial-bar animated-skill-card">
                  <svg
                    x="0px"
                    y="0px"
                    viewBox="0 0 200 200"
                    className="w-40 h-40"
                  >
                    <circle
                      className="progress-bar"
                      cx="100"
                      cy="100"
                      r="80"
                    ></circle>
                    <circle
                      className={`path ${skill.pathClass}`}
                      cx="100"
                      cy="100"
                      r="80"
                      style={
                        mounted && isVisible
                          ? {
                              strokeDashoffset: `${
                                502 - (100 * skill.percentage) / 100
                              }`,
                            }
                          : {}
                      }
                    ></circle>
                  </svg>
                  <div className="percentage mt-2">{skill.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
