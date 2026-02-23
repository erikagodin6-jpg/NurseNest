import brandLogoSrc from "@assets/blackbrandlogo_1771885401120.gif";
import logoOnlySrc from "@assets/blackogo_1771885401120.gif";

export const brandLogo = brandLogoSrc;
export const logoOnly = logoOnlySrc;

export function getLogoMaskStyle(src: string): React.CSSProperties {
  return {
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
