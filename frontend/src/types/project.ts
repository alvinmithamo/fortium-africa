// types/project.ts
export interface Project {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  description: string;
  type: string;
  status: 'Completed' | 'In Progress' | 'Planned'| 'Operational';
  location: string;
  project_type: string;
  client?: string;
  completion_date?: string;
  duration?: string;
  image_url: string;
  gallery?: string[];
  features?: Array<{
    title: string;
    description: string;
  }>;
  created_at?: string;
  updated_at?: string;
  services?: string[];
  technologies?: string[];
  capacity?: string;
  funding_source?: string;
  link_url?: string;
  video_url?: string;
}