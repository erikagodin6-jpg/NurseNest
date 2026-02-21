import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Link } from "wouter";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-warmwhite flex flex-col" data-testid="terms-page">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1
            className="text-4xl font-bold text-gray-900 mb-4"
            data-testid="text-terms-title"
          >
            Terms of Use
          </h1>
          <p
            className="text-lg text-softgray max-w-2xl mx-auto"
            data-testid="text-terms-subtitle"
          >
            Please read these terms carefully before using NurseNest.
          </p>
          <p className="text-sm text-gray-400 mt-2" data-testid="text-terms-effective-date">
            Effective Date: February 20, 2026
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-primary/10 p-6 sm:p-10 space-y-10">

          <section data-testid="section-acceptance">
            <h2 className="text-2xl font-semibold text-primary mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using NurseNest (the "Platform"), including any content, features, or services offered through the Platform, you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, you must not access or use the Platform. Your continued use of NurseNest constitutes your acceptance of these Terms and any future modifications.
            </p>
          </section>

          <section data-testid="section-educational-purpose">
            <h2 className="text-2xl font-semibold text-primary mb-4">2. Educational Purpose Only</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              NurseNest is an educational resource designed to support nursing students and professionals in their learning journey. The content provided on this Platform is intended solely for educational and informational purposes.
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-2">
              <li>NurseNest does not provide medical advice, clinical recommendations, or professional healthcare guidance.</li>
              <li>The Platform is not a substitute for clinical judgment, professional training, or the advice of qualified healthcare providers.</li>
              <li>No provider-patient relationship is created through the use of this Platform.</li>
              <li>Users must always follow the policies, procedures, and regulatory standards set by their educational institutions, employers, and applicable regulatory bodies.</li>
              <li>Content on NurseNest does not constitute clinical recommendations and should not be used as the sole basis for any clinical decision-making.</li>
            </ul>
          </section>

          <section data-testid="section-no-affiliation">
            <h2 className="text-2xl font-semibold text-primary mb-4">3. No Exam Body Affiliation</h2>
            <p className="text-gray-700 leading-relaxed">
              NurseNest is an independent educational platform. We are not affiliated with, endorsed by, or representative of the National Council Licensure Examination (NCLEX), the National Council of State Boards of Nursing (NCSBN), the College of Nurses of Ontario (CNO), or any other nursing regulatory body or examination authority. All questions, content, and educational materials on NurseNest are original works created by our team. Any references to exam formats or nursing standards are for educational context only and do not imply any official connection or endorsement.
            </p>
          </section>

          <section data-testid="section-account-terms">
            <h2 className="text-2xl font-semibold text-primary mb-4">4. Account Terms</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-2">
              <li>Each individual may maintain only one personal account on NurseNest.</li>
              <li>Account credentials are personal and may not be shared with others. You are responsible for maintaining the confidentiality of your login information.</li>
              <li>You are fully responsible for all activity that occurs under your account.</li>
              <li>You must be at least 18 years of age to create an account. Users under 18 may use the Platform only with verifiable parental or guardian consent.</li>
              <li>You agree to provide accurate, current, and complete information during registration and to keep your account information up to date.</li>
            </ul>
          </section>

          <section data-testid="section-subscription-billing">
            <h2 className="text-2xl font-semibold text-primary mb-4">5. Subscription & Billing</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              NurseNest offers subscription-based access to premium content and features. By subscribing, you agree to the following:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-2">
              <li>Subscriptions are billed on a recurring basis (monthly or as otherwise specified at the time of purchase).</li>
              <li>Your subscription will automatically renew at the end of each billing period unless you cancel before the renewal date.</li>
              <li>You will be notified before each renewal, and the applicable billing interval and amount will be clearly stated at the time of purchase.</li>
              <li>Cancellation of your subscription will stop future charges. You will retain access to premium content until the end of your current billing period.</li>
              <li>All payments are processed securely through our third-party payment processor, Stripe.</li>
            </ul>
          </section>

          <section data-testid="section-refund-policy">
            <h2 className="text-2xl font-semibold text-primary mb-4">6. Refund & Cancellation Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Due to the digital nature of the Platform and immediate access granted upon subscription:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-2">
              <li>Subscription fees are generally non-refundable once access to premium content has been granted.</li>
              <li>First-time subscribers are eligible for a 30-day money-back guarantee. If you are unsatisfied within the first 30 days of your initial subscription, you may request a full refund by contacting our support team.</li>
              <li>No partial-period refunds will be issued for cancellations made during an active billing cycle.</li>
              <li>Purchases of trial passes or limited-access passes are non-refundable.</li>
              <li>Exceptions to this policy may apply where required by applicable Canadian or United States consumer protection laws.</li>
            </ul>
          </section>

          <section data-testid="section-intellectual-property">
            <h2 className="text-2xl font-semibold text-primary mb-4">7. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              All content available on NurseNest: including but not limited to lessons, practice questions, answer rationales, graphics, illustrations, interface design, educational frameworks, software code, and branding: is the intellectual property of NurseNest and is protected by applicable copyright, trademark, and intellectual property laws.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Your subscription grants you a limited, non-transferable, non-exclusive, revocable license to access and use the Platform's content for your personal educational purposes only. This license does not transfer any ownership rights to you.
            </p>
          </section>

          <section data-testid="section-prohibited-conduct">
            <h2 className="text-2xl font-semibold text-primary mb-4">8. Prohibited Conduct</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You agree not to engage in any of the following activities:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-2">
              <li>Copying, downloading, or screenshotting content for the purpose of redistribution or sharing.</li>
              <li>Scraping, crawling, or using automated tools to extract content from the Platform.</li>
              <li>Sharing your account credentials with any other person or allowing others to access the Platform through your account.</li>
              <li>Using any NurseNest content for commercial purposes, including resale, republication, or incorporation into other products or services.</li>
              <li>Republishing or distributing practice questions, answer rationales, or any other educational materials from the Platform.</li>
              <li>Attempting to reverse-engineer, decompile, or otherwise interfere with the Platform's software or infrastructure.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3 font-medium">
              Violation of any of the above may result in immediate termination of your account without refund.
            </p>
          </section>

          <section data-testid="section-content-usage">
            <h2 className="text-2xl font-semibold text-primary mb-4">9. Content Usage Restrictions</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Your access to NurseNest content is subject to the following restrictions:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-2">
              <li>You are granted a limited personal license for educational use only.</li>
              <li>You may not redistribute, publish, or share any content from the Platform in any format or medium.</li>
              <li>You may not use NurseNest content for any commercial purpose.</li>
              <li>You may not create derivative works based on NurseNest content without prior written consent.</li>
            </ul>
          </section>

          <section data-testid="section-liability">
            <h2 className="text-2xl font-semibold text-primary mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              The Platform and all content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied.
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-2">
              <li>NurseNest does not guarantee exam success, clinical outcomes, or any specific results from the use of the Platform.</li>
              <li>NurseNest is not liable for any decisions made or actions taken based on content provided through the Platform.</li>
              <li>To the maximum extent permitted by law, NurseNest's total liability to you for any claims arising from your use of the Platform shall not exceed the total subscription fees you have paid to NurseNest in the twelve (12) months preceding the claim.</li>
            </ul>
          </section>

          <section data-testid="section-clinical-responsibility">
            <h2 className="text-2xl font-semibold text-primary mb-4">11. Clinical Responsibility</h2>
            <p className="text-gray-700 leading-relaxed">
              You acknowledge and agree that you are solely responsible for your own clinical decisions and professional conduct. NurseNest is an educational tool and does not replace clinical training, supervision, or professional judgment. You must always follow the standards, protocols, and guidelines established by your employer, educational institution, and applicable regulatory bodies. NurseNest assumes no responsibility for clinical actions taken by users.
            </p>
          </section>

          <section data-testid="section-termination">
            <h2 className="text-2xl font-semibold text-primary mb-4">12. Account Termination</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-2">
              <li>NurseNest reserves the right to suspend or terminate your account at any time if you violate these Terms or engage in conduct that we determine, in our sole discretion, to be harmful to the Platform, its users, or third parties.</li>
              <li>You may delete your account at any time by contacting our support team or through your account settings. Upon deletion, your access to premium content will cease immediately.</li>
            </ul>
          </section>

          <section data-testid="section-privacy">
            <h2 className="text-2xl font-semibold text-primary mb-4">13. Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Your privacy is important to us. Please review our{" "}
              <Link href="/privacy" className="text-primary underline hover:text-primary/80" data-testid="link-privacy-policy">
                Privacy Policy
              </Link>{" "}
              to understand how we collect, use, and protect your personal information. By using NurseNest, you consent to the collection and use of your information as described in our Privacy Policy.
            </p>
          </section>

          <section data-testid="section-governing-law">
            <h2 className="text-2xl font-semibold text-primary mb-4">14. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the Province of Ontario, Canada, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Ontario, Canada.
            </p>
          </section>

          <section data-testid="section-changes">
            <h2 className="text-2xl font-semibold text-primary mb-4">15. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              NurseNest reserves the right to update or modify these Terms at any time. When we make changes, we will update the effective date at the top of this page. Your continued use of the Platform following the posting of revised Terms constitutes your acceptance of those changes. We encourage you to review these Terms periodically.
            </p>
          </section>

          <section data-testid="section-contact">
            <h2 className="text-2xl font-semibold text-primary mb-4">16. Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions or concerns about these Terms of Use, please contact us at{" "}
              <a
                href="mailto:support@nursenest.com"
                className="text-primary underline hover:text-primary/80"
                data-testid="link-contact-email"
              >
                support@nursenest.com
              </a>.
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </div>
  );
}