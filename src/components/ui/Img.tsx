"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import blur from "@/content/blur.json";

const blurMap = blur as Record<string, string>;

/**
 * next/image wrapper that auto-applies a generated blur placeholder
 * (from src/content/blur.json) so images bloom in instead of popping.
 * On load error it degrades to a neutral surface instead of a broken icon.
 */
export default function Img({ src, ...rest }: ImageProps & { src: string }) {
  const [failed, setFailed] = useState(false);
  const dataURL = blurMap[src];

  if (failed) {
    return <span aria-hidden className="block h-full w-full bg-bg2" />;
  }

  // Eager-load by default (unless the caller marks it `priority`, which already
  // implies eager). Demo images are pre-sized static WebP, so fetching them up
  // front is cheap and GUARANTEES no empty slot — they no longer depend on
  // lazy-load firing through a transformed `.reveal` ancestor.
  const eager = rest.priority ? {} : { loading: "eager" as const };

  return (
    <Image
      src={src}
      onError={() => setFailed(true)}
      decoding="async"
      {...eager}
      {...(dataURL ? { placeholder: "blur" as const, blurDataURL: dataURL } : {})}
      {...rest}
    />
  );
}
