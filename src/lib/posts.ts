import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  featured?: boolean;
  tags?: string[];
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
  readingTimeMinutes: number;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx?$/, "");
    const filePath = path.join(CONTENT_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const rt = readingTime(content);

    return {
      slug,
      frontmatter: data as PostFrontmatter,
      content,
      readingTime: rt.text,
      readingTimeMinutes: Math.ceil(rt.minutes),
    };
  });

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const mdPath = path.join(CONTENT_DIR, `${slug}.md`);

  let filePath: string;
  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    filePath = mdPath;
  } else {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const rt = readingTime(content);

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
    readingTime: rt.text,
    readingTimeMinutes: Math.ceil(rt.minutes),
  };
}

export function getFeaturedPosts(limit = 3): Post[] {
  return getAllPosts()
    .filter((p) => p.frontmatter.featured)
    .slice(0, limit);
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(
    (p) => p.frontmatter.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((p) => p.frontmatter.category));
  return Array.from(categories);
}

export function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3
): Post[] {
  return getAllPosts()
    .filter(
      (p) =>
        p.slug !== currentSlug &&
        p.frontmatter.category.toLowerCase() === category.toLowerCase()
    )
    .slice(0, limit);
}

// CATEGORY_LABELS, CATEGORY_DESCRIPTIONS, and formatDate are in @/lib/categories.ts
// (kept separate to avoid pulling fs into client bundles)
