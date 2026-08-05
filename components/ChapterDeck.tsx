"use client";

import { useEffect, useState, type ReactNode } from "react";

export type Chapter = {
  id: string;
  label: string;
  content: ReactNode;
};

type ChapterDeckProps = {
  chapters: Chapter[];
};

export function ChapterDeck({ chapters }: ChapterDeckProps) {
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? "");

  useEffect(() => {
    const chapterElements = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleChapter = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              Math.abs(first.boundingClientRect.top) -
              Math.abs(second.boundingClientRect.top)
          )[0];

        if (visibleChapter) {
          setActiveId(visibleChapter.target.id);
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );

    chapterElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [chapters]);

  const activeIndex = Math.max(
    chapters.findIndex((chapter) => chapter.id === activeId),
    0
  );
  const activeChapter = chapters[activeIndex];

  return (
    <main className="chapter-deck">
      <div className="chapter-deck__status" aria-live="polite">
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <span className="chapter-deck__status-line" />
        <span>{activeChapter?.label}</span>
      </div>

      <nav aria-label="Impact report chapters" className="chapter-deck__nav">
        {chapters.map((chapter) => (
          <a
            aria-current={chapter.id === activeId ? "location" : undefined}
            aria-label={`Go to ${chapter.label}`}
            className={chapter.id === activeId ? "is-active" : undefined}
            href={`#${chapter.id}`}
            key={chapter.id}
          />
        ))}
      </nav>

      <div className="chapter-deck__flow">
        {chapters.map((chapter) => (
          <div className="chapter-deck__chapter" id={chapter.id} key={chapter.id}>
            {chapter.content}
          </div>
        ))}
      </div>
    </main>
  );
}
