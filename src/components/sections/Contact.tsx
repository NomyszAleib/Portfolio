import React, { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import emailjs from "@emailjs/browser";

// Initialize EmailJS with your public key
emailjs.init("Zbvyisg6N-HdYG4iF");

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    console.log("Form reference:", form.current); // Debug form ref

    emailjs
      .sendForm("service_a4t5s8b", "template_8sb5at4", form.current, {
        publicKey: "Zbvyisg6N-HdYG4iF",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setFormData({ name: "", email: "", message: "" });
          alert("Message sent successfully!");
        },
        (error) => {
          console.error("FAILED...", error);
          alert("Failed to send message. Please try again later.");
        }
      );
  };

  const { t } = useLanguage();
  const sectionRef = useRef(null);
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

  const contactInfo = [
    {
      icon: <MapPin className="w-8 h-8 text-accent" />,
      title: t("address"),
      details: "Zielona 27 WSB-NLU",
    },
    {
      icon: <Phone className="w-8 h-8 text-accent" />,
      title: t("phone"),
      details: "+48 ",
    },
    {
      icon: <Mail className="w-8 h-8 text-accent" />,
      title: t("email"),
      details: "szymon.biela03@gmail.com",
      isEmail: true,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="container mx-auto px-4 flex flex-col items-center h-full">
        <h2
          className={`section-heading text-center ${
            isVisible ? "animate-fade-in-down" : "opacity-0"
          }`}
        >
          {t("contact_title")}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16 w-full">
          <div
            className={`${isVisible ? "animate-fade-in-left" : "opacity-0"}`}
          >
            <div className="mb-12">
              <h3 className="text-3xl font-bold mb-6">{t("get_in_touch")}</h3>
              <p className="text-lg text-muted-foreground">
                {t("get_in_touch_text")}
              </p>
            </div>
            <div className="space-y-8">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-6 transition-transform duration-300 hover:translate-x-2 ${
                    isVisible ? "animate-fade-in-left" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="p-4 bg-secondary rounded-full transition-all duration-300 hover:bg-[hsl(var(--accent)/0.2)]">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-medium">{item.title}</h4>
                    {item.isEmail ? (
                      <a
                        href={`mailto:${item.details}`}
                        className="text-[hsl(var(--accent))] text-lg hover:underline"
                      >
                        {item.details}
                      </a>
                    ) : (
                      <p className="text-muted-foreground text-lg">
                        {item.details}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`animated-form ${
              isVisible ? "animate-fade-in-right" : "opacity-0"
            }`}
          >
            <h3 className="text-2xl font-bold mb-6">{t("send_message")}</h3>
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input-animated"
                  required
                />
                <label htmlFor="name" className="form-label-animated">
                  {t("name")}
                </label>
              </div>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input-animated"
                  required
                />
                <label htmlFor="email" className="form-label-animated">
                  Email
                </label>
              </div>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="form-input-animated resize-none"
                  required
                ></textarea>
                <label htmlFor="message" className="form-label-animated">
                  {t("message")}
                </label>
              </div>
              <button
                type="submit"
                className="relative overflow-hidden px-6 py-3 bg-accent text-white rounded-full transition-all duration-200 flex items-center gap-2 w-full justify-center cursor-pointer"
                style={{
                  fontFamily: "inherit",
                  fontSize: "20px",
                  padding: "0.7em 1em",
                  paddingLeft: "0.9em",
                  border: "none",
                }}
              >
                <div
                  className="svg-wrapper"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="transition-transform duration-300 ease-in-out"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    ></path>
                  </svg>
                </div>
                <span className="ml-2 transition-transform duration-300 ease-in-out">
                  {t("send")}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
