import { useState } from "react";
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

// Blog articles
const articles = [
  {
    id: 1,
    title: "The Future of Solar Energy in East Africa",
    category: "Renewable Energy Trends",
    excerpt: "Exploring the rapid growth of solar adoption across East African nations and the transformative impact on energy access.",
    date: "2024-01-15",
    image: "/api/placeholder.svg",
  },
  {
    id: 2,
    title: "Case Study: 500kW Commercial Solar Installation Success",
    category: "Client Success Stories",
    excerpt: "How our recent Nairobi project achieved 60% energy cost reduction and exceeded client expectations.",
    date: "2024-01-10",
    image: "/api/placeholder.svg",
  },
  {
    id: 3,
    title: "Sustainable Water Infrastructure for Growing Cities",
    category: "Sustainability & Impact",
    excerpt: "Best practices for designing water treatment facilities that serve communities while protecting the environment.",
    date: "2024-01-05",
    image: "/api/placeholder.svg",
  },
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");

  const filteredArticles = selectedCategory === "All" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3">{article.category}</Badge>
                  <h3 className="text-xl font-heading font-semibold mb-3">{article.title}</h3>
                  <p className="text-muted-foreground font-body mb-4">{article.excerpt}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                  <Button variant="link" className="mt-4 p-0">Read More →</Button>
                </CardContent>
              </Card>
            ))}
          </div>
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
