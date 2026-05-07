import React from "react";
import { getArticleBySlug, getAllArticles } from "@/lib/api";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";
import { stripMarkdown } from "@/lib/utils";
import { TableOfContents } from "@/components/TableOfContents";
import remarkGfm from "remark-gfm";

// Return static params for all articles so Next.js pre-renders them
export async function generateStaticParams() {
    const articles = getAllArticles();
    return articles.map((article) => ({
        slug: article.meta.slug,
    }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    // Await the entire params object according to the new Next.js 15 asynchronous route params API
    const unwrappedParams = await params;
    const article = getArticleBySlug(unwrappedParams.slug);
    const recentPosts = getAllArticles().slice(0, 3).filter(a => a.meta.slug !== unwrappedParams.slug);

    // Helper to generate IDs for headers
    const slugify = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
    };

    // Components to override basic Markdown elements for consistent styling inside the MDX
    const mdxComponents = {
        h1: (props: any) => {
            const id = typeof props.children === 'string' ? slugify(props.children) : undefined;
            return <h1 id={id} className="text-4xl font-trajan font-bold text-ink mb-6 scroll-mt-24" {...props} />;
        },
        h2: (props: any) => {
            const id = typeof props.children === 'string' ? slugify(props.children) : undefined;
            return <h2 id={id} className="text-2xl font-trajan font-bold text-ink mt-10 mb-5 border-b border-gray-200 pb-2 scroll-mt-24" {...props} />;
        },
        h3: (props: any) => {
            const id = typeof props.children === 'string' ? slugify(props.children) : undefined;
            return <h3 id={id} className="text-xl font-avenir font-bold text-ink mt-8 mb-4 scroll-mt-24" {...props} />;
        },
        p: (props: any) => <p className="font-avenir text-lg text-gray-800 leading-relaxed mb-6" {...props} />,
        ul: (props: any) => <ul className="list-disc pl-6 mb-6 font-avenir text-lg text-gray-800 space-y-2" {...props} />,
        ol: (props: any) => <ol className="list-decimal pl-6 mb-6 font-avenir text-lg text-gray-800 space-y-2" {...props} />,
        a: (props: any) => <a className="text-accent underline hover:text-ink transition-colors" {...props} />,
        blockquote: (props: any) => <blockquote className="border-l-4 border-accent pl-4 italic text-gray-600 my-6" {...props} />,
        table: (props: any) => (
            <div className="overflow-x-auto my-8 border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200" {...props} />
            </div>
        ),
        thead: (props: any) => <thead className="bg-gray-50 text-accent font-trajan text-sm uppercase tracking-wider" {...props} />,
        th: (props: any) => <th className="px-6 py-4 text-left font-bold" {...props} />,
        td: (props: any) => <td className="px-6 py-4 text-sm text-gray-700 border-t border-gray-100" {...props} />,
        Columns: ({ children }: { children: React.ReactNode }) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-12 items-start border-t border-b border-gray-100 py-8">
                {children}
            </div>
        ),
        Column: ({ children }: { children: React.ReactNode }) => (
            <div className="flex-1 min-w-0">
                {children}
            </div>
        ),
    };

    return (
        <article className="pb-24">
            {/* Hero Header - Breaking out of container for full width */}
            <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[50vh] md:h-[65vh] bg-paper mb-12 overflow-hidden border-b border-gray-200">
                {article.meta.coverImage ? (
                    <div className="absolute inset-0">
                        <Image
                            src={article.meta.coverImage}
                            alt={article.meta.title}
                            fill
                            priority
                            className="object-cover"
                        />
                        {/* Overlay to ensure text readability */}
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-accent/20" />
                )}

                <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-20">
                    <div className="w-full">
                        <div className="mb-6">
                            <span className="inline-block bg-accent text-white px-4 py-1.5 rounded-full text-sm md:text-base font-avenir font-bold uppercase tracking-widest shadow-md">
                                {article.meta.category}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-trajan font-bold text-white leading-tight mb-6 [text-shadow:2px_2px_8px_rgba(0,0,0,0.7)] [-webkit-text-stroke:0.8px_rgba(0,0,0,0.6)] break-words">
                            {article.meta.title}
                        </h1>
                        {article.meta.description && (
                            <p className="text-lg md:text-2xl font-avenir text-white leading-relaxed italic [text-shadow:1px_1px_4px_rgba(0,0,0,0.6)] [-webkit-text-stroke:0.3px_rgba(0,0,0,0.4)] break-words max-w-5xl">
                                {stripMarkdown(article.meta.description)}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12 relative">

                {/* Left Sidebar: Sticky outline / Share link */}
                <div className="md:w-[20%] hidden md:block">
                    <div className="sticky top-10 space-y-8">
                        <div className="bg-white/50 border border-gray-200 p-4 shadow-sm">
                            <span className="block text-xs font-avenir font-bold uppercase tracking-wider text-gray-500 mb-2">
                                Operations
                            </span>
                            <CopyButton url={`https://thecolumn.minerva.edu/articles/${article.meta.slug}`} />
                        </div>

                        <TableOfContents content={article.content} />
                    </div>
                </div>

                {/* Center: Main Content */}
                <div className="md:w-[55%]">
                    <MDXRemote
                        source={article.content}
                        components={mdxComponents}
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkGfm],
                            }
                        }}
                    />

                    {/* End of Article: Author Signature */}
                    <div className="mt-12 flex flex-col items-center text-center">
                        <div className="flex flex-col items-center gap-6">
                            <div className="flex -space-x-4 justify-center">
                                {article.meta.authors.map((author, idx) => (
                                    author.image ? (
                                        <div key={author.id} className="relative w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-white" style={{ zIndex: idx }}>
                                            <Image
                                                src={author.image}
                                                alt={author.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : null
                                ))}
                            </div>
                            <span className="text-2xl font-trajan text-ink font-bold tracking-tight italic">
                                <span className="text-gray-500 font-avenir text-lg mr-2 font-normal not-italic">
                                    {article.meta.authors.length > 1 ? 'Written by' : 'Written by'}
                                </span>
                                {article.meta.authors.map(a => a.name).join(' & ')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Author, Recent Posts, Categories */}
                <div className="md:w-[25%] space-y-12">
                    {/* Author Block */}
                    <div>
                        <h3 className="text-lg font-trajan font-bold text-accent uppercase tracking-wider border-b-2 border-accent mb-4 pb-2">
                            {article.meta.authors.length > 1 ? 'Authors' : 'Author'}
                        </h3>
                        <div className="flex flex-col space-y-4">
                            {article.meta.authors.map((author) => (
                                <div key={author.id} className="flex items-center space-x-4">
                                    {author.image ? (
                                        <div className="w-14 h-14 relative rounded-sm overflow-hidden shadow-sm border border-gray-100 flex-shrink-0">
                                            <Image
                                                src={author.image}
                                                alt={author.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-14 h-14 bg-accent text-white flex items-center justify-center font-trajan text-xl font-bold rounded-sm shadow-sm flex-shrink-0">
                                            {author.name.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <span className="text-xs font-avenir text-gray-500 italic block mb-1">Written by</span>
                                        <span className="text-lg font-trajan text-ink font-semibold leading-tight">{author.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Posts */}
                    <div>
                        <h3 className="text-lg font-trajan font-bold text-accent uppercase tracking-wider border-b-2 border-accent mb-4 pb-2">
                            Recent Posts
                        </h3>
                        <div className="space-y-6">
                            {recentPosts.map((post) => (
                                <div key={post.meta.slug}>
                                    <p className="text-xs font-avenir italic text-gray-500 mb-1">{post.meta.category}</p>
                                    <Link href={`/articles/${post.meta.slug}`} className="group block">
                                        <h4 className="font-avenir font-bold text-ink leading-snug group-hover:text-accent transition-colors">
                                            {post.meta.title}
                                        </h4>
                                    </Link>
                                    <p className="text-sm font-avenir text-accent mt-1 transition-colors">{post.meta.authors.map(a => a.name).join(' & ')}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-trajan font-bold text-accent uppercase tracking-wider border-b-2 border-accent mb-4 pb-2">
                            Categories
                        </h3>
                        <ul className="list-disc pl-5 font-avenir text-accent space-y-2 uppercase text-xs tracking-widest font-bold">
                            <li><Link href="/opinions" className="hover:underline">Opinion</Link></li>
                            <li><Link href="/institution" className="hover:underline">Institution</Link></li>
                            <li><Link href="/cities" className="hover:underline">Cities</Link></li>
                            <li><Link href="/culture" className="hover:underline">Culture</Link></li>
                            <li><Link href="/fun" className="hover:underline">Fun</Link></li>
                        </ul>
                    </div>

                </div>

            </div>
        </article>
    );
}
