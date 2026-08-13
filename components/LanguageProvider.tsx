"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";
import {
  contentByLanguage,
  isLanguage,
  LANGUAGE_STORAGE_KEY,
  type Language,
  type SiteContent
} from "@/lib/i18n";

type LanguageContextValue = {
  readonly language: Language;
  readonly content: SiteContent;
  readonly setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

type LanguageProviderProps = {
  readonly children: ReactNode;
};

function syncDocument(language: Language, content: SiteContent) {
  document.documentElement.lang = language === "en" ? "en" : "zh";
  document.documentElement.dataset.language = language;
  if (document.title !== content.metadata.title) {
    document.title = content.metadata.title;
  }

  const description = document.querySelector<HTMLMetaElement>(
    'meta[name="description"]'
  );
  if (description?.content !== content.metadata.description) {
    description?.setAttribute("content", content.metadata.description);
  }
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>("en");
  const pendingScrollRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (isLanguage(storedLanguage)) {
      setLanguageState(storedLanguage);
    } else if (storedLanguage !== null) {
      window.localStorage.removeItem(LANGUAGE_STORAGE_KEY);
    }
  }, []);

  const content = contentByLanguage[language];

  useLayoutEffect(() => {
    const pendingScroll = pendingScrollRef.current;
    if (!pendingScroll) return;

    window.scrollTo({
      top: pendingScroll.y,
      left: pendingScroll.x,
      behavior: "auto"
    });
    pendingScrollRef.current = null;
  }, [language]);

  useEffect(() => {
    syncDocument(language, content);
    const observer = new MutationObserver(() => {
      syncDocument(language, content);
    });
    observer.observe(document.head, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, [content, language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    if (nextLanguage === language) return;

    pendingScrollRef.current = { x: window.scrollX, y: window.scrollY };
    setLanguageState(nextLanguage);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  }, [language]);

  const value = useMemo(
    () => ({ language, content, setLanguage }),
    [content, language, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
