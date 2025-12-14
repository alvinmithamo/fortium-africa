export type BlogPost = {
    id: string,
    slug: string,
    title: string,
    excerpt: string;
    content: string;
    image_url: string;
    author: string;
    author_avatar?: string;
    published_date: string;
    read_time: string;
    tags: string[];
    category: string;
    featured?: boolean;

};