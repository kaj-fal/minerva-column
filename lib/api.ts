import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'content/articles');
const authorsFile = path.join(process.cwd(), 'content/authors.json');
const featuredFile = path.join(process.cwd(), 'content/featured.json');

export interface Author {
    id: string;
    name: string;
    image: string;
}

export interface ArticleMeta {
    slug: string;
    title: string;
    description?: string;
    date: string;
    authors: Author[];
    category: string;
    coverImage?: string;
}

export interface Article {
    meta: ArticleMeta;
    content: string;
}

export interface FeaturedConfig {
    home: { top: string };
    categories: Record<string, string>;
}

function getAuthors(): Record<string, { name: string, image: string }> {
    if (!fs.existsSync(authorsFile)) return {};
    return JSON.parse(fs.readFileSync(authorsFile, 'utf8'));
}

export function getAuthorById(id: string): Author {
    const authors = getAuthors();
    const author = authors[id];
    return {
        id,
        name: author?.name || 'Anonymous',
        image: author?.image || '/images/authors/column-logo.png'
    };
}

export function getFeaturedConfig(): FeaturedConfig {
    if (!fs.existsSync(featuredFile)) {
        return { home: { top: '' }, categories: {} };
    }
    return JSON.parse(fs.readFileSync(featuredFile, 'utf8'));
}

export function getArticleSlugs() {
    if (!fs.existsSync(articlesDirectory)) {
        return [];
    }
    return fs.readdirSync(articlesDirectory).filter(file => file.endsWith('.mdx'));
}

export function getArticleBySlug(slug: string): Article {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(articlesDirectory, `${realSlug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
        throw new Error(`Article not found: ${realSlug}`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const authorIdsRaw = data.author || 'the-column';
    const authorIds = typeof authorIdsRaw === 'string' 
        ? authorIdsRaw.split(',').map(id => id.trim())
        : [authorIdsRaw.toString()];

    const authors = authorIds.map(id => getAuthorById(id));

    return {
        meta: {
            slug: realSlug,
            title: data.title || 'Untitled',
            description: data.description || undefined,
            date: data.date || new Date().toISOString(),
            authors,
            category: data.category || 'Other',
            coverImage: data.coverImage || undefined,
        },
        content,
    };
}

export function getAllArticles(): Article[] {
    const slugs = getArticleSlugs();
    const articles = slugs
        .map((slug) => getArticleBySlug(slug))
        // sort articles by date in descending order
        .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
    return articles;
}

export function getArticlesByCategory(category: string): Article[] {
    const articles = getAllArticles();
    return articles.filter(
        (article) => article.meta.category.toLowerCase() === category.toLowerCase()
    );
}

