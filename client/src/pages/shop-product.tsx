import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { LocaleLink } from "@/lib/LocaleLink";
import { AdminEditButton } from "@/components/admin-edit-button";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  ShoppingBag, Star, Download, Shield, BookOpen, ArrowLeft,
  ArrowRight, CheckCircle, FileText, Clock, Crown, Package,
} from "lucide-react";
import type { DigitalProduct } from "@shared/schema";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function ShopProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useI18n();
  const { user } = useAuth();
  const { toast } = useToast();
  const [product, setProduct] = useState<DigitalProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<DigitalProduct[]>([]);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/shop/products/${slug}`)
      .then(r => { if (!r.ok) throw new Error("Not found"); return r.json(); })
      .then(data => { setProduct(data); setLoading(false); })
      .catch(() => setLoading(false));

    fetch("/api/shop/products")
      .then(r => r.json())
      .then(data => {
        const others = (data as DigitalProduct[]).filter(p => p.slug !== slug).slice(0, 3);
        setRelatedProducts(others);
      })
      .catch(() => {});
  }, [slug]);

  const handleCheckout = async () => {
    if (!product) return;
    setCheckingOut(true);
    try {
      const res = await fetch("/api/shop/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          userId: user?.id,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        toast({ title: "Checkout Error", description: err.error, variant: "destructive" });
        return;
      }
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
        <Navigation />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-20 w-full">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-64 bg-gray-200 rounded-xl" />
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
        <SEO title="Product Not Found - NurseNest Store" description="The requested product could not be found." />
        <Navigation />
        <main className="flex-1 max-w-2xl mx-auto px-4 py-20 w-full text-center space-y-6">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto" />
          <h1 className="text-2xl font-bold" data-testid="text-product-not-found">Product Not Found</h1>
          <p className="text-gray-500">This product doesn't exist or has been removed.</p>
          <LocaleLink href="/shop">
            <Button data-testid="button-back-to-shop"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Store</Button>
          </LocaleLink>
        </main>
        <Footer />
      </div>
    );
  }

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const savings = hasDiscount ? product.compareAtPrice! - product.price : 0;

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
      <AdminEditButton />
      <SEO
        title={`${product.title} - NurseNest Store`}
        description={product.shortDescription || product.description.slice(0, 160)}
        canonicalPath={`/shop/${product.slug}`}
        keywords={`nursing study guide, ${product.category}, ${product.examTarget || "nursing exam prep"}`}
      />
      <Navigation />

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <LocaleLink href="/shop" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary mb-6 transition-colors" data-testid="link-back-shop">
            <ArrowLeft className="w-4 h-4" /> Back to Store
          </LocaleLink>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {product.coverImageUrl && (
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm" data-testid="div-product-image">
                <img
                  src={product.coverImageUrl}
                  alt={product.title}
                  className="w-full object-cover"
                  data-testid="img-product-detail"
                />
              </div>
            )}

            <div className={product.coverImageUrl ? "" : "lg:col-span-2 max-w-2xl"}>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Badge variant="secondary" data-testid="badge-product-category">{product.category}</Badge>
                {product.featured && (
                  <Badge className="bg-amber-100 text-amber-700" data-testid="badge-product-featured">
                    <Star className="w-3 h-3 mr-1" /> Popular
                  </Badge>
                )}
                {product.tierTarget && product.tierTarget !== "all" && (
                  <Badge variant="outline" data-testid="badge-product-tier">{product.tierTarget.toUpperCase()}</Badge>
                )}
                {product.examTarget && (
                  <Badge variant="outline" className="text-primary border-primary/30" data-testid="badge-product-exam">{product.examTarget}</Badge>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold mb-3" data-testid="text-product-detail-title">{product.title}</h1>

              {product.shortDescription && (
                <p className="text-gray-600 mb-4 text-lg" data-testid="text-product-short-desc">{product.shortDescription}</p>
              )}

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-primary" data-testid="text-product-detail-price">
                  {formatPrice(product.price)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-lg text-gray-400 line-through" data-testid="text-product-compare-price">
                      {formatPrice(product.compareAtPrice!)}
                    </span>
                    <Badge className="bg-green-100 text-green-700" data-testid="badge-savings">
                      Save {formatPrice(savings)}
                    </Badge>
                  </>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Download className="w-4 h-4 text-primary" /> Instant PDF download after purchase
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-primary" /> Clinically verified content
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BookOpen className="w-4 h-4 text-primary" /> Exam-aligned study material
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4 text-primary" /> Up to 5 downloads per purchase
                </div>
              </div>

              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-10 py-3 text-base gap-2"
                onClick={handleCheckout}
                disabled={checkingOut}
                data-testid="button-buy-now"
              >
                <ShoppingBag className="w-5 h-5" />
                {checkingOut ? "Processing..." : `Buy Now — ${formatPrice(product.price)}`}
              </Button>

              <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Secure checkout powered by Stripe
              </p>
            </div>
          </div>

          {product.description && (
            <section className="mt-12" data-testid="section-product-description">
              <h2 className="text-xl font-bold mb-4">What's Included</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="prose prose-gray max-w-none text-gray-700 whitespace-pre-line" data-testid="text-product-full-desc">
                    {product.description}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          <section className="mt-12 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-8" data-testid="section-trust-block">
            <h2 className="text-xl font-bold mb-4 text-center">Why Students Trust NurseNest</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Clinically Verified</h3>
                <p className="text-sm text-gray-600">Content created and reviewed by nursing professionals</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Exam-Aligned</h3>
                <p className="text-sm text-gray-600">Mapped to REx-PN, NCLEX-RN, and NP exam blueprints</p>
              </div>
              <div className="text-center">
                <Crown className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Instant Access</h3>
                <p className="text-sm text-gray-600">Download immediately after purchase and start studying</p>
              </div>
            </div>
          </section>

          {relatedProducts.length > 0 && (
            <section className="mt-12" data-testid="section-related-products">
              <h2 className="text-xl font-bold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedProducts.map(p => (
                  <LocaleLink key={p.id} href={`/shop/${p.slug}`}>
                    <Card className="group hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer h-full" data-testid={`card-related-${p.slug}`}>
                      {p.coverImageUrl && (
                        <div className="aspect-[16/10] overflow-hidden rounded-t-lg bg-gray-100">
                          <img src={p.coverImageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                        </div>
                      )}
                      <CardContent className="p-4">
                        <Badge variant="secondary" className="text-xs mb-2">{p.category}</Badge>
                        <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{p.title}</h3>
                        <span className="text-primary font-bold mt-2 block">{formatPrice(p.price)}</span>
                      </CardContent>
                    </Card>
                  </LocaleLink>
                ))}
              </div>
            </section>
          )}
        </div>

        <section className="py-12 px-4 bg-gradient-to-r from-primary/5 to-primary/10 mt-12" data-testid="section-product-cta">
          <div className="max-w-2xl mx-auto text-center">
            <Package className="w-8 h-8 text-primary mx-auto mb-3" />
            <h2 className="text-2xl font-bold mb-3" data-testid="text-product-cta-title">Want Full Access to All Study Tools?</h2>
            <p className="text-gray-600 mb-6">Subscribe to NurseNest for unlimited lessons, flashcards, question banks, and more.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LocaleLink href="/pricing">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8" data-testid="button-product-pricing">
                  See Plans <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </LocaleLink>
              <LocaleLink href="/shop">
                <Button size="lg" variant="outline" className="px-8" data-testid="button-product-more">
                  Browse More Products
                </Button>
              </LocaleLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
