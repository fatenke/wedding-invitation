import type { Language } from "../translations";
import { Languages } from "lucide-react";

interface LanguageToggleProps {
  language: Language;
  label: string;
  onToggle: () => void;
  className?: string;
}

export default function LanguageToggle({
  language,
  label,
  onToggle,
  className = "",
}: LanguageToggleProps) {
  return (
    <button
      className={`language-button ${className}`.trim()}
      type="button"
      onClick={onToggle}
      aria-label={label}
      lang={language === "en" ? "ar" : "en"}
      aria-live="polite"
    >
      <Languages size={14} strokeWidth={1.6} aria-hidden="true" />
      <span className={language === "en" ? "language-option is-active" : "language-option"}>EN</span>
      <span className="language-separator" aria-hidden="true">/</span>
      <span className={language === "ar" ? "language-option is-active" : "language-option"}>AR</span>
    </button>
  );
}
