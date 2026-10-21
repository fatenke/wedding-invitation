
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Heart, MapPin, Volume2, VolumeX } from "lucide-react";
import LanguageToggle from "./components/LanguageToggle";
import { translations, type Language } from "./translations";
import "./index.css";

export default function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const copy = translations[language];
  const reducedMotion = useReducedMotion();

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
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const removeGestureListeners = () => {
      document.removeEventListener("pointerdown", startMusic);
      document.removeEventListener("keydown", startMusic);
    };
    const startMusic = (event?: Event) => {
      if (
        event?.target instanceof Element &&
        event.target.closest(".music-button")
      ) {
        return;
      }

      void audio.play().then(removeGestureListeners).catch(() => {
        // Browsers may block sound until the visitor interacts with the page.
      });
    };

    document.addEventListener("pointerdown", startMusic);
    document.addEventListener("keydown", startMusic);
    startMusic();

    return removeGestureListeners;
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
      setMusicError(false);
    } catch {
      setMusicError(true);
    }
  };

  return (
    <main lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="wedding-site">
        <audio
          ref={audioRef}
          src="/audio/Bruno%20Mars%20-%20Marry%20You.mp3"
          autoPlay
          loop
          preload="auto"
          onPlay={() => {
            setMusicPlaying(true);
            setMusicError(false);
          }}
          onPause={() => setMusicPlaying(false)}
          onError={() => {
            setMusicPlaying(false);
            setMusicError(true);
            console.error("The wedding music could not be loaded.");
          }}
        />
        <section className="hero">
          <motion.div
            className="hero-image"
            initial={
              reducedMotion
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 1.08, filter: "blur(12px)" }
            }
            animate={{
              opacity: 1,
              scale: reducedMotion ? 1 : [1.04, 1.12],
              filter: "blur(0px)",
            }}
            transition={photoTransition}
            aria-hidden="true"
          />
          <div className="hero-overlay" />

          <nav className="navbar">
            <button
              className={`music-button${musicPlaying ? " is-playing" : ""}`}
              type="button"
              onClick={toggleMusic}
              aria-label={musicPlaying ? copy.pauseMusic : copy.playMusic}
              aria-pressed={musicPlaying}
              title={musicPlaying ? copy.pauseMusic : copy.playMusic}
            >
              {musicPlaying ? <Volume2 size={15} /> : <VolumeX size={15} />}
              <span>{copy.musicLabel}</span>
              <span className="music-indicator" aria-hidden="true" />
            </button>
            <LanguageToggle
              language={language}
              label={copy.languageLabel}
              onToggle={() => setLanguage(language === "en" ? "ar" : "en")}
            />
            {musicError && (
              <span className="music-error" role="status">
                {copy.musicError}
              </span>
            )}
          </nav>

          <motion.div
            className="hero-content"
            initial={reducedMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 1.1,
              delay: reducedMotion ? 0 : 0.38,
              ease: "easeOut",
            }}
            id="home"
          >
            <motion.p
              className="eyebrow"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.75, delay: reducedMotion ? 0 : 0.65 }}
            >
              {copy.heroKicker}
            </motion.p>

            <motion.h1
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.9, delay: reducedMotion ? 0 : 0.82 }}
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
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: reducedMotion ? 0 : 0.9, delay: reducedMotion ? 0 : 1.02 }}
            >
              <span />
              <Heart size={14} />
              <span />
            </motion.div>

            <motion.p
              className="couple-names"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.75, delay: reducedMotion ? 0 : 1.12 }}
            >
              {copy.firstName} <span>&amp;</span> {copy.secondName}
            </motion.p>

            <motion.p
              className="hero-description"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.75, delay: reducedMotion ? 0 : 1.28 }}
            >
              {copy.heroDescriptionStart}
              <br className="desktop-break" />
              {copy.heroDescriptionEnd}
            </motion.p>

            <motion.button
              className="invitation-button"
              onClick={() => setInvitationOpened(true)}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.75, delay: reducedMotion ? 0 : 1.42 }}
            >
              <span>{copy.discoverInvitation}</span>
              <ArrowRight size={17} />
            </motion.button>
          </motion.div>

        </section>

        <section className="celebration" aria-labelledby="celebration-title">
          <motion.header
            className="celebration-heading"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reducedMotion ? 0.35 : 0.8, ease: "easeOut" }}
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
                initial={{ opacity: 0, y: reducedMotion ? 0 : 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: reducedMotion ? 0.35 : 0.8,
                  delay: index * 0.12,
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

    </main>
  );
}
