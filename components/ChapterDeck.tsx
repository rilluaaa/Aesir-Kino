"use client";

import { useEffect, useState, type ReactNode } from "react";
import { interpolate } from "@/lib/i18n";

export type Chapter = {
  id: string;
  label: string;
  content: ReactNode;
};

type ChapterDeckProps = {
  chapters: Chapter[];
  accessibility: {
    readonly chapterNavigation: string;
    readonly goToChapter: string;
  };
};

export function ChapterDeck({ accessibility, chapters }: ChapterDeckProps) {
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? "");
  const chapterIds = chapters.map((chapter) => chapter.id).join("|");

  useEffect(() => {
    const chapterElements = chapterIds
      .split("|")
      .map((chapterId) => document.getElementById(chapterId))
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
  }, [chapterIds]);

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

      <nav aria-label={accessibility.chapterNavigation} className="chapter-deck__nav">
        {chapters.map((chapter) => (
          <a
            aria-current={chapter.id === activeId ? "location" : undefined}
            aria-label={interpolate(accessibility.goToChapter, {
              chapter: chapter.label
            })}
            className={chapter.id === activeId ? "is-active" : undefined}
            href={`#${chapter.id}`}
            key={chapter.id}
          />
        ))}
      </nav>

      <div className="chapter-deck__flow" data-section-continuity="gradient">
        {chapters.map((chapter) => (
          <div className="chapter-deck__chapter" id={chapter.id} key={chapter.id}>
            {chapter.content}
          </div>
        ))}
      </div>
    </main>
  );
}
