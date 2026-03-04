import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Building2,
  Users,
  BookOpen,
  BarChart3,
  Shield,
  CheckCircle2,
  GraduationCap,
  Target,
  Loader2,
  ChevronRight,
  Stethoscope,
  Brain,
  Award,
  Zap,
} from "lucide-react";

export default function ForInstitutions() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    institutionName: "",
    programType: "RPN",
    estimatedStudentCount: "",
    country: "CA",
    contactName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.institutionName || !form.contactName || !form.email) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/institutions/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          estimatedStudentCount: parseInt(form.estimatedStudentCount) || 0,
          region: form.country,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
      toast({ title: "Thank you! We will be in touch within 24 hours." });
    } catch (e: any) {
      toast({ title: "Error", description: "Please try again or email us directly.", variant: "destructive" });
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="For Nursing Schools and Programs | NurseNest"
        description="Institutional licensing for nursing education programs. Give your students access to comprehensive exam preparation, clinical lessons, practice questions, and study tools."
      />
      <Navigation />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#BFA6F6]/10 via-white to-[#AEE3E1]/10 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              For Nursing Schools and Programs
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#2E3A59] leading-tight mb-6" data-testid="text-institutions-hero">
              Equip Your Students With Clinical Confidence
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              NurseNest provides institutional licensing for nursing education programs across Canada, the US, and internationally. Give your students access to comprehensive exam preparation with real clinical content, practice questions, pharmacology lessons, and study tools built by practicing nurses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="gap-2 rounded-full px-8 text-lg"
                onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="button-request-demo"
              >
                Request a Demo <ChevronRight className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 rounded-full px-8 text-lg"
                onClick={() => document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="button-view-pricing"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#2E3A59] mb-4">Why Programs Choose NurseNest</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">Built specifically for Canadian and international nursing education, not adapted from generic test prep.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "500+ Clinical Lessons", desc: "Comprehensive pathophysiology lessons covering every body system, with condition-specific medications, nursing actions, and clinical quiz questions." },
              { icon: Target, title: "3,000+ Practice Questions", desc: "RPN, RN, and NP-tier questions with detailed rationales, mapped to exam competencies and updated regularly." },
              { icon: Brain, title: "Clinical Reasoning Depth", desc: "Content written at licensure-exam level with causal reasoning, not introductory textbook summaries. Every concept explains why, not just what." },
              { icon: BarChart3, title: "Progress Analytics", desc: "Track individual student performance by system, identify weak areas early, and monitor cohort readiness across the program." },
              { icon: Stethoscope, title: "Scope-Appropriate Content", desc: "Separate RPN, RN, and NP tracks with role-appropriate depth. RPN content focuses on assessment, monitoring, and safe medication administration." },
              { icon: Shield, title: "Flexible Licensing", desc: "Cohort-based, rolling, or perpetual seat licenses. Domain-locked enrollment, invite codes, or roster upload. Plans that fit your program." },
            ].map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="border-none shadow-lg hover:shadow-xl transition-all">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2E3A59] mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#2E3A59] mb-4">What Students Get</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">Everything they need to prepare for licensure exams and build clinical confidence.</p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Pathophysiology lessons with cellular mechanisms and clinical reasoning",
              "Condition-specific medications with side effects, contraindications, and nursing pearls",
              "Practice questions at exam-level difficulty with detailed rationales",
              "Interactive study plans based on weak areas and exam readiness",
              "Pharmacology hub with drug classification and clinical pearls",
              "Assessment skills training with systematic approaches",
              "Clinical scenario practice with decision-making exercises",
              "Mobile-friendly platform accessible anywhere, anytime",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#2E3A59] mb-4">Institutional Pricing</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">Volume pricing that scales with your program. All plans include full platform access.</p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-gray-200 hover:border-primary/30 transition-all">
              <CardContent className="pt-6 text-center">
                <GraduationCap className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-bold text-[#2E3A59] mb-1">Small Program</h3>
                <p className="text-gray-500 text-sm mb-4">Up to 50 students</p>
                <p className="text-3xl font-bold text-primary mb-1">Contact Us</p>
                <p className="text-sm text-gray-500 mb-6">Per student, per semester</p>
                <ul className="text-left space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Full platform access</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Student progress dashboard</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Invite code enrollment</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Email support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary shadow-lg relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
              </div>
              <CardContent className="pt-6 text-center">
                <Award className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-bold text-[#2E3A59] mb-1">Standard Program</h3>
                <p className="text-gray-500 text-sm mb-4">50-200 students</p>
                <p className="text-3xl font-bold text-primary mb-1">Contact Us</p>
                <p className="text-sm text-gray-500 mb-6">Per student, per semester</p>
                <ul className="text-left space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Everything in Small Program</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Cohort analytics dashboard</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Domain-locked enrollment</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Priority support</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Quarterly readiness reports</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-primary/30 transition-all">
              <CardContent className="pt-6 text-center">
                <Zap className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-bold text-[#2E3A59] mb-1">Enterprise</h3>
                <p className="text-gray-500 text-sm mb-4">200+ students</p>
                <p className="text-3xl font-bold text-primary mb-1">Custom</p>
                <p className="text-sm text-gray-500 mb-6">Tailored to your needs</p>
                <ul className="text-left space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Everything in Standard</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Custom content integration</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> LMS integration support</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Dedicated account manager</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> White-label options</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact-form" className="py-16 bg-gradient-to-br from-[#BFA6F6]/5 to-[#AEE3E1]/5">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#2E3A59] mb-4">Get Started</h2>
          <p className="text-gray-600 text-center mb-8">Tell us about your program and we will get back to you within 24 hours with a tailored proposal.</p>

          {submitted ? (
            <Card className="border-none shadow-lg">
              <CardContent className="py-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#2E3A59] mb-2">Thank You!</h3>
                <p className="text-gray-600">We have received your inquiry and will reach out within 24 hours.</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Institution Name *</label>
                    <Input value={form.institutionName} onChange={e => setForm(p => ({ ...p, institutionName: e.target.value }))} placeholder="e.g. Humber College" required data-testid="input-lead-institution" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Program Type</label>
                      <select value={form.programType} onChange={e => setForm(p => ({ ...p, programType: e.target.value }))} className="w-full h-10 rounded-md border px-3 text-sm" data-testid="select-lead-program">
                        <option value="RPN">RPN / LPN</option>
                        <option value="RN">RN (BScN)</option>
                        <option value="NP">Nurse Practitioner</option>
                        <option value="PSW">PSW / CNA</option>
                        <option value="MULTI">Multiple Programs</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Estimated Students</label>
                      <Input type="number" value={form.estimatedStudentCount} onChange={e => setForm(p => ({ ...p, estimatedStudentCount: e.target.value }))} placeholder="50" data-testid="input-lead-students" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Country</label>
                    <select value={form.country} onChange={e => setForm(p => ({ ...p, country: e.target.value }))} className="w-full h-10 rounded-md border px-3 text-sm" data-testid="select-lead-country">
                      <option value="CA">Canada</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Contact Name *</label>
                    <Input value={form.contactName} onChange={e => setForm(p => ({ ...p, contactName: e.target.value }))} placeholder="Your full name" required data-testid="input-lead-name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Email *</label>
                      <Input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@institution.edu" required data-testid="input-lead-email" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Phone</label>
                      <Input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="(416) 555-0100" data-testid="input-lead-phone" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Message (optional)</label>
                    <Textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Tell us about your program needs..." rows={3} data-testid="input-lead-message" />
                  </div>
                  <Button type="submit" size="lg" className="w-full gap-2" disabled={submitting} data-testid="button-submit-lead">
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    Request Information
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
