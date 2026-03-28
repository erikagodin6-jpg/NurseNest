"use client";

import { useCallback, useState } from "react";

type Props = {
  src: string;
  srcSet?: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
};

/**
 * Lesson list thumbnail — hides on error so a broken icon never shows.
 */
export function LessonCoverImage({ src, srcSet, alt, className, loading = "lazy" }: Props) {
  const [failed, setFailed] = useState(false);
  const onError = useCallback(() => setFailed(true), []);

  if (failed) return null;

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes="(max-width: 640px) 96px, 112px"
      alt={alt}
      loading={loading}
      decoding="async"
      className={className}
      onError={onError}
    />
  );
}
