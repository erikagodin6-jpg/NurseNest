import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import {
  ShoppingBag, Star, Tag, Download, Package, BookOpen, Shield,
  ArrowRight, Plus, Edit, Trash2, X, Sparkles, Crown, Filter, Palette,
} from "lucide-react";
import type { DigitalProduct } from "@shared/schema";
import { adminFetch } from "@/lib/admin-fetch";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function ProductCard({ product }: { product: DigitalProduct }) {
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  return (
    <LocaleLink href={`/shop/${product.slug}`}>
      <Card className="group hover:shadow-lg hover:border-primary/30 transition-all h-full cursor-pointer" data-testid={`card-product-${product.slug}`}>
        {product.coverImageUrl && (
          <div className="aspect-[16/10] overflow-hidden rounded-t-lg bg-gray-100">
            <img
              src={product.coverImageUrl}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              loading="lazy"
              data-testid={`img-product-${product.slug}`}
            />
          </div>
        )}
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs" data-testid={`badge-category-${product.slug}`}>
              {product.category}
            </Badge>
            {product.featured && (
              <Badge className="bg-amber-100 text-amber-700 text-xs" data-testid={`badge-featured-${product.slug}`}>
                <Star className="w-3 h-3 mr-1" /> Popular
              </Badge>
            )}
            {product.tierTarget && product.tierTarget !== "all" && (
              <Badge variant="outline" className="text-xs">{product.tierTarget.toUpperCase()}</Badge>
            )}
          </div>
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors" data-testid={`text-product-title-${product.slug}`}>
            {product.title}
          </h3>
          {product.shortDescription && (
            <p className="text-sm text-gray-500 mb-3 line-clamp-2" data-testid={`text-product-desc-${product.slug}`}>
              {product.shortDescription}
            </p>
          )}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary" data-testid={`text-price-${product.slug}`}>
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through" data-testid={`text-compare-price-${product.slug}`}>
                {formatPrice(product.compareAtPrice!)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </LocaleLink>
  );
}

function AdminProductManager() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [products, setProducts] = useState<DigitalProduct[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "", slug: "", description: "", shortDescription: "", priceDollars: "19.99",
    compareAtDollars: "", fileUrl: "", coverImageUrl: "", category: "Cram Guide",
    tierTarget: "all", examTarget: "", featured: false,
  });

  const loadProducts = async () => {
    try {
      const res = await adminFetch(`/api/admin/shop/products`);
      if (res.ok) setProducts(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  const handleSave = async () => {
    try {
      const url = editingId ? `/api/admin/shop/products/${editingId}` : "/api/admin/shop/products";
      const method = editingId ? "PUT" : "POST";
      const res = await adminFetch(url, {
        method,
        body: {
          ...form,
          price: Math.round(parseFloat(form.priceDollars) * 100) || 0,
          compareAtPrice: form.compareAtDollars ? Math.round(parseFloat(form.compareAtDollars) * 100) : null,
          priceDollars: undefined,
          compareAtDollars: undefined,
        },
      });
      if (res.ok) {
        toast({ title: editingId ? "Product updated" : "Product created" });
        setShowForm(false);
        setEditingId(null);
        setForm({ title: "", slug: "", description: "", shortDescription: "", priceDollars: "19.99", compareAtDollars: "", fileUrl: "", coverImageUrl: "", category: "Cram Guide", tierTarget: "all", examTarget: "", featured: false });
        loadProducts();
      } else {
        const err = await res.json();
        toast({ title: "Error", description: err.error, variant: "destructive" });
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const res = await adminFetch(`/api/admin/shop/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast({ title: "Product deleted" });
      loadProducts();
    }
  };

  const startEdit = (p: DigitalProduct) => {
    setEditingId(p.id);
    setForm({
      title: p.title, slug: p.slug, description: p.description, shortDescription: p.shortDescription || "",
      priceDollars: (p.price / 100).toFixed(2), compareAtDollars: p.compareAtPrice ? (p.compareAtPrice / 100).toFixed(2) : "",
      fileUrl: p.fileUrl || "", coverImageUrl: p.coverImageUrl || "", category: p.category,
      tierTarget: p.tierTarget || "all", examTarget: p.examTarget || "", featured: p.featured || false,
    });
    setShowForm(true);
  };

  return (
    <div className="bg-white border-2 border-dashed border-primary/30 rounded-xl p-6 mb-8" data-testid="admin-product-manager">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" /> Manage Products ({products.length})
        </h3>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => setLocation("/admin/product-builder")} size="sm" variant="outline" data-testid="button-open-builder">
            <Palette className="w-4 h-4 mr-1" /> Product Builder
          </Button>
          <Button onClick={() => setLocation("/admin/product-builder?new=1")} size="sm" variant="outline" data-testid="button-create-product">
            <Plus className="w-4 h-4 mr-1" /> Create Product
          </Button>
          <Button onClick={() => { setShowForm(!showForm); setEditingId(null); }} size="sm" data-testid="button-add-product">
            <Plus className="w-4 h-4 mr-1" /> Add Product
          </Button>
        </div>
      </div>

      {showForm && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3" data-testid="form-product">
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} data-testid="input-product-title" />
            <Input placeholder="Slug" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} data-testid="input-product-slug" />
          </div>
          <Textarea placeholder="Full description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} data-testid="input-product-description" />
          <Input placeholder="Short description" value={form.shortDescription} onChange={e => setForm({...form, shortDescription: e.target.value})} data-testid="input-product-short-desc" />
          <div className="grid grid-cols-3 gap-3">
            <Input placeholder="Price ($)" value={form.priceDollars} onChange={e => setForm({...form, priceDollars: e.target.value})} data-testid="input-product-price" />
            <Input placeholder="Compare-at price ($)" value={form.compareAtDollars} onChange={e => setForm({...form, compareAtDollars: e.target.value})} data-testid="input-product-compare-price" />
            <select className="border rounded px-3 py-2 text-sm" value={form.category} onChange={e => setForm({...form, category: e.target.value})} data-testid="select-product-category">
              <option>Cram Guide</option>
              <option>Flashcard Pack</option>
              <option>Printable</option>
              <option>Bundle</option>
              <option>Quick Reference</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Cover image URL" value={form.coverImageUrl} onChange={e => setForm({...form, coverImageUrl: e.target.value})} data-testid="input-product-cover" />
            <Input placeholder="File URL (PDF)" value={form.fileUrl} onChange={e => setForm({...form, fileUrl: e.target.value})} data-testid="input-product-file" />
          </div>
          <div className="grid grid-cols-3 gap-3 items-center">
            <select className="border rounded px-3 py-2 text-sm" value={form.tierTarget} onChange={e => setForm({...form, tierTarget: e.target.value})} data-testid="select-product-tier">
              <option value="all">All Tiers</option>
              <option value="rpn">RPN</option>
              <option value="rn">RN</option>
              <option value="np">NP</option>
            </select>
            <Input placeholder="Exam target (e.g. REx-PN)" value={form.examTarget} onChange={e => setForm({...form, examTarget: e.target.value})} data-testid="input-product-exam" />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} data-testid="checkbox-product-featured" />
              Featured
            </label>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm" data-testid="button-save-product">{editingId ? "Update" : "Create"} Product</Button>
            <Button onClick={() => { setShowForm(false); setEditingId(null); }} variant="ghost" size="sm"><X className="w-4 h-4" /></Button>
          </div>
        </div>
      )}

      {products.length > 0 && (
        <div className="space-y-2">
          {products.map(p => (
            <div key={p.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3" data-testid={`admin-product-row-${p.slug}`}>
              <div>
                <span className="font-medium text-sm">{p.title}</span>
                <span className="text-xs text-gray-400 ml-2">{formatPrice(p.price)}</span>
                {!p.isActive && <Badge variant="outline" className="ml-2 text-xs text-red-500">Inactive</Badge>}
              </div>
              <div className="flex gap-1">
                <Button onClick={() => startEdit(p)} variant="ghost" size="sm" data-testid={`button-edit-${p.slug}`}><Edit className="w-4 h-4" /></Button>
                {p.fileUrl && (
                  <Button
                    onClick={async () => {
                      try {
                        const res = await adminFetch(`/api/admin/shop/products/${p.id}/download`);
                        if (!res.ok) { toast({ title: "Download failed", variant: "destructive" }); return; }
                        const blob = await res.blob();
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `${p.slug || "product"}.pdf`;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                        URL.revokeObjectURL(url);
                      } catch (e: any) {
                        toast({ title: "Download error", description: e.message, variant: "destructive" });
                      }
                    }}
                    variant="ghost" size="sm" data-testid={`button-download-${p.slug}`}
                    title="Download full PDF"
                  >
                    <Download className="w-4 h-4 text-blue-500" />
                  </Button>
                )}
                <Button
                  onClick={async () => {
                    try {
                      const res = await adminFetch(`/api/admin/shop/products/${p.id}/generate-preview`, {
                        method: "POST",
                        body: { pageCount: 3 },
                      });
                      if (res.ok) {
                        toast({ title: "Preview generated" });
                        loadProducts();
                      } else {
                        const err = await res.json().catch(() => ({}));
                        toast({ title: "Preview Error", description: err.error || "Failed", variant: "destructive" });
                      }
                    } catch (e: any) {
                      toast({ title: "Error", description: e.message, variant: "destructive" });
                    }
                  }}
                  variant="ghost" size="sm" data-testid={`button-gen-preview-${p.slug}`}
                  title="Generate watermarked preview"
                >
                  <Shield className="w-4 h-4 text-amber-500" />
                </Button>
                <Button onClick={() => handleDelete(p.id)} variant="ghost" size="sm" data-testid={`button-delete-${p.slug}`}><Trash2 className="w-4 h-4 text-red-400" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  const { t } = useI18n();
  const { user, isAdmin } = useAuth();
  const [products, setProducts] = useState<DigitalProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    fetch("/api/shop/products")
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["all", ...new Set(products.map(p => p.category))];
  const filtered = categoryFilter === "all" ? products : products.filter(p => p.category === categoryFilter);
  const featured = products.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
      <AdminEditButton />
      <SEO
        title="Nursing Study Guides & Cram Booklets | NurseNest Store"
        description="Download professional nursing cram guides, quick reference sheets, and study bundles. REx-PN, NCLEX, and NP exam prep materials from $19."
        keywords="nursing study guides, NCLEX cram guide, REx-PN study materials, nursing exam prep PDF"
        canonicalPath="/shop"
      />
      <Navigation />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 via-white to-white py-16 px-4" data-testid="section-shop-hero">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-primary/10 text-primary mb-4 px-4 py-1.5" data-testid="badge-shop">
              <ShoppingBag className="w-3 h-3 mr-1.5" /> {t("shop.hero.badge")}
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight" data-testid="text-shop-title">
              {t("shop.hero.title")}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6" data-testid="text-shop-subtitle">
              {t("shop.hero.subtitle")}
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Download className="w-4 h-4" /> Instant PDF Download</span>
              <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Clinically Verified</span>
              <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> Exam-Aligned Content</span>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {isAdmin && <AdminProductManager />}

          {featured.length > 0 && (
            <section className="mb-12" data-testid="section-featured-products">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-bold" data-testid="text-featured-heading">{t("shop.featured.title")}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>
          )}

          {categories.length > 2 && (
            <div className="flex items-center gap-2 mb-6 flex-wrap" data-testid="section-shop-filters">
              <Filter className="w-4 h-4 text-gray-400" />
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={categoryFilter === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategoryFilter(cat)}
                  data-testid={`button-filter-${cat}`}
                >
                  {cat === "all" ? "All Products" : cat}
                </Button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="text-center py-16 text-gray-400" data-testid="text-shop-loading">Loading products...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16" data-testid="text-shop-empty">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-700 mb-2">{t("shop.empty.title")}</h3>
              <p className="text-gray-500 text-sm">{t("shop.empty.subtitle")}</p>
            </div>
          ) : (
            <section data-testid="section-all-products">
              <h2 className="text-xl font-bold mb-6" data-testid="text-all-products-heading">
                {categoryFilter === "all" ? t("shop.allProducts") : categoryFilter}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>
          )}
        </div>

        <section className="py-12 px-4 bg-gradient-to-r from-primary/5 to-primary/10" data-testid="section-shop-cta">
          <div className="max-w-2xl mx-auto text-center">
            <Crown className="w-8 h-8 text-primary mx-auto mb-3" />
            <h2 className="text-2xl font-bold mb-3" data-testid="text-shop-cta-title">{t("shop.cta.title")}</h2>
            <p className="text-gray-600 mb-6" data-testid="text-shop-cta-subtitle">{t("shop.cta.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LocaleLink href="/pricing">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8" data-testid="button-shop-pricing">
                  {t("shop.cta.button")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </LocaleLink>
              <LocaleLink href="/flashcards">
                <Button size="lg" variant="outline" className="px-8" data-testid="button-shop-flashcards">
                  {t("shop.cta.flashcards")}
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
