export const brandLogo = "/brand-logo.gif";
export const logoOnly = "/logo-icon.gif";

export function getLogoMaskStyle(src: string, height: number = 56): React.CSSProperties {
  const width = Math.round(height * 3.8);
  return {
    display: "inline-block",
    height: `${height}px`,
    width: `${width}px`,
    backgroundColor: "hsl(var(--primary))",
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "left center",
    WebkitMaskPosition: "left center",
  } as React.CSSProperties;
}
