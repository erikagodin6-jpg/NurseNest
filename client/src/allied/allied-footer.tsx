import { Link } from "wouter";
import { GraduationCap, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getMainSiteUrl } from "@/lib/locale-utils";

function useLocaleCode(): string | undefined {
  const { language } = useI18n();
  return language === "en" ? undefined : language;
}

export function AlliedFooter() {
  const locale = useLocaleCode();

  const mainSiteHome = getMainSiteUrl("/", locale);
  const mainSitePricing = getMainSiteUrl("/pricing", locale);
  const mainSiteNewGrad = getMainSiteUrl("/new-grad", locale);
  const mainSiteCareerTools = getMainSiteUrl("/new-grad#career-tools", locale);
  const mainSiteFaq = getMainSiteUrl("/faq", locale);

  return (
    <footer className="bg-white border-t border-teal-100 py-12 mt-auto" data-testid="allied-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Careers</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/rrt" className="hover:text-teal-600 transition-colors" data-testid="link-footer-rrt">Respiratory Therapist</Link></li>
              <li><Link href="/paramedic" className="hover:text-teal-600 transition-colors" data-testid="link-footer-paramedic">Paramedic</Link></li>
              <li><Link href="/pharmacy-technician" className="hover:text-teal-600 transition-colors" data-testid="link-footer-pharmacy-tech">Pharmacy Technician</Link></li>
              <li><Link href="/mlt" className="hover:text-teal-600 transition-colors" data-testid="link-footer-mlt">Medical Lab Tech</Link></li>
              <li><Link href="/imaging" className="hover:text-teal-600 transition-colors" data-testid="link-footer-imaging">Diagnostic Imaging</Link></li>
              <li><Link href="/occupational-therapy" className="hover:text-teal-600 transition-colors" data-testid="link-footer-occupational-therapy">Occupational Therapy</Link></li>
              <li><Link href="/physical-therapy" className="hover:text-teal-600 transition-colors" data-testid="link-footer-physical-therapy">Physical Therapy</Link></li>
              <li><Link href="/social-work" className="hover:text-teal-600 transition-colors" data-testid="link-footer-social-work">Social Work</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Study Tools</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/careers" className="hover:text-teal-600 transition-colors" data-testid="link-footer-careers">Career Directory</Link></li>
              <li><Link href="/pricing" className="hover:text-teal-600 transition-colors" data-testid="link-footer-pricing">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">NurseNest Main Site</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href={mainSiteHome} className="hover:text-teal-600 transition-colors flex items-center gap-1" data-testid="link-footer-main-home">
                  Homepage <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href={mainSitePricing} className="hover:text-teal-600 transition-colors flex items-center gap-1" data-testid="link-footer-main-pricing">
                  Pricing <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href={mainSiteHome} className="hover:text-teal-600 transition-colors flex items-center gap-1" data-testid="link-footer-exam-prep">
                  Exam Prep (Nursing) <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href={mainSiteNewGrad} className="hover:text-teal-600 transition-colors flex items-center gap-1" data-testid="link-footer-new-grad-support">
                  New Grad Support <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href={mainSiteFaq} className="hover:text-teal-600 transition-colors flex items-center gap-1" data-testid="link-footer-main-faq">
                  FAQ <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">NurseNest Ecosystem</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href={mainSiteCareerTools} className="hover:text-teal-600 transition-colors flex items-center gap-1" data-testid="link-footer-healthcare-jobs">
                  Healthcare Jobs (ApplyNest) <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="https://www.nursenest.ca/en/terms" className="hover:text-teal-600 transition-colors" data-testid="link-footer-terms">Terms</a></li>
              <li><a href="https://www.nursenest.ca/en/privacy" className="hover:text-teal-600 transition-colors" data-testid="link-footer-privacy">Privacy</a></li>
              <li><a href="https://www.nursenest.ca/en/disclaimer" className="hover:text-teal-600 transition-colors" data-testid="link-footer-disclaimer">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">NurseNest Allied</span>
            <span className="text-xs text-gray-400">Healthcare Exam Academy</span>
          </div>
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NurseNest Allied. All rights reserved.
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Educational tool only. Not affiliated with official licensing bodies. Always follow your facility policies, educator guidance, and provider orders.
        </div>
      </div>
    </footer>
  );
}
