import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import FlowerAnimation from "./FlowerAnimation";
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

const bloomDuration = 2450;
const particles = [
  { left: "16%", top: "28%", delay: 0.1, size: 3 },
  { left: "27%", top: "66%", delay: 1.2, size: 2 },
  { left: "78%", top: "25%", delay: 0.8, size: 3 },
  { left: "85%", top: "60%", delay: 1.7, size: 2 },
  { left: "12%", top: "53%", delay: 2.3, size: 2 },
  { left: "70%", top: "72%", delay: 0.5, size: 2 },
];
const driftingPetals = [
  { left: "24%", top: "39%", delay: 0.4, rotate: -28 },
  { left: "81%", top: "44%", delay: 1.5, rotate: 38 },
  { left: "34%", top: "77%", delay: 2.2, rotate: 16 },
  { left: "69%", top: "18%", delay: 0.9, rotate: -42 },
];

export default function FlowerIntro({
  language,
  copy,
  onToggleLanguage,
  leaving,
  onEnter,
  onExitComplete,
}: FlowerIntroProps) {
  const reducedMotion = useReducedMotion();
  const [bloomed, setBloomed] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const exitCompletedRef = useRef(false);
  const hasBloomed = Boolean(reducedMotion) || bloomed;

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const timeout = window.setTimeout(() => setBloomed(true), bloomDuration);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion]);

  useEffect(() => {
    stageRef.current?.focus();
  }, []);

  const handleAnimationComplete = () => {
    if (leaving && !exitCompletedRef.current) {
      exitCompletedRef.current = true;
      onExitComplete();
    }
  };

  return (
    <motion.section
      className={`flower-intro${leaving ? " is-leaving" : ""}`}
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
      <div className="intro-glow" aria-hidden="true" />
      <LanguageToggle
        className="intro-language"
        language={language}
        label={copy.languageLabel}
        onToggle={onToggleLanguage}
      />

      <div className="intro-atmosphere" aria-hidden="true">
        {particles.map((particle, index) => (
          <motion.span
            className="intro-particle"
            key={`particle-${index}`}
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={
              leaving
                ? { opacity: 0, y: -38, x: index % 2 === 0 ? 18 : -18 }
                : { opacity: [0.16, 0.72, 0.2], y: [0, -14, 0] }
            }
            transition={{
              duration: reducedMotion ? 0 : 5 + (index % 3),
              delay: reducedMotion ? 0 : particle.delay,
              repeat: leaving || reducedMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        {driftingPetals.map((petal, index) => (
          <motion.span
            className="intro-petal"
            key={`petal-${index}`}
            style={{
              left: petal.left,
              top: petal.top,
              rotate: petal.rotate,
            }}
            animate={
              leaving
                ? { opacity: 0, y: index % 2 === 0 ? -54 : 48, x: index % 2 === 0 ? 34 : -28 }
                : { opacity: [0.24, 0.54, 0.24], y: [0, -9, 0], rotate: [petal.rotate, petal.rotate + 12, petal.rotate] }
            }
            transition={{
              duration: reducedMotion ? 0 : 6 + index,
              delay: reducedMotion ? 0 : petal.delay,
              repeat: leaving || reducedMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="intro-composition">
        <motion.div
          className="flower-illustration"
          animate={leaving ? { y: -18, scale: 0.82, rotate: -5, opacity: 0 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.82, ease: "easeInOut" }}
        >
          <FlowerAnimation open={hasBloomed} dissolving={leaving} />
        </motion.div>

        {hasBloomed && (
          <motion.div
            className="intro-copy"
            initial={{ opacity: 0, y: 20 }}
            animate={leaving ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : leaving ? 0.65 : 1, delay: leaving ? 0 : 0.12, ease: "easeOut" }}
          >
            <p className="intro-kicker">{copy.introKicker}</p>
            <h1 className="intro-title">{copy.introTitle}</h1>
            <p className="intro-names">
              {copy.firstName} <span>&amp;</span> {copy.secondName}
            </p>
            <div className="intro-divider" aria-hidden="true">
              <span />
              <span className="intro-diamond">✧</span>
              <span />
            </div>
            <button
              className="enter-button"
              onClick={() => {
                if (!leaving) onEnter();
              }}
              aria-disabled={leaving}
              aria-label={copy.enterLabel}
            >
              <span>{copy.enterText}</span>
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
