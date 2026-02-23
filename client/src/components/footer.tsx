import { Link } from "wouter";
import { brandLogo } from "@/lib/theme-logos";

export function Footer() {
  return (
    <footer className="bg-white border-t border-primary/10 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img
              src={brandLogo}
              alt="NurseNest"
              className="max-w-none" style={{width: "200px", height: "auto"}}
            />
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Use</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link>
            <Link href="/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link>
            <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          </div>
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NurseNest. All Rights Reserved.
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-gray-400 max-w-3xl mx-auto leading-relaxed">
          NurseNest is an independent educational platform. It is not affiliated with, endorsed by, or connected to NCLEX, NCSBN, CNO, or any nursing regulatory body. All content is developed independently for educational purposes only.
        </div>
      </div>
    </footer>
  );
}
