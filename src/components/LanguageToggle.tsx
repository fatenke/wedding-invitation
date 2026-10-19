import type { Language } from "../translations";

interface LanguageToggleProps {
  language: Language;
  label: string;
  targetLanguage: string;
  onToggle: () => void;
  className?: string;
}

export default function LanguageToggle({
  language,
  label,
  targetLanguage,
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
    >
      {targetLanguage}
    </button>
  );
}
