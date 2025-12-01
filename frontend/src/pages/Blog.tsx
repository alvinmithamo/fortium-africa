import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { toast } from "sonner";

const categories = [
  { name: "All", tagline: "" },
  { name: "Renewable Energy Trends", tagline: "Stay updated with the latest innovations in solar, battery storage, and hybrid energy systems driving Africa's clean energy transition." },
  { name: "Client Success Stories", tagline: "See how Fortium Africa's projects are transforming industries, communities, and lives." },
  { name: "Sustainability & Impact", tagline: "Highlighting our role in promoting environmental responsibility, climate resilience, and social development through every project." }
];

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  status: string;
  published_at: string | null;
};

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadBlogs() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/blogs");
        if (!res.ok) {
          throw new Error("Failed to load blog posts");
        }

        const data = await res.json();
        if (!data?.success || !Array.isArray(data.data)) {
          throw new Error("Unexpected response from server");
        }

        if (isMounted) {
          setArticles(data.data as BlogPost[]);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load blog posts");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedCategoryData = categories.find(cat => cat.name === selectedCategory);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-deep-navy to-primary py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl font-heading font-bold text-white sm:text-5xl mb-6">
              Insights & Updates | Fortium Africa Blog
            </h1>
            <p className="text-xl text-white/90 font-body mb-4">
              Insights That Power Progress
            </p>
            <p className="text-lg text-white/80 font-body">
              Here, we share thought‑provoking articles, project success stories, and technology updates that showcase how innovation is shaping a greener, more resilient continent. Our goal is to inform, inspire, and empower communities, businesses, and professionals working toward a sustainable future.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-muted border-b">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-3 mb-4">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </Button>
            ))}
          </div>
          {selectedCategoryData && selectedCategoryData.tagline && (
            <p className="text-sm text-muted-foreground font-body max-w-3xl">
              {selectedCategoryData.tagline}
            </p>
          )}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {loading && (
            <p className="text-muted-foreground font-body">Loading articles...</p>
          )}

          {error && !loading && (
            <p className="text-red-600 font-body">{error}</p>
          )}

          {!loading && !error && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {articles.map((article) => {
                const image = article.cover_image_url || "/api/placeholder.svg";
                const date = article.published_at
                  ? new Date(article.published_at).toLocaleDateString()
                  : "";

                return (
                  <Card
                    key={article.id}
                    className="h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                      <img
                        src={image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge className="mb-3">Blog</Badge>
                      <h3 className="text-xl font-heading font-semibold mb-3">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground font-body mb-4">
                        {article.excerpt || article.content.slice(0, 140) + (article.content.length > 140 ? "..." : "")}
                      </p>
                      {date && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{date}</span>
                        </div>
                      )}
                      <Button variant="link" className="mt-4 p-0">
                        Read More →
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold sm:text-4xl mb-4">
              Stay Ahead in the Sustainable Future
            </h2>
            <p className="text-lg opacity-90 font-body mb-8">
              Join our community of engineers, innovators, and sustainability enthusiasts. Subscribe to our newsletter for the latest insights, news, and project updates from Fortium Africa.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background"
                required
              />
              <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
