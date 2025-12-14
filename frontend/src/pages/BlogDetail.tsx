// frontend/src/pages/BlogDetail.tsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { demoBlogPosts } from "@/data/demoBlogPosts";
import { BlogPost } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";

export function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the blog post from an API here
    const foundPost = demoBlogPosts.find((p) => p.slug === slug);
    setPost(foundPost || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/blog">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Link
        to="/blog"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Blog
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
            {post.category}
          </span>
          <span className="text-sm text-muted-foreground">
            {format(new Date(post.published_date), "MMMM d, yyyy")}
          </span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            {post.read_time}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          {post.title}
        </h1>

        <div className="flex items-center gap-3">
          <img
            src={post.author_avatar}
            alt={post.author}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">{post.author}</p>
            <p className="text-sm text-muted-foreground">Author</p>
          </div>
        </div>
      </div>

      <div className="prose max-w-none">
        <div
          className="prose-img:rounded-xl prose-img:shadow-lg"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-muted text-muted-foreground"
              >
                <Tag className="h-3 w-3 mr-1.5" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-6">About the Author</h3>
        <div className="flex items-start gap-4 bg-muted/50 p-6 rounded-lg">
          <img
            src={post.author_avatar}
            alt={post.author}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h4 className="font-medium text-lg">{post.author}</h4>
            <p className="text-muted-foreground mt-1">
              {post.author} is a professional in the {post.category} field with
              years of experience. They are passionate about sharing knowledge
              and insights about the industry.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-6">Enjoyed this article?</h3>
        <p className="text-muted-foreground mb-6">
          Subscribe to our newsletter to get our latest articles and insights
          delivered straight to your inbox.
        </p>
        <Button size="lg">Subscribe to Newsletter</Button>
      </div>
    </article>
  );
}