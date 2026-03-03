import { LocaleLink } from "@/lib/LocaleLink";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AdminEditButton } from "@/components/admin-edit-button";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { SEO } from "@/components/seo";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-warmwhite flex flex-col" data-testid="privacy-page">
      <SEO title="Privacy Policy - NurseNest" description="NurseNest privacy policy. Learn how we collect, use, and protect your personal information." canonicalPath="/privacy" />
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BreadcrumbNav />
        <div className="text-center mb-12">
          <h1
            className="text-4xl font-bold text-gray-900 mb-4"
            data-testid="text-privacy-title"
          >
            Privacy Policy
          </h1>
          <p
            className="text-lg text-softgray max-w-2xl mx-auto"
            data-testid="text-privacy-subtitle"
          >
            How NurseNest collects, uses, and protects your personal information.
          </p>
          <p className="text-sm text-gray-400 mt-2" data-testid="text-privacy-effective-date">
            Effective Date: February 20, 2026
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-primary/10 p-6 sm:p-10 space-y-10">

          <section data-testid="section-data-collected">
            <h2 className="text-2xl font-semibold text-primary mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We collect the following types of information when you use NurseNest:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-2">
              <li><strong>Account Information:</strong> Your email address, username, and password when you create an account.</li>
              <li><strong>Payment Information:</strong> Payment details are collected and processed securely by our third-party payment processor, Stripe. NurseNest does not store your full credit card number or payment credentials on our servers.</li>
              <li><strong>Usage Analytics:</strong> Information about how you interact with the Platform, including pages visited, lessons completed, quiz performance, session duration, and feature usage. This data helps us improve the learning experience.</li>
              <li><strong>Device & Browser Information:</strong> Basic technical information such as your browser type, operating system, and device type to ensure compatibility and optimize performance.</li>
            </ul>
          </section>

          <section data-testid="section-data-usage">
            <h2 className="text-2xl font-semibold text-primary mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-2">
              <li><strong>Account Management:</strong> To create and manage your account, authenticate your identity, and provide customer support.</li>
              <li><strong>Payment Processing:</strong> To process subscription payments, manage billing, and handle refund requests through Stripe.</li>
              <li><strong>Service Improvement:</strong> To analyze usage patterns, identify areas for improvement, and develop new features and content.</li>
              <li><strong>Communication:</strong> To send you important account notifications, billing updates, and (with your consent) educational content and platform updates.</li>
              <li><strong>Security:</strong> To detect and prevent fraud, unauthorized access, and other security threats.</li>
            </ul>
          </section>

          <section data-testid="section-third-party">
            <h2 className="text-2xl font-semibold text-primary mb-4">3. Third-Party Service Providers</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We work with trusted third-party service providers to operate the Platform:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-2">
              <li><strong>Stripe:</strong> Handles all payment processing. Stripe's use of your personal data is governed by their own{" "}
                <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">Privacy Policy</a>.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              We do not sell, rent, or trade your personal information to third parties for marketing purposes.
            </p>
          </section>

          <section data-testid="section-cookies">
            <h2 className="text-2xl font-semibold text-primary mb-4">4. Cookies & Tracking</h2>
            <p className="text-gray-700 leading-relaxed">
              NurseNest uses minimal, functional cookies that are essential for the operation of the Platform. These cookies are used to maintain your session, remember your preferences (such as region and theme settings), and ensure the Platform functions correctly. We do not use third-party advertising or tracking cookies. We do not engage in cross-site tracking.
            </p>
          </section>

          <section data-testid="section-data-retention">
            <h2 className="text-2xl font-semibold text-primary mb-4">5. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information for as long as your account is active or as needed to provide you with our services. If you delete your account, we will remove your personal data from our active systems within a reasonable timeframe, except where retention is required by law (for example, for tax or legal compliance purposes). Anonymized usage data may be retained indefinitely for analytics and service improvement.
            </p>
          </section>

          <section data-testid="section-user-rights">
            <h2 className="text-2xl font-semibold text-primary mb-4">6. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-2">
              <li><strong>Access:</strong> You may request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> You may update or correct your account information at any time through your profile settings.</li>
              <li><strong>Deletion:</strong> You may request the deletion of your account and associated personal data by contacting our support team at{" "}
                <a href="mailto:support@nursenest.com" className="text-primary underline hover:text-primary/80">support@nursenest.com</a>.
              </li>
              <li><strong>Data Portability:</strong> Where technically feasible, you may request your data in a portable format.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              To exercise any of these rights, please contact us at{" "}
              <a href="mailto:support@nursenest.com" className="text-primary underline hover:text-primary/80">support@nursenest.com</a>.
            </p>
          </section>

          <section data-testid="section-children-privacy">
            <h2 className="text-2xl font-semibold text-primary mb-4">7. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              NurseNest is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have inadvertently collected personal data from a minor without appropriate parental consent, we will take steps to delete that information promptly. If you believe a child under 18 has provided us with personal information, please contact us at{" "}
              <a href="mailto:support@nursenest.com" className="text-primary underline hover:text-primary/80">support@nursenest.com</a>.
            </p>
          </section>

          <section data-testid="section-policy-changes">
            <h2 className="text-2xl font-semibold text-primary mb-4">8. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. When we make significant changes, we will update the effective date at the top of this page and, where appropriate, notify you via email or through the Platform. Your continued use of NurseNest after any changes constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section data-testid="section-privacy-contact">
            <h2 className="text-2xl font-semibold text-primary mb-4">9. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at{" "}
              <a
                href="mailto:support@nursenest.com"
                className="text-primary underline hover:text-primary/80"
                data-testid="link-privacy-contact-email"
              >
                support@nursenest.com
              </a>.
            </p>
          </section>

          <section data-testid="section-related-links" className="border-t border-primary/10 pt-6">
            <p className="text-gray-700 leading-relaxed">
              See also our{" "}
              <LocaleLink href="/terms" className="text-primary underline hover:text-primary/80" data-testid="link-terms-of-use">
                Terms of Use
              </LocaleLink>{" "}
              and{" "}
              <LocaleLink href="/disclaimer" className="text-primary underline hover:text-primary/80" data-testid="link-disclaimer">
                Disclaimer
              </LocaleLink>.
            </p>
          </section>

        </div>
      </div>
      <AdminEditButton pageName="privacy" />
      <Footer />
    </div>
  );
}