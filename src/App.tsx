
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import FlowerIntro from "./components/FlowerIntro";
import LanguageToggle from "./components/LanguageToggle";
import { translations, type Language } from "./translations";
import "./index.css";

export default function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [introState, setIntroState] = useState<"open" | "exiting" | "closed">(
    "open",
  );
  const [invitationOpened, setInvitationOpened] = useState(false);
  const homeHeadingRef = useRef<HTMLHeadingElement>(null);
  const originalBodyOverflowRef = useRef<string | null>(null);
  const copy = translations[language];
  const reducedMotion = useReducedMotion();
  const revealHero = introState !== "open";

  const photoTransition = reducedMotion
    ? { duration: 0 }
    : {
        opacity: { duration: 1.8, ease: "easeOut" as const },
        filter: { duration: 1.8, ease: "easeOut" as const },
        scale: { duration: 24, ease: "linear" as const },
      };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.title = translations[language].pageTitle;
  }, [language]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    originalBodyOverflowRef.current = originalOverflow;
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    if (introState !== "closed") {
      document.body.style.overflow = "hidden";
      return;
    }

    document.body.style.overflow = originalBodyOverflowRef.current ?? "";
    const frame = requestAnimationFrame(() => {
      homeHeadingRef.current?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [introState]);

  return (
    <main lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="wedding-site" inert={introState !== "closed"}>
        <section className="hero">
          <motion.div
            className="hero-image"
            initial={
              reducedMotion
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 1.08, filter: "blur(12px)" }
            }
            animate={
              revealHero
                ? {
                    opacity: 1,
                    scale: reducedMotion ? 1 : [1.04, 1.12],
                    filter: "blur(0px)",
                  }
                : reducedMotion
                  ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, scale: 1.08, filter: "blur(12px)" }
            }
            transition={photoTransition}
            aria-hidden="true"
          />
          <div className="hero-overlay" />

          <nav className="navbar">
            <LanguageToggle
              language={language}
              label={copy.languageLabel}
              targetLanguage={copy.languageName}
              onToggle={() => setLanguage(language === "en" ? "ar" : "en")}
            />
          </nav>

          <motion.div
            className="hero-content"
            initial={reducedMotion ? false : { opacity: 0, y: 22 }}
            animate={
              revealHero
                ? { opacity: 1, y: 0 }
                : reducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 22 }
            }
            transition={{
              duration: reducedMotion ? 0 : 1.1,
              delay: reducedMotion || !revealHero ? 0 : 0.38,
              ease: "easeOut",
            }}
            id="home"
          >
            <motion.p
              className="eyebrow"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={revealHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: reducedMotion ? 0 : 0.75, delay: revealHero && !reducedMotion ? 0.65 : 0 }}
            >
              {copy.heroKicker}
            </motion.p>

            <motion.h1
              ref={homeHeadingRef}
              tabIndex={-1}
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={revealHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: reducedMotion ? 0 : 0.9, delay: revealHero && !reducedMotion ? 0.82 : 0 }}
            >
              {copy.heroTitleStart}
              <br />
              <em>{copy.heroTitleEmphasis}</em>
              <br />
              {copy.heroTitleEnd}
            </motion.h1>
            <motion.div
              className="hero-divider"
              initial={reducedMotion ? false : { opacity: 0, scaleX: 0.4 }}
              animate={revealHero ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.4 }}
              transition={{ duration: reducedMotion ? 0 : 0.9, delay: revealHero && !reducedMotion ? 1.02 : 0 }}
            >
              <span />
              <Heart size={14} />
              <span />
            </motion.div>

            <motion.p
              className="couple-names"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={revealHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: reducedMotion ? 0 : 0.75, delay: revealHero && !reducedMotion ? 1.12 : 0 }}
            >
              {copy.firstName} <span>&amp;</span> {copy.secondName}
            </motion.p>

            <motion.p
              className="hero-description"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={revealHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: reducedMotion ? 0 : 0.75, delay: revealHero && !reducedMotion ? 1.28 : 0 }}
            >
              {copy.heroDescriptionStart}
              <br className="desktop-break" />
              {copy.heroDescriptionEnd}
            </motion.p>

            <motion.button
              className="invitation-button"
              onClick={() => setInvitationOpened(true)}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={revealHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: reducedMotion ? 0 : 0.75, delay: revealHero && !reducedMotion ? 1.42 : 0 }}
            >
              <span>{copy.discoverInvitation}</span>
              <ArrowRight size={17} />
            </motion.button>
          </motion.div>

        </section>

        {invitationOpened && (
          <motion.div
            className="invitation-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setInvitationOpened(false)}
          >
            <motion.div
              className="invitation-card"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="close-button"
                onClick={() => setInvitationOpened(false)}
                aria-label={copy.closeInvitation}
              >
                ×
              </button>

              <Heart size={25} strokeWidth={1.2} />
              <p className="eyebrow">{copy.invited}</p>
              <h2>
                {copy.modalTitleStart} <em>{copy.modalTitleEmphasis}</em>
              </h2>
              <div className="modal-line" />
              <p className="modal-names">
                {copy.firstName} &amp; {copy.secondName}
              </p>
              <p className="modal-details">{copy.modalDetails}</p>
              <p className="date-placeholder">{copy.datePlaceholder}</p>
              <p className="modal-hint">{copy.modalHint}</p>
            </motion.div>
          </motion.div>
        )}
      </div>

      {introState !== "closed" && (
        <FlowerIntro
          language={language}
          copy={copy}
          onToggleLanguage={() =>
            setLanguage(language === "en" ? "ar" : "en")
          }
          leaving={introState === "exiting"}
          onEnter={() => setIntroState("exiting")}
          onExitComplete={() => setIntroState("closed")}
        />
      )}

    </main>
  );
}
