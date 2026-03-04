export interface VideoProject {
  id: string;
  video_title: string;
  video_description: string;
  tags: string[];
  cover_image: string;
  publish_date: string;
  client_name: string;
  client_image: string;
  client_feedback: string;
  video_link: string;
  insta_link?: string;
  linkedin_link?: string;
  position?: number;
  project_images: string[];
  category: string[];
  duration?: string;
  software_used?: string[];
  orientation?: "horizontal" | "vertical";
}

export interface Client {
  id: string;
  name: string;
  logo: string;
}
