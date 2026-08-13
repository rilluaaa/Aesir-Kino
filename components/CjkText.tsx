"use client";

import { Fragment } from "react";
import { useLanguage } from "@/components/LanguageProvider";

type CjkTextProps = {
  readonly children: string;
};

export function CjkText({ children }: CjkTextProps) {
  const { language } = useLanguage();

  if (language === "en" || !children.includes("，")) {
    return children;
  }

  const segments = children.split("，");

  return segments.map((segment, index) => (
    <Fragment key={`${segment}-${index}`}>
      {segment}
      {index < segments.length - 1 ? (
        <span className="cjk-centered-comma">，</span>
      ) : null}
    </Fragment>
  ));
}
