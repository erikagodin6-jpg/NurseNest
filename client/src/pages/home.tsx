import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { 
  ArrowRight, 
  Star, 
  Users, 
  CheckCircle, 
  Shield, 
  Clock, 
  Trophy,
  PlayCircle
} from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans transition-colors duration-500">
      <SEO
        title="NurseNest - Master Nursing Pathophysiology | RPN, RN & NP Study Platform"
        description="The most complete nursing education platform for RPN/LVN, RN/NCLEX, and NP students. Interactive pathophysiology lessons, pharmacology flashcards, and clinical skills training across 100+ nursing topics."
        keywords="nursing education, NCLEX prep, RPN study, RN exam, NP training, pathophysiology, pharmacology, nursing flashcards, clinical skills, REX-PN, nursing student, medical-surgical nursing"
        canonicalPath="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "NurseNest",
          "url": "https://nursenest.replit.app",
          "description": "Premier nursing education platform with interactive pathophysiology lessons and adaptive flashcards for RPN, RN, and NP students.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://nursenest.replit.app/lessons?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl animate-pulse duration-[10s]" />
            <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-secondary/30 blur-3xl animate-pulse duration-[15s]" />
            <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-accent-foreground/10 blur-3xl animate-pulse duration-[20s]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/20 shadow-sm mb-4">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-sm font-medium text-gray-600">New NCLEX Prep Materials Available</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                Master Nursing with <br />
                <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">Confidence</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                The most complete learning platform for future nurses. Interactive lessons, realistic simulations, and personalized study plans for RPN, RN, and NP students.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:brightness-110 shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 text-white" onClick={() => setLocation("/start-free")}>
                  Start Learning Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2 border-primary/20 hover:bg-primary/5 hover:border-primary/40 text-gray-700 bg-white/50" onClick={() => setLocation("/start-free")}>
                  <PlayCircle className="mr-2 w-5 h-5 text-primary" />
                  See What's Inside
                </Button>
              </div>

              <div className="pt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full border border-primary/10 backdrop-blur-sm">
                  <Shield className="w-5 h-5 text-primary/70" />
                  <span>NCLEX Approved</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full border border-primary/10 backdrop-blur-sm">
                  <Users className="w-5 h-5 text-primary/70" />
                  <span>50k+ Students</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full border border-primary/10 backdrop-blur-sm">
                  <Star className="w-5 h-5 text-primary/70 fill-primary/70" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-white/50 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Interactive Lessons",
                  desc: "Learn complex concepts through bite-sized, engaging lessons designed for retention.",
                  color: "bg-primary/5",
                  iconColor: "text-primary",
                  delay: "0"
                },
                {
                  title: "Realistic Simulations",
                  desc: "Practice clinical decision making in a safe environment with our advanced patient simulators.",
                  color: "bg-secondary/20",
                  iconColor: "text-secondary-foreground",
                  delay: "100"
                },
                {
                  title: "Smart Flashcards",
                  desc: "Master terminology and pharmacology with spaced repetition algorithms that adapt to you.",
                  color: "bg-accent/30",
                  iconColor: "text-accent-foreground",
                  delay: "200"
                }
              ].map((feature, i) => (
                <Card key={i} className="border-none shadow-lg shadow-gray-100/50 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden group bg-white">
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <CheckCircle className={`w-7 h-7 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-primary/5 border-y border-primary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Active Students", value: "50,000+", icon: Users },
                { label: "Practice Questions", value: "10,000+", icon: Trophy },
                { label: "Success Rate", value: "98%", icon: Star },
                { label: "Study Hours", value: "1M+", icon: Clock },
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-primary mb-4">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to start your journey?</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join thousands of nursing students who are mastering their exams and clinical skills with NurseNest.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:brightness-110 shadow-lg shadow-primary/20 text-white transition-all hover:-translate-y-1" onClick={() => setLocation("/start-free")}>
                Get Started for Free
              </Button>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-accent-foreground/10 rounded-full blur-3xl -z-10 opacity-60" />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-primary/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent-foreground rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="font-semibold text-gray-900">NurseNest</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <a href="/terms" className="hover:text-primary transition-colors">Terms of Use</a>
              <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
              <a href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</a>
              <a href="/faq" className="hover:text-primary transition-colors">FAQ</a>
            </div>
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} NurseNest. All Rights Reserved.
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-gray-400 max-w-3xl mx-auto leading-relaxed">
            NurseNest provides independently developed educational content grounded in established physiological principles and widely accepted clinical reasoning frameworks. NurseNest is not affiliated with or endorsed by any licensing or regulatory authority. All material is intended solely for educational use.
          </div>
        </div>
      </footer>
    </div>
  );
}