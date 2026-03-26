// Selectively salvaged from the legacy stripe price map shape.
export type PriceEntry = {
  tier: "RPN" | "LVN_LPN" | "RN" | "NP";
  country: "CA" | "US";
  duration: "monthly" | "3-month" | "6-month" | "yearly";
  priceId: string;
};

export const priceMap: PriceEntry[] = [
  { tier: "RPN", country: "CA", duration: "monthly", priceId: "price_1TAuwGChmmgDwbsxroS4xFW9" },
  { tier: "RN", country: "CA", duration: "monthly", priceId: "price_1TAuwJChmmgDwbsxfDR5LAza" },
  { tier: "NP", country: "CA", duration: "monthly", priceId: "price_1TAuwMChmmgDwbsxmtmXPLRO" },
  { tier: "LVN_LPN", country: "US", duration: "monthly", priceId: "price_1TAuwHChmmgDwbsxThEUQr57" },
  { tier: "RN", country: "US", duration: "monthly", priceId: "price_1TAuwJChmmgDwbsxslzAK5Sf" },
  { tier: "NP", country: "US", duration: "monthly", priceId: "price_1TAuwMChmmgDwbsxJeq6yl1r" },
];
