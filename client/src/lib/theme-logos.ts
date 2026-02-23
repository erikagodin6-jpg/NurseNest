import blueLogo from "@assets/bluelogo_1771884747919.gif";
import blueBrand from "@assets/bluebrandlogo_1771884747919.gif";
import mintLogo from "@assets/mintogo_1771884747919.gif";
import mintBrand from "@assets/mintbrandlogo_1771884747919.gif";
import pinkLogo from "@assets/pinklogo_1771884747919.png";
import pinkBrand from "@assets/pinkbrandlogo_1771885388783.gif";
import purpleLogo from "@assets/purplelogo_1771885401120.gif";
import purpleBrand from "@assets/purplebrandlogo_1771885401120.gif";
import blackLogo from "@assets/blackogo_1771885401120.gif";
import blackBrand from "@assets/blackbrandlogo_1771885401120.gif";

type LogoColor = "blue" | "mint" | "pink" | "purple" | "black";

const logoAssets: Record<LogoColor, { logo: string; brand: string }> = {
  blue: { logo: blueLogo, brand: blueBrand },
  mint: { logo: mintLogo, brand: mintBrand },
  pink: { logo: pinkLogo, brand: pinkBrand },
  purple: { logo: purpleLogo, brand: purpleBrand },
  black: { logo: blackLogo, brand: blackBrand },
};

const themeToColor: Record<string, LogoColor> = {
  lavender: "purple",
  mint: "mint",
  blush: "pink",
  slate: "black",
  midnight: "black",
  ocean: "blue",
  forest: "mint",
  "clinical-light": "blue",
  "pastel-blush": "pink",
  "pastel-lavender": "purple",
  "pastel-mint": "mint",
  "neutral-sand": "black",
  "neutral-slate": "black",
  "dark-clinical": "blue",
  "dark-academia": "black",
  "rose-gold": "pink",
  coral: "pink",
  indigo: "purple",
  teal: "mint",
  berry: "purple",
};

export function getThemeLogo(theme: string | undefined): { logo: string; brand: string } {
  const color = themeToColor[theme || "lavender"] || "purple";
  return logoAssets[color];
}
