import Image from "next/image";
import Link from "next/link";
import { getArticlesByCategory, getFeaturedConfig } from "@/lib/api";
import { stripMarkdown } from "@/lib/utils";

interface CategoryPageProps {
    category: string;
    title: string;
}

export default function CategoryPage({ category, title }: CategoryPageProps) {
    const allArticles = getArticlesByCategory(category);
    const featuredConfig = getFeaturedConfig();

    if (!allArticles || allArticles.length === 0) {
        return <div className="p-8 text-center text-accent font-avenir">No articles found in this category.</div>;
    }

    // 1. Featured Article for this category
    const featuredSlug = featuredConfig.categories[category];
    const featuredArticle = allArticles.find(a => a.meta.slug === featuredSlug) || allArticles[0];

    // 2. Other articles sorted by date (latest first)
    // getAllArticles already sorts by date, and getArticlesByCategory maintains that.
    const otherArticles = allArticles.filter(a => a.meta.slug !== featuredArticle.meta.slug);

    return (
        <div className="py-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-trajan font-bold text-center text-ink mb-12 uppercase tracking-widest">
                {title}
            </h1>

            {/* Main Feature */}
            <div className="mb-20">
                <Link href={`/articles/${featuredArticle.meta.slug}`} className="group block mb-8 relative w-full aspect-[2/1] bg-gray-200 overflow-hidden">
                    {featuredArticle.meta.coverImage ? (
                        <Image
                            src={featuredArticle.meta.coverImage}
                            alt={featuredArticle.meta.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-accent/10 flex items-center justify-center">
                            <span className="text-accent opacity-50 font-trajan text-4xl font-bold">THE COLUMN</span>
                        </div>
                    )}
                </Link>

                <div className="text-center px-4">
                    <Link href={`/articles/${featuredArticle.meta.slug}`} className="group block">
                        <h2 className="text-3xl md:text-5xl font-trajan font-bold text-ink group-hover:text-accent transition-colors leading-tight mb-6">
                            {featuredArticle.meta.title}
                        </h2>
                    </Link>
                    <p className="text-sm font-avenir text-gray-500 uppercase font-semibold tracking-wider mb-6">
                        By <span className="text-accent">{featuredArticle.meta.authors.map(a => a.name).join(' & ')}</span> • {new Date(featuredArticle.meta.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="font-avenir text-gray-700 leading-relaxed text-lg text-justify mx-auto max-w-2xl">
                        {stripMarkdown(featuredArticle.content.split('\n').find(line => line.length > 50 && !line.startsWith('#')) || '').substring(0, 300) || 'Click to read full story.'}...
                    </p>
                </div>
            </div>

            {/* List of other articles directly below */}
            {otherArticles.length > 0 && (
                <div className="flex flex-col space-y-12 border-t border-gray-300 pt-12">
                    {otherArticles.map((article) => (
                        <div key={article.meta.slug} className="text-center max-w-2xl mx-auto pb-10 border-b border-gray-100 last:border-0">
                            <Link href={`/articles/${article.meta.slug}`} className="group block mb-4">
                                <h3 className="text-2xl font-trajan font-bold text-ink group-hover:text-accent transition-colors leading-snug">
                                    {article.meta.title}
                                </h3>
                            </Link>
                            <p className="text-xs font-avenir text-gray-500 uppercase font-semibold tracking-wider mb-4">
                                By <span className="text-accent">{article.meta.authors.map(a => a.name).join(' & ')}</span> • {new Date(article.meta.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                            <p className="text-base font-avenir text-gray-700 leading-relaxed text-justify">
                                {stripMarkdown(article.content.split('\n').find(line => line.length > 50 && !line.startsWith('#')) || '').substring(0, 250) || 'Click to read full story.'}...
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
