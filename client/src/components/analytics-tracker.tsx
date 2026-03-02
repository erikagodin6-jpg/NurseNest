import { useEffect } from "react";
import { useLocation } from "wouter";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default function AnalyticsTracker() {
  const [location] = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: location,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
}

export function trackCheckoutBegin(productName: string, productPrice: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "begin_checkout", {
      currency: "CAD",
      value: productPrice,
      items: [{ item_name: productName, price: productPrice }],
    });
  }
}

export function trackPurchase(orderId: string, totalAmount: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: orderId,
      value: totalAmount,
      currency: "CAD",
    });
  }
}
