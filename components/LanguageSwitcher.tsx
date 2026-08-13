"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { CjkText } from "@/components/CjkText";
import { useLanguage } from "@/components/LanguageProvider";
import { languageNames, languages, type Language } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { content, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef(new Map<Language, HTMLButtonElement>());

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      itemRefs.current.get(language)?.focus();
    }
  }, [isOpen, language]);

  const closeAndRestoreFocus = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === "Enter" || event.key === " ") && !isOpen) {
      event.preventDefault();
      setIsOpen(true);
    } else if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      closeAndRestoreFocus();
    }
  };

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeAndRestoreFocus();
      return;
    }

    if (![
      "ArrowDown",
      "ArrowUp",
      "Home",
      "End"
    ].includes(event.key)) return;

    event.preventDefault();
    const currentIndex = Math.max(
      languages.findIndex((item) => itemRefs.current.get(item) === document.activeElement),
      0
    );
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? languages.length - 1
        : event.key === "ArrowDown"
          ? (currentIndex + 1) % languages.length
          : (currentIndex - 1 + languages.length) % languages.length;

    itemRefs.current.get(languages[nextIndex])?.focus();
  };

  const chooseLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className="language-switcher" ref={rootRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={content.languageSelector.selectLanguage}
        className="language-switcher__trigger"
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleTriggerKeyDown}
        ref={triggerRef}
        type="button"
      >
        <span><CjkText>{content.languageSelector.compact}</CjkText></span>
        <span aria-hidden="true" className="language-switcher__chevron">▾</span>
      </button>

      {isOpen ? (
        <div
          aria-label={content.languageSelector.language}
          className="language-switcher__menu"
          onKeyDown={handleMenuKeyDown}
          role="menu"
        >
          {languages.map((option) => (
            <button
              aria-checked={option === language}
              className="language-switcher__item"
              key={option}
              onClick={() => chooseLanguage(option)}
              ref={(node) => {
                if (node) itemRefs.current.set(option, node);
                else itemRefs.current.delete(option);
              }}
              role="menuitemradio"
              type="button"
            >
              <span><CjkText>{languageNames[option]}</CjkText></span>
              <span aria-hidden="true" className="language-switcher__check">
                {option === language ? "●" : ""}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
