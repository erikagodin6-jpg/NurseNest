import { useEffect, useRef, useState } from "react";
import { brandLogo } from "@/lib/theme-logos";

interface ThemedLogoProps {
  width?: number;
  className?: string;
}

function hslToRgb(hslStr: string): [number, number, number] {
  const match = hslStr.match(/[\d.]+/g);
  if (!match || match.length < 3) return [124, 58, 237];
  const h = parseFloat(match[0]) / 360;
  const s = parseFloat(match[1]) / 100;
  const l = parseFloat(match[2]) / 100;

  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ];
}

export function ThemedLogo({ width = 220, className = "" }: ThemedLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [primaryHsl, setPrimaryHsl] = useState("");

  useEffect(() => {
    const computeColor = () => {
      const style = getComputedStyle(document.documentElement);
      const hsl = style.getPropertyValue("--primary").trim();
      if (hsl) setPrimaryHsl(hsl);
    };
    computeColor();

    const observer = new MutationObserver(computeColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!primaryHsl) return;

    const [tr, tg, tb] = hslToRgb(primaryHsl);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const w = canvas.width;
      const h = canvas.height;

      let minX = w, maxX = 0, minY = h, maxY = 0;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = (r + g + b) / 3;

          if (brightness < 200) {
            const darkness = 1 - brightness / 255;
            data[i] = Math.round(tr * darkness + 255 * (1 - darkness));
            data[i + 1] = Math.round(tg * darkness + 255 * (1 - darkness));
            data[i + 2] = Math.round(tb * darkness + 255 * (1 - darkness));

            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          } else {
            data[i + 3] = 0;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      const pad = 4;
      const cx = Math.max(0, minX - pad);
      const cy = Math.max(0, minY - pad);
      const cw = Math.min(w - cx, maxX - minX + 1 + pad * 2);
      const ch = Math.min(h - cy, maxY - minY + 1 + pad * 2);

      const cropCanvas = document.createElement("canvas");
      cropCanvas.width = cw;
      cropCanvas.height = ch;
      const cropCtx = cropCanvas.getContext("2d");
      if (!cropCtx) return;
      cropCtx.drawImage(canvas, cx, cy, cw, ch, 0, 0, cw, ch);

      setDataUrl(cropCanvas.toDataURL("image/png"));
    };
    img.src = brandLogo;
  }, [primaryHsl]);

  return (
    <>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {dataUrl ? (
        <img
          src={dataUrl}
          alt="NurseNest"
          className={`max-w-none ${className}`}
          style={{ width: `${width}px`, height: "auto" }}
        />
      ) : (
        <img
          src={brandLogo}
          alt="NurseNest"
          className={`max-w-none ${className}`}
          style={{ width: `${width}px`, height: "auto" }}
        />
      )}
    </>
  );
}
