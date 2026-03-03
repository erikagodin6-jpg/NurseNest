import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { AdminEditButton } from "@/components/admin-edit-button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, CheckCircle, AlertTriangle, XCircle, RefreshCw, Mail, Heart } from "lucide-react";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-warmwhite font-sans" data-testid="refund-policy-page">
      <SEO
        title="Refund Policy & 30-Day Satisfaction Guarantee"
        description="NurseNest offers a 30-day satisfaction guarantee for first-time subscribers. Learn about our refund eligibility, process, and commitment to fairness for all learners."
        keywords="refund policy, satisfaction guarantee, NurseNest refund, nursing education refund, 30-day guarantee"
        canonicalPath="/refund-policy"
      />
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BreadcrumbNav />
        <div className="text-center mb-12">
          <h1
            className="text-4xl font-bold text-gray-900 mb-4"
            data-testid="text-refund-policy-title"
          >
            Refund Policy & 30-Day Satisfaction Guarantee
          </h1>
          <p
            className="text-lg text-softgray max-w-2xl mx-auto"
            data-testid="text-refund-policy-subtitle"
          >
            Designed to ensure fairness for all learners.
          </p>
          <p className="text-sm text-gray-400 mt-2" data-testid="text-refund-policy-effective-date">
            Effective Date: February 20, 2026
          </p>
        </div>

        <div className="space-y-6">

          <Card className="border-primary/10 shadow-sm" data-testid="section-satisfaction-guarantee">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <h2 className="text-2xl font-semibold text-primary">1. 30-Day Satisfaction Guarantee</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                NurseNest offers a 30-day satisfaction guarantee to give first-time subscribers confidence in their investment. This guarantee applies exclusively to first-time subscriptions purchased directly through our website at nursenest.ca.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                The 30-day guarantee period is calculated from the date of your initial purchase and does not reset upon renewal or upgrade. If you are not satisfied with your experience within the first 30 calendar days, you may request a full refund subject to the eligibility conditions outlined below.
              </p>
              <p className="text-gray-600 text-sm italic">
                This guarantee reflects our confidence in the quality of NurseNest's educational content and our commitment to supporting your learning journey.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/10 shadow-sm" data-testid="section-eligibility-conditions">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <h2 className="text-2xl font-semibold text-primary">2. Eligibility Conditions</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                To be eligible for a refund under our 30-day satisfaction guarantee, all of the following conditions must be met:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-2 mb-4">
                <li>Your refund request is submitted within 30 calendar days of your initial purchase date.</li>
                <li>The subscription is your first-ever purchase on NurseNest: the guarantee does not apply to returning subscribers.</li>
                <li>The subscription was purchased directly through NurseNest (nursenest.ca), not through a third-party reseller, app store, or promotional partner.</li>
                <li>Your account usage falls within reasonable limits as described in Section 3 below.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-medium mb-2">
                The following are explicitly excluded from refund eligibility:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-2">
                <li>Subscription renewals (monthly or otherwise): only the initial purchase qualifies.</li>
                <li>Repeat refund requests from users who have previously received a refund under this guarantee.</li>
                <li>Purchases made through third-party platforms, gift codes, or promotional bundles not originating from NurseNest.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-primary/10 shadow-sm" data-testid="section-usage-safeguards">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <h2 className="text-2xl font-semibold text-primary">3. Usage-Based Safeguards</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                To protect the integrity of our content and ensure fairness for all subscribers, refund eligibility may be denied if your account shows substantial consumption of paid content during the guarantee period.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2 font-medium">
                Examples of substantial usage that may affect refund eligibility include, but are not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-2 mb-4">
                <li>Completion of more than 25% of the available question bank or practice exams.</li>
                <li>Excessive access to premium lessons, study modules, or downloadable materials beyond what is consistent with evaluating the platform.</li>
                <li>Behavior patterns consistent with content harvesting, systematic downloading, or misuse of the platform's educational resources.</li>
              </ul>
              <p className="text-gray-600 text-sm italic">
                These safeguards exist to maintain a fair environment for all learners and are applied thoughtfully on a case-by-case basis.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/10 shadow-sm" data-testid="section-non-refundable">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-3 mb-4">
                <XCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <h2 className="text-2xl font-semibold text-primary">4. Non-Refundable Circumstances</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                The following circumstances are not eligible for a refund under any conditions:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-2">
                <li>Change of mind after substantial usage of the platform's premium content and features.</li>
                <li>Dissatisfaction related to exam outcomes, test performance, or clinical results: NurseNest is an educational resource and does not guarantee specific examination results.</li>
                <li>Purchases made at promotional, discounted, or special offer pricing.</li>
                <li>Subscription renewals, whether automatic or manual: only first-time purchases are covered by the satisfaction guarantee.</li>
                <li>Accounts that have been suspended or terminated due to violations of our Terms of Use, including prohibited conduct such as content redistribution or account sharing.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-primary/10 shadow-sm" data-testid="section-effect-of-refund">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-3 mb-4">
                <RefreshCw className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <h2 className="text-2xl font-semibold text-primary">5. Effect of Refund</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                If your refund request is approved, the following will take effect:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-2 mb-4">
                <li>Immediate termination of your access to all premium content, features, and tools on NurseNest.</li>
                <li>Revocation of your license to use, reference, or retain any materials accessed through the platform during your subscription period.</li>
                <li>Your account may be flagged as having used the satisfaction guarantee, which may restrict eligibility for future guarantee claims on subsequent purchases.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Refunds are typically processed within 5-10 business days and will be returned to the original payment method used at the time of purchase.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/10 shadow-sm" data-testid="section-refund-process">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-3 mb-4">
                <Mail className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <h2 className="text-2xl font-semibold text-primary">6. Refund Request Process</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                To request a refund, please contact our support team via email at{" "}
                <a
                  href="mailto:support@nursenest.ca"
                  className="text-primary underline hover:text-primary/80"
                  data-testid="link-support-email"
                >
                  support@nursenest.ca
                </a>. Please include the following details in your request:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-2 mb-4">
                <li>Your full name and the email address associated with your NurseNest account.</li>
                <li>Your date of purchase and subscription plan.</li>
                <li>A brief explanation of the reason for your refund request.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Our team will review your request and respond within 2-3 business days. We are committed to handling all requests with care and transparency.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/10 shadow-sm" data-testid="section-our-commitment">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-3 mb-4">
                <Heart className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <h2 className="text-2xl font-semibold text-primary">7. Our Commitment</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                At NurseNest, we believe in the quality of our educational content and the value it brings to nursing students and professionals. Our 30-day satisfaction guarantee reflects that belief: we want you to feel confident in choosing NurseNest as your study companion.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                We are committed to treating every learner with fairness, respect, and transparency. If something isn't working for you, we genuinely want to hear about it. Your feedback helps us improve the platform for everyone.
              </p>
              <p className="text-gray-600 text-sm italic">
                This policy is designed to balance the needs of all our learners: protecting the investment of dedicated students while ensuring that new subscribers can explore NurseNest with peace of mind.
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
      <AdminEditButton pageName="refund-policy" />
      <Footer />
    </div>
  );
}
