import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { translations, type Language } from "../translations";

interface FlowerIntroProps {
  language: Language;
  copy: (typeof translations)[Language];
  onToggleLanguage: () => void;
  leaving: boolean;
  onEnter: () => void;
  onExitComplete: () => void;
}

export default function FlowerIntro({
  language,
  copy,
  onToggleLanguage,
  leaving,
  onEnter,
  onExitComplete,
}: FlowerIntroProps) {
  const reducedMotion = useReducedMotion();
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const stageRef = useRef<HTMLElement>(null);
  const exitCompletedRef = useRef(false);

  useEffect(() => {
    stageRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!leaving) {
      return;
    }

    const exitTimeout = window.setTimeout(
      () => {
        if (!exitCompletedRef.current) {
          exitCompletedRef.current = true;
          onExitComplete();
        }
      },
      reducedMotion ? 50 : 1100,
    );
    return () => window.clearTimeout(exitTimeout);
  }, [leaving, onExitComplete, reducedMotion]);

  const handleVideoEnd = () => {
    if (!leaving) {
      onEnter();
    }
  };

  const handleAnimationComplete = () => {
    if (leaving && !exitCompletedRef.current) {
      exitCompletedRef.current = true;
      onExitComplete();
    }
  };

  return (
    <motion.section
      className={`flower-intro video-intro${leaving ? " is-leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={copy.introDialogLabel}
      tabIndex={-1}
      ref={stageRef}
      lang={language}
      dir={language === "ar" ? "rtl" : "ltr"}
      animate={leaving ? { opacity: 0, scale: 1.025 } : { opacity: 1, scale: 1 }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : leaving
            ? { duration: 1.05, ease: [0.72, 0, 0.28, 1] }
            : { duration: 0.8, ease: "easeOut" }
      }
      onAnimationComplete={handleAnimationComplete}
    >
      <video
        className="intro-video"
        src={`${import.meta.env.BASE_URL}images/video.mp4`}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onEnded={handleVideoEnd}
        onError={() => setVideoUnavailable(true)}
      />
      <div className="intro-video-overlay" aria-hidden="true" />
      <LanguageToggle
        className="intro-language"
        language={language}
        label={copy.languageLabel}
        onToggle={onToggleLanguage}
      />
      {videoUnavailable && (
        <div className="intro-video-error" role="alert">
          <p>{copy.introVideoError}</p>
          <button
            className="enter-button"
            type="button"
            onClick={onEnter}
            aria-label={copy.enterLabel}
          >
            <span>{copy.enterText}</span>
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      )}
    </motion.section>
  );
}
