import type { Pagination } from "@/types";

export type ArticleStatus = "accepted" | "draft" | "rejected";

export interface Author {
  first_name: string;
  last_name: string;
}

export interface ArticleCategory {
  name: string;
}

export interface FullArticleCategory {
  id: string;
  name: string;
  description: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  banner: string;
  resume: string;
  reading_time: number;
  publication_timestamp: string;
  status: ArticleStatus;
  author: Author;
  author_id: string;
  category_id: string;
  article_category: ArticleCategory;
}

export interface ArticlesData {
  articles: Article[];
  pagination: Pagination;
}

export interface ArticlesResponse {
  data: ArticlesData;
}
