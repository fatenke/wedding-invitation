
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Heart, MapPin } from "lucide-react";
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

        <section className="celebration" aria-labelledby="celebration-title">
          <motion.header
            className="celebration-heading"
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, ease: "easeOut" }}
          >
            <p className="celebration-kicker">{copy.eventsKicker}</p>
            <h2 id="celebration-title">{copy.eventsTitle}</h2>
            <div className="celebration-divider" aria-hidden="true">
              <span />
              <Heart size={14} />
              <span />
            </div>
          </motion.header>

          <div className="event-list">
            {[
              {
                title: copy.wtiaNight,
                date: copy.wtiaNightDate,
                dateTime: "2027-04-02",
                venue: copy.wtiaNightVenue,
                mapQuery: "Top Happiness, Lac 1, Tunisia",
                image: "/images/image.jpg",
                imageAlt: `${copy.firstName} & ${copy.secondName}`,
              },
              {
                title: copy.weddingNight,
                date: copy.weddingNightDate,
                dateTime: "2027-04-04",
                venue: copy.weddingNightVenue,
                mapQuery: "Dar Bouraoui, Carthage, Tunisia",
                image: "/images/image2.jpg",
                imageAlt: `${copy.firstName} & ${copy.secondName}`,
              },
            ].map((event, index) => (
              <motion.article
                className="event-card"
                key={event.dateTime}
                lang={language}
                dir={language === "ar" ? "rtl" : "ltr"}
                initial={reducedMotion ? false : { opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.8,
                  delay: reducedMotion ? 0 : index * 0.12,
                  ease: "easeOut",
                }}
              >
                <div className="event-photo">
                  <img src={event.image} alt={event.imageAlt} loading="lazy" />
                  <span className="event-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
                <div className="event-details">
                  <p className="event-date">
                    <time dateTime={event.dateTime}>{event.date}</time>
                  </p>
                  <h3>{event.title}</h3>
                  <p className="event-venue">
                    <MapPin size={16} strokeWidth={1.5} aria-hidden="true" />
                    <span dir="ltr">{event.venue}</span>
                  </p>
                  <a
                    className="event-map-link"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapQuery)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{copy.mapLink}</span>
                    <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {invitationOpened && (
          <motion.div
            className="invitation-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="invitation-title"
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
                type="button"
                onClick={() => setInvitationOpened(false)}
                aria-label={copy.closeInvitation}
              >
                ×
              </button>

              <div className="invitation-photo" aria-hidden="true">
                <img src="/images/image.jpg" alt="" />
                <p>{copy.firstName} &amp; {copy.secondName}</p>
              </div>
              <div className="invitation-copy" lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
                <Heart size={25} strokeWidth={1.2} aria-hidden="true" />
                <p className="eyebrow">{copy.invited}</p>
                <h2 id="invitation-title">
                  {copy.modalTitleStart} <em>{copy.modalTitleEmphasis}</em>
                </h2>
                <div className="modal-line" />
                <p className="modal-names">
                  {copy.firstName} &amp; {copy.secondName}
                </p>
                <div className="modal-events">
                  <div className="modal-event">
                    <p className="modal-event-name">{copy.wtiaNight}</p>
                    <time dateTime="2027-04-02">{copy.wtiaNightDate}</time>
                    <p className="modal-event-venue" dir="ltr">{copy.wtiaNightVenue}</p>
                  </div>
                  <div className="modal-event">
                    <p className="modal-event-name">{copy.weddingNight}</p>
                    <time dateTime="2027-04-04">{copy.weddingNightDate}</time>
                    <p className="modal-event-venue" dir="ltr">{copy.weddingNightVenue}</p>
                  </div>
                </div>
              </div>
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
