import { clientsData } from "@/db/clients";
import { allVideoProjects } from "@/db/projects";
import { Client, VideoProject } from "@/types/videos";

export const getAllVideoProjects = (): VideoProject[] => {
  return [...allVideoProjects].sort((a, b) => {
    const posA = a.position ?? 9999; 
    const posB = b.position ?? 9999;
    
    if (posA !== posB) return posA - posB; 
    
    return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
  });
};

export const getVideoProjectsByCategory = (
  category: string
): VideoProject[] => {
  if (category === "All") {
    return getAllVideoProjects();
  }

  const filteredProjects = allVideoProjects.filter((project) =>
    project.category.includes(category)
  );

  return filteredProjects.sort((a, b) => {
    const posA = a.position ?? 9999;
    const posB = b.position ?? 9999;
    
    if (posA !== posB) return posA - posB;
    return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
  });
};

export const getVideoProjectById = (id: string): VideoProject | undefined => {
  return allVideoProjects.find((project) => project.id === id);
};

export const getVideoCategories = (): string[] => {
  const categoriesSet = new Set<string>();

  allVideoProjects.forEach((project) => {
    project.category.forEach((cat) => categoriesSet.add(cat));
  });

  return Array.from(categoriesSet);
};

export const getVideoCategoriesWithCount = (): {
  category: string;
  count: number;
}[] => {
  const categoryCountMap = new Map<string, number>();

  allVideoProjects.forEach((project) => {
    project.category.forEach((cat) => {
      categoryCountMap.set(cat, (categoryCountMap.get(cat) || 0) + 1);
    });
  });

  const sortedCategories = Array.from(categoryCountMap.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  return sortedCategories;
};

export const getVideoCategoriesWithCountIncludingAll = (): {
  category: string;
  count: number;
}[] => {
  const categoryCounts = getVideoCategoriesWithCount();
  const total = allVideoProjects.length;

  return [{ category: "All", count: total }, ...categoryCounts];
};

export function getFeaturedProjects(limit = 6): VideoProject[] {
  return getAllVideoProjects().slice(0, limit);
}

export function getClients(): Client[] {
  return clientsData;
}

export const getYouTubeEmbedUrl = (url: string): string | null => {
  if (!url) return null;

  // Handle Shorts
  if (url.includes("youtube.com/shorts/")) {
    const match = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  }

  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

export const videoProjectsData = {
  "Talking Head": allVideoProjects.filter((p) =>
    p.category.includes("Talking Head")
  ),
  Shorts: allVideoProjects.filter((p) => p.category.includes("Shorts")),
  Promo: allVideoProjects.filter((p) => p.category.includes("Promo")),
  Documentary: allVideoProjects.filter((p) =>
    p.category.includes("Documentary")
  ),
  Explainer: allVideoProjects.filter((p) => p.category.includes("Explainer")),
  "Motion Graphics": allVideoProjects.filter((p) =>
    p.category.includes("Motion Graphics")
  ),
  Animation: allVideoProjects.filter((p) => p.category.includes("Animation")),
};
