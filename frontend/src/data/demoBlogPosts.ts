// frontend/src/data/demoBlogPosts.ts
import { BlogPost } from "@/types/blog";

export const demoBlogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "solar-energy-africa-2024",
    title: "The Future of Solar Energy in Africa: 2024 Outlook",
    excerpt: "Exploring the latest trends and innovations in solar energy across the African continent and what the future holds for renewable energy solutions.",
    content: `
      <h2>The Growing Solar Market in Africa</h2>
      <p>Africa's solar energy market is experiencing unprecedented growth, with countries across the continent investing heavily in renewable energy infrastructure. In 2024, we're seeing a significant shift towards decentralized solar solutions that are transforming remote communities.</p>
      
      <h3>Key Trends Shaping 2024</h3>
      <ul>
        <li>Expansion of mini-grid projects in rural areas</li>
        <li>Increased adoption of solar home systems</li>
        <li>Government incentives for commercial and industrial solar installations</li>
        <li>Advancements in solar battery storage technology</li>
      </ul>
      
      <p>At Fortium Africa, we're at the forefront of this revolution, delivering innovative solar solutions that power homes, businesses, and industries across the region.</p>
    `,
    image_url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200",
    author: "Sarah Kipchirchir",
    author_avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    published_date: "2024-03-15T10:00:00Z",
    read_time: "5 min read",
    tags: ["solar", "renewable energy", "sustainability"],
    category: "Energy",
    featured: true
  },
  {
    id: "2",
    slug: "water-desalination-africa",
    title: "Innovations in Water Desalination for Arid Regions",
    excerpt: "How new desalination technologies are providing clean water solutions to water-scarce communities in Africa.",
    content: `
      <h2>Addressing Water Scarcity Through Innovation</h2>
      <p>Water scarcity remains one of Africa's most pressing challenges, particularly in arid and semi-arid regions. In this article, we explore how innovative desalination technologies are changing the game.</p>
      
      <h3>Breakthrough Technologies</h3>
      <p>Recent advancements in reverse osmosis and solar-powered desalination are making clean water more accessible than ever before. These solutions are particularly impactful in coastal regions where seawater is abundant but fresh water is scarce.</p>
      
      <p>Our team at Fortium Africa has successfully implemented several large-scale desalination projects that are now providing clean water to thousands of people.</p>
    `,
    image_url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200",
    author: "David Omondi",
    author_avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    published_date: "2024-03-10T14:30:00Z",
    read_time: "4 min read",
    tags: ["water", "desalination", "sustainability"],
    category: "Water"
  },
  {
    id: "3",
    slug: "infrastructure-development-africa",
    title: "Building Africa's Future: Infrastructure Development in 2024",
    excerpt: "An in-depth look at the major infrastructure projects transforming Africa's landscape and economy this year.",
    content: `
      <h2>Transforming Africa's Infrastructure</h2>
      <p>2024 is set to be a landmark year for infrastructure development across Africa, with numerous mega-projects reaching completion and new ones breaking ground.</p>
      
      <h3>Key Projects to Watch</h3>
      <p>From transportation networks to energy grids, the continent is witnessing unprecedented investment in critical infrastructure. These projects are not just about construction – they're about creating sustainable, long-term solutions that will drive economic growth for decades to come.</p>
      
      <p>Fortium Africa is proud to be contributing to this transformation through our expertise in civil engineering and project management.</p>
    `,
    image_url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200",
    author: "James Mwangi",
    author_avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    published_date: "2024-03-05T09:15:00Z",
    read_time: "6 min read",
    tags: ["infrastructure", "construction", "development"],
    category: "Civil Engineering"
  }
];