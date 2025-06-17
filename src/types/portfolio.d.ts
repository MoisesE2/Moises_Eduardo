export interface PortfolioItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  videoUrl: string;
  liveUrl: string;
  githubUrl: string;
  technologies: string[];
  category: string;
  featured: boolean;
}

export interface PortfolioApiResponse {
  data: PortfolioItem[];
  success: boolean;
  message?: string;
}