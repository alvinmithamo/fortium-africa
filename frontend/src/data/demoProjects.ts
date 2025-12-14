import { Project } from "@/types/project";

export const demoProjects: Project[] = [
  {
    id: "-1",
    title: "Kakuma Solar Farm",
    slug: "kakuma-solar-farm",
    summary: "1.2 MWp solar PV system powering Kakuma Refugee Camp",
    description: `The Kakuma Solar Farm is a 1.2 MWp grid-tied solar PV system designed to provide reliable, sustainable energy to the Kakuma Refugee Camp and surrounding areas. This project includes 3,200 solar panels, 50 inverters, and a 2MWh battery storage system.

Key Features:
- 1.2 MWp total capacity
- 3,200 high-efficiency solar panels
- 2MWh battery storage
- Grid-tied with backup power
- Remote monitoring system

Impact:
- Powers 1,200+ households
- Reduces CO2 emissions by 1,500 tons annually
- Provides 24/7 reliable power
- Creates local employment opportunities`,
    image_url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000"
    ],
    link_url: "https://maps.app.goo.gl/example",
    status: "Completed",
    project_type: "solar",
    type: "solar",
    location: "Kakuma, Kenya",
    client: "UNHCR",
    completion_date: "2023-06-15",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    services: ["Design", "Procurement", "Construction", "Commissioning"],
    technologies: ["Solar PV", "Battery Storage", "SCADA System"],
    capacity: "1.2 MWp",
    funding_source: "UNHCR & Private Investors",
    video_url: "https://www.youtube.com/embed/example"
  },
  {
    id: "-2",
    title: "Lodwar Water Supply",
    slug: "lodwar-water-supply",
    summary: "10,000LPH solar-powered desalination plant in Turkana County",
    description: `The Lodwar Water Supply project addresses critical water scarcity in Turkana County through a solar-powered desalination plant. The system purifies 10,000 liters of water per hour using reverse osmosis technology, powered entirely by solar energy.

Key Features:
- 10,000LPH production capacity
- Solar-powered operation
- 50,000L storage capacity
- Water quality monitoring
- Community water kiosks

Impact:
- Serves 5,000+ people daily
- Reduces waterborne diseases
- Improves community health
- Supports local agriculture`,
    image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000"
    ],
    link_url: "https://maps.app.goo.gl/example2",
    status: "Operational",
    project_type: "water",
    type: "water",
    location: "Lodwar, Kenya",
    client: "Turkana County Government",
    completion_date: "2023-09-20",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    services: ["Feasibility Study", "Design", "Installation", "Training"],
    technologies: ["Reverse Osmosis", "Solar PV", "Water Treatment"],
    capacity: "10,000LPH",
    funding_source: "County Government & Donor Funding",
    video_url: null
  },
  {
    id: "-3",
    title: "Nanyuki Industrial Park",
    slug: "nanyuki-industrial-park",
    summary: "5km access road and drainage infrastructure development",
    description: `The Nanyuki Industrial Park project involved the design and construction of 5km of bitumen-standard access roads and comprehensive drainage systems to support the growing industrial hub in Nanyuki.

Key Features:
- 5km bitumen-standard road
- Stormwater drainage system
- Street lighting
- Road signage
- Landscaping

Impact:
- Improves access to industrial area
- Reduces transportation costs
- Enhances safety
- Attracts investment`,
    image_url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1000",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1000",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1000"
    ],
    link_url: "https://maps.app.goo.gl/example3",
    status: "In Progress",
    project_type: "civil",
    type: "civil",
    location: "Nanyuki, Kenya",
    client: "Nanyuki Municipality",
    completion_date: "2024-03-30",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    services: ["Survey", "Design", "Construction Supervision", "Quality Control"],
    technologies: ["Road Construction", "Drainage Systems", "Pavement Engineering"],
    capacity: "5km Road",
    funding_source: "National Government",
    video_url: null
  }
];
