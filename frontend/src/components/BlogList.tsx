// frontend/src/components/BlogList.tsx
import { Link } from "react-router-dom";
import { BlogPost } from "@/types/blog";
import { format } from "date-fns";

interface BlogListProps {
  posts: BlogPost[];
  showFeatured?: boolean;
}

export function BlogList({ posts, showFeatured = false }: BlogListProps) {
  const featuredPost = showFeatured ? posts.find(post => post.featured) : null;
  const otherPosts = showFeatured ? posts.filter(post => !post.featured) : posts;

  return (
    <div className="space-y-12">
      {showFeatured && featuredPost && (
        <div className="bg-muted rounded-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-64 md:h-auto">
              <img
                src={featuredPost.image_url}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  {featuredPost.category}
                </span>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(featuredPost.published_date), "MMM d, yyyy")}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-3">{featuredPost.title}</h2>
              <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
              <div className="flex items-center gap-3">
                <img
                  src={featuredPost.author_avatar}
                  alt={featuredPost.author}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{featuredPost.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {featuredPost.read_time}
                  </p>
                </div>
              </div>
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="mt-6 inline-flex items-center text-primary font-medium hover:underline"
              >
                Read more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherPosts.map((post) => (
          <article key={post.id} className="group">
            <div className="overflow-hidden rounded-lg mb-4">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-muted-foreground">
                {format(new Date(post.published_date), "MMM d, yyyy")} · {post.read_time}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={post.author_avatar}
                  alt={post.author}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm">{post.author}</span>
              </div>
              <Link
                to={`/blog/${post.slug}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                Read more
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}