import { LocaleLink } from "@/lib/LocaleLink";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Copy, Check, ArrowLeft, Layers, Share2, Globe, Lock } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function DeckPage() {
  const params = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [deck, setDeck] = useState<any>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/decks/by-slug/${params.slug}`);
        if (!res.ok) { setLoading(false); return; }
        const d = await res.json();
        setDeck(d);
        const cardsRes = await fetch(`/api/decks/${d.id}/cards`);
        if (cardsRes.ok) setCards(await cardsRes.json());
      } catch {}
      setLoading(false);
    }
    if (params.slug) load();
  }, [params.slug]);

  const shareUrl = `${window.location.origin}/flashcards/deck/${params.slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({ title: "Link copied!", description: "Share this link with your study group." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      toast({ title: "Link copied!" });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: deck?.title ? `${deck.title} - NurseNest Study Deck` : "NurseNest Study Deck",
          text: deck?.description || "Check out this nursing study deck on NurseNest!",
          url: shareUrl,
        });
      } catch {}
    } else {
      handleCopy();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!deck) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white">
        <Navigation />
        <SEO title="Deck Not Found - NurseNest" description="This study deck could not be found." />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <Layers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2" data-testid="text-deck-not-found">Deck Not Found</h1>
          <p className="text-gray-500 mb-6">This study deck may have been removed or set to private.</p>
          <Button onClick={() => setLocation("/flashcards")} className="rounded-xl gap-2" data-testid="button-back-flashcards">
            <ArrowLeft className="w-4 h-4" /> Back to Flashcards
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": deck.title,
    "description": deck.description || `${deck.title} - nursing study flashcard deck`,
    "educationalLevel": "Professional",
    "learningResourceType": "Flashcard Deck",
    "numberOfItems": cards.length,
    "provider": {
      "@type": "Organization",
      "name": "NurseNest",
      "url": "https://www.nursenest.ca"
    },
    "url": shareUrl,
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.nursenest.ca" },
      { "@type": "ListItem", "position": 2, "name": "Flashcards", "item": "https://www.nursenest.ca/flashcards" },
      { "@type": "ListItem", "position": 3, "name": deck.title, "item": shareUrl }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white">
      <Navigation />
      <SEO
        title={`${deck.title} - Free Nursing Flashcards | NurseNest`}
        description={deck.description || `Study ${deck.title} with ${cards.length} free nursing flashcards. Learn and test mode available. Perfect for NCLEX and REX-PN exam preparation.`}
        keywords={`${deck.title}, nursing flashcards, NCLEX study cards, nursing exam prep, free flashcards, ${(deck.tags || []).join(", ")}`}
        canonicalPath={`/flashcards/deck/${params.slug}`}
        structuredData={structuredData}
        additionalStructuredData={[breadcrumbData]}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb" data-testid="nav-breadcrumb">
          <LocaleLink href="/" className="hover:text-primary transition-colors">Home</LocaleLink>
          <span>/</span>
          <LocaleLink href="/flashcards" className="hover:text-primary transition-colors">Flashcards</LocaleLink>
          <span>/</span>
          <span className="text-gray-900 font-medium">{deck.title}</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-deck-title">{deck.title}</h1>
            {deck.description && <p className="text-gray-600 text-lg" data-testid="text-deck-description">{deck.description}</p>}
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="text-sm text-gray-500">{cards.length} cards</span>
              {deck.ownerUsername && <span className="text-sm text-gray-400">by {deck.ownerUsername}</span>}
              {deck.visibility === "public" && (
                <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 text-xs">
                  <Globe className="w-3 h-3 mr-1" /> Public
                </Badge>
              )}
              {(deck.tags || []).map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            <Button onClick={handleCopy} variant="outline" className="rounded-xl gap-2" data-testid="button-copy-link">
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Link"}
            </Button>
            <Button onClick={handleShare} variant="outline" className="rounded-xl gap-2" data-testid="button-share-deck">
              <Share2 className="w-4 h-4" /> Share
            </Button>
            <Button onClick={() => setLocation("/flashcards")} className="rounded-xl gap-2" data-testid="button-study-deck">
              <BookOpen className="w-4 h-4" /> Study Now
            </Button>
          </div>
        </div>

        {cards.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Preview Cards</h2>
              <span className="text-sm text-gray-400">{cards.length} total</span>
            </div>
            <div className="space-y-3">
              {cards.map((card: any, i: number) => (
                <Card key={card.id} className="border-gray-100 hover:border-primary/20 transition-colors" data-testid={`card-preview-${i}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-xs text-gray-400 font-mono mt-0.5 shrink-0">{i + 1}.</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{card.front}</p>
                        <p className="text-sm text-gray-600 mt-1.5">{card.back}</p>
                        {card.rationale && (
                          <p className="text-xs text-gray-400 mt-2 italic border-l-2 border-gray-200 pl-3">{card.rationale}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="bg-primary/5 rounded-2xl p-6 sm:p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to study this deck?</h2>
          <p className="text-gray-600 mb-4">Create a free account to use Learn and Test modes with spaced repetition.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {user ? (
              <Button onClick={() => setLocation("/flashcards")} className="rounded-xl gap-2" data-testid="button-go-study">
                <BookOpen className="w-4 h-4" /> Open in Study Mode
              </Button>
            ) : (
              <>
                <Button onClick={() => setLocation("/login")} className="rounded-xl gap-2" data-testid="button-signup-study">
                  Start Free - No Credit Card
                </Button>
                <Button variant="outline" onClick={handleCopy} className="rounded-xl gap-2" data-testid="button-copy-link-cta">
                  <Copy className="w-4 h-4" /> Share with Friends
                </Button>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
