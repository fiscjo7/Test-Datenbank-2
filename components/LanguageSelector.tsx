"use client";

export type UiLanguage = "de" | "en" | "es" | "fr" | "it" | "nl";

const languages: Array<{
  code: UiLanguage;
  flag: string;
  label: string;
}> = [
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "it", flag: "🇮🇹", label: "Italiano" },
  { code: "nl", flag: "🇳🇱", label: "Nederlands" },
];

type LanguageSelectorProps = {
  activeLanguage: UiLanguage;
  onLanguageChange: (language: UiLanguage) => void;
};

export const LanguageSelector = ({
  activeLanguage,
  onLanguageChange,
}: LanguageSelectorProps) => {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2 sm:justify-end"
      aria-label="Seitensprache auswählen"
    >
      {languages.map((language) => {
        const isActive = language.code === activeLanguage;

        return (
          <button
            key={language.code}
            type="button"
            onClick={() => onLanguageChange(language.code)}
            aria-label={`Seitensprache auf ${language.label} ändern`}
            aria-pressed={isActive}
            title={language.label}
            className={`flex h-10 w-10 items-center justify-center rounded-full border text-xl transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isActive
                ? "border-blue-600 bg-blue-50 shadow-sm ring-2 ring-blue-600 ring-offset-2"
                : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
            }`}
          >
            <span aria-hidden="true">{language.flag}</span>
          </button>
        );
      })}
    </div>
  );
};
