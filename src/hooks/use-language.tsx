import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "pl";

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
};

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",

    // Hero
    hello: "Hello, I am",
    iam: "I am",
    nick: "Simon",
    developer_description:
      "As a programming and technology enthusiast, I specialize in creating games, applications, and websites. I focus on fast, functional, and aesthetic solutions that meet the expectations of users and clients.",

    // About
    about_title: "About me",
    about_paragraph1:
      "I am a student at the Elite Technical School in Nowy Sącz, where I am developing my IT skills. For several years, I have been perfecting my programming skills by implementing various projects. I focus on clean, clear code and effective solutions.",
    about_paragraph2:
      "The experience gained during professional internships in October 2024 taught me teamwork, effective problem solving, and attention to detail. I constantly expand my knowledge by learning from experts and exploring new technologies.",
    about_paragraph3:
      "My goal is to develop in the IT industry and participate in ambitious, influential projects that change the world of technology.",
    contact_me: "Contact me",
    view_projects: "View projects",
    download_cv: "Download CV",

    // Skills
    skills_title: "Skills",
    frontend_development: "Front-end Development",
    backend_development: "Back-end Development",
    game_development: "Game Development",
    tools_others: "Tools & Others",
    programming_skills: "Programming Skills",
    professional_skills: "Professional Skills",
    creativity: "Creativity",
    communication: "Communication",
    problem_solving: "Problem Solving",
    teamwork: "Teamwork",

    // Projects
    projects_title: "My Projects",
    all_projects: "All Projects",
    websites_internet_apps: "Websites & Internet Applications",
    games: "Games",
    lesson_plan_title: "Lesson Plan",
    lesson_plan_desc:
      "Schedule for teachers and students, where you can find the necessary information about lessons, availability of rooms, teachers, office hours, classes.",
    daniel_rossario_title: "Daniel Rossario",
    daniel_rossario_desc:
      "Portfolio, which includes information about hairdressing services, the owner's shop with hairdressing products, registration for trainings and contact.",
    project_aunt_title: "Project for my Aunt",
    project_aunt_desc:
      "We will see, what a task I will do. I'm excited and ready to take on the challenge of a website. Love you Liam! Miss you guys!",
    doroblo_title: "Doroblo",
    doroblo_desc:
      "An application that connects clients with freelancers. People who use this app can earn extra money by helping with daily and seasonal household jobs.",
    millionaires_title: "Millionaires",
    millionaires_desc:
      "An online game based on the TV game of the same name, where you answer questions and can use 3 lifelines. It also has a ranking where players' points are saved.",
    pixel_snake_title: "Pixel Snake",
    pixel_snake_desc:
      "A browser game inspired by Snake. It has various difficulties that the player can choose to make the game more difficult, and a ranking where players' points are saved.",
    game_nr1_title: "Game Nr 1",
    game_nr1_desc:
      "Complex mobile game with advanced 3D graphics and immersive gameplay experiences. Features multiple levels and challenging mechanics.",
    game_nr2_title: "Game Nr 2",
    game_nr2_desc:
      "Strategy-based desktop game featuring resource management and tactical decision making. Supports multiplayer mode with real-time gameplay.",
    check: "Check",
    view_page: "View page",
    play: "Play",
    install: "Install",
    october_2024: "October 2024",
    february_2025: "February 2025",
    august_2025: "August 2025",
    february_2026: "February 2026",
    may_2024: "May 2024",
    september_2024: "September 2024",
    january_2025: "January 2025",

    // Contact
    contact_title: "Contact Us",
    get_in_touch: "Get in Touch",
    get_in_touch_text:
      "If you have any questions, a commission for me or would like to discuss a potential collaboration, please contact me. I will respond as soon as possible.",
    address: "Address:",
    phone: "Phone:",
    email: "Email:",
    send_message: "Send Message",
    name: "Name and surname",
    message: "Write your message...",
    send: "Send",
    sent: "Message sent successfully!",
    error: "Error sending message. Please try again later.",

    // Footer
    footer_start_project: "Start a project",
    footer_project_desc:
      "Interested in working together? We should queue up a chat. I'll buy the coffee.",
    footer_lets_do_this: "Let's do this",
    footer_about_desc:
      "As a passionate programmer and technology enthusiast, I specialize in creating games, applications, and websites. I focus on fast, functional, and aesthetic solutions.",
    useful_links: "Useful Links",
    projects_links: "Projects Links",
    news: "Newsletter",
    news_desc:
      "Provide your email address and receive notifications about newsletters.",
    your_email: "Your email address",
    all_rights_reserved: "All rights reserved",
    home: "Home",
    about2: "About",
    projects2: "Projects",
    skills2: "Skills",
    contact2: "Contact",

    email_coming_soon: "Newsletter incoming... ",

    honest_no_email_yet:
      "P.S. I'm coding hard to make this newsletter worth your inbox!",
  },
  pl: {
    // Navbar
    about: "O mnie",
    skills: "Umiejętności",
    projects: "Projekty",
    contact: "Kontakt",

    // Hero
    hello: "Cześć, jestem",
    iam: "Jestem",
    nick: "Szymon",
    developer_description:
      "Jako pasjonat programowania i technologii, specjalizuję się w tworzeniu gier, aplikacji oraz stron internetowych. Stawiam na szybkie, funkcjonalne i estetyczne rozwiązania, które spełniają oczekiwania użytkowników i klientów.",

    // About
    about_title: "O mnie",
    about_paragraph1:
      "Jestem uczniem Elitarnego Technikum w Nowym Sączu, gdzie rozwijam swoje umiejętności w dziedzinie IT. Od kilku lat doskonalę się w programowaniu, realizując różnorodne projekty. Stawiam na czysty, przejrzysty kod oraz efektywne rozwiązania.",
    about_paragraph2:
      "Doświadczenie zdobyte podczas praktyk zawodowych w październiku 2024 roku nauczyło mnie pracy zespołowej, skutecznego rozwiązywania problemów i dbałości o detale. Nieustannie poszerzam swoją wiedzę, ucząc się od ekspertów i eksplorując nowe technologie.",
    about_paragraph3:
      "Moim celem jest rozwój w branży IT i udział w ambitnych, wpływowych projektach, które zmieniają świat technologii.",
    contact_me: "Skontaktuj się",
    view_projects: "Zobacz projekty",
    download_cv: "Pobierz CV",

    // Skills
    skills_title: "Umiejętności",
    frontend_development: "Rozwój Front-endu",
    backend_development: "Rozwój Back-endu",
    game_development: "Tworzenie Gier",
    tools_others: "Narzędzia i Inne",
    programming_skills: "Umiejętności Programistyczne",
    professional_skills: "Umiejętności Profesjonalne",
    creativity: "Kreatywność",
    communication: "Komunikacja",
    problem_solving: "Rozwiązywanie Problemów",
    teamwork: "Praca Zespołowa",

    // Projects
    projects_title: "Moje Projekty",
    all_projects: "Wszystkie Projekty",
    websites_internet_apps: "Strony Internetowe i Aplikacje",
    games: "Gry",
    lesson_plan_title: "Plan Lekcji",
    lesson_plan_desc:
      "Harmonogram dla nauczycieli i uczniów, gdzie można znaleźć niezbędne informacje o lekcjach, dostępności sal, nauczycielach, godzinach pracy i klasach.",
    daniel_rossario_title: "Daniel Rossario",
    daniel_rossario_desc:
      "Portfolio zawierające informacje o usługach fryzjerskich, sklepie właściciela z produktami fryzjerskimi, rejestracji na szkolenia i kontakcie.",
    project_aunt_title: "Projekt dla mojej Cioci",
    project_aunt_desc:
      "Zobaczymy, jakie zadanie wykonam. Jestem podekscytowany i gotowy na wyzwanie stworzenia strony internetowej. Kocham Cię Liam! Tęsknię za Wami!",
    doroblo_title: "Doroblo",
    doroblo_desc:
      "Aplikacja łącząca klientów z freelancerami. Osoby korzystające z tej aplikacji mogą zarobić dodatkowe pieniądze, pomagając w codziennych i sezonowych pracach domowych.",
    millionaires_title: "Milionerzy",
    millionaires_desc:
      "Gra online oparta na telewizyjnym programie o tej samej nazwie, gdzie odpowiadasz na pytania i możesz użyć 3 kół ratunkowych. Posiada również ranking, w którym zapisywane są punkty graczy.",
    pixel_snake_title: "Pixel Snake",
    pixel_snake_desc:
      "Gra przeglądarkowa inspirowana Snake. Ma różne poziomy trudności, które gracz może wybrać, aby utrudnić grę, oraz ranking, w którym zapisywane są punkty graczy.",
    game_nr1_title: "Gra Nr 1",
    game_nr1_desc:
      "Zaawansowana gra mobilna z grafiką 3D i immersyjnym doświadczeniem rozgrywki. Zawiera wiele poziomów i wymagające mechaniki.",
    game_nr2_title: "Gra Nr 2",
    game_nr2_desc:
      "Gra strategiczna na komputer stacjonarny z zarządzaniem zasobami i taktycznym podejmowaniem decyzji. Obsługuje tryb wieloosobowy w czasie rzeczywistym.",
    check: "Sprawdź",
    view_page: "Zobacz stronę",
    play: "Graj",
    install: "Zainstaluj",
    october_2024: "Październik 2024",
    february_2025: "Luty 2025",
    august_2025: "Sierpień 2025",
    february_2026: "Luty 2026",
    may_2024: "Maj 2024",
    september_2024: "Wrzesień 2024",
    january_2025: "Styczeń 2025",

    // Contact
    contact_title: "Kontakt",
    get_in_touch: "Bądźmy w kontakcie",
    get_in_touch_text:
      "Jeśli masz jakieś pytania, zlecenie dla mnie lub chcesz omówić potencjalną współpracę, skontaktuj sie ze mna. Odpowiem tak szybko, jak tylko to możliwe.",
    address: "Adres:",
    phone: "Telefon:",
    email: "Email:",
    send_message: "Wyślij Wiadomość",
    name: "Imię i nazwisko",
    message: "Napisz swoją wiadomość...",
    send: "Wyślij",

    // Footer
    footer_start_project: "Rozpocznij projekt",
    footer_project_desc:
      "Zainteresowany współpracą? Powinniśmy umówić się na rozmowę. Ja stawiam kawę.",
    footer_lets_do_this: "Zróbmy to",
    footer_about_desc:
      "Jako pasjonat programowania i technologii, specjalizuję się w tworzeniu gier, aplikacji oraz stron internetowych. Stawiam na szybkie, funkcjonalne i estetyczne rozwiązania.",
    useful_links: "Przydatne Linki",
    projects_links: "Linki do projektów",
    news: "Aktualności",
    news_desc: "Podaj swój adres e-mail i otrzymuj powiadomienia o nowościach.",
    your_email: "Twój adres e-mail",
    all_rights_reserved: "Wszelkie prawa zastrzeżone",
    home: "Strona główna",
    about2: "O mnie",
    projects2: "Projekty",
    skills2: "Umiejętności",
    contact2: "Kontakt",

    email_coming_soon: "Aktualności w drodze... ",
    honest_no_email_yet:
      "P.S. Ciężko pracuję nad tym, aby te aktualności były warte Twojej skrzynki odbiorczej!",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("pl");

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "pl" ? "en" : "pl"));
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
