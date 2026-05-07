import Image from "next/image";

export default function AboutUsPage() {
    return (
        <div className="relative min-h-screen bg-paper text-ink font-avenir py-10 px-4 md:px-12 lg:px-20 max-w-7xl mx-auto">
            {/* Page Headers & Metadata */}
            <div className="flex justify-end mb-12 border-b border-ink/10 pb-2">
                <span className="font-trajan text-accent text-xl tracking-wider uppercase">Editorial</span>
            </div>

            {/* Side Margin Text (Vertical) */}
            <div className="hidden lg:block fixed left-6 bottom-32 -rotate-90 origin-left">
                <div className="flex items-center gap-12">
                    <span className="font-trajan text-accent text-sm tracking-widest uppercase items-center flex">
                        The Minerva Column
                    </span>
                    <span className="font-trajan text-accent text-3xl font-bold">2</span>
                </div>
            </div>

            {/* Main Newspaper Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                
                {/* Left & Center Main Content (8 columns) */}
                <div className="lg:col-span-8 space-y-12 relative">
                    
                    {/* Header */}
                    <header>
                        <h1 className="text-6xl md:text-7xl font-trajan font-bold mb-8 tracking-tighter">
                            About Us
                        </h1>
                    </header>

                    {/* About Us Content */}
                    <div className="relative">
                        {/* The Column Image - Positioned to the right of the first text block */}
                        <div className="hidden md:block absolute right-0 top-0 w-32 lg:w-40 z-0 opacity-80 pointer-events-none transform translate-x-4 lg:translate-x-12">
                            <Image 
                                src="/nice_column.png" 
                                alt="Classical Column" 
                                width={160} 
                                height={600} 
                                className="object-contain"
                            />
                        </div>

                        <div className="space-y-6 text-lg leading-relaxed md:pr-40 lg:pr-48 relative z-10">
                            <p>
                                The Minerva column was established by M27s in their second year during rotation in Seoul. Our mission is to create a space for Minervans to exchange critical ideas, refine their arguments, reflect on their experiences, and examine the institution&apos;s actions. We&rsquo;ve seen how easy it is for tensions to flare or opinions to get flattened in fast-moving chats. This is our attempt at slowing down, thinking carefully, and engaging generously.
                            </p>
                            
                            <p>
                                Ultimately, we love our community and believe we need more space for common discourse.
                            </p>
                            
                            <p>
                                We believe writing is thinking. This is a place to practice both. You should expect engaging writing that might surprise you because the next word is not decided by a probabilistic model.
                            </p>
                        </div>
                    </div>

                    {/* Get Involved Section */}
                    <section className="space-y-8">
                        <h2 className="text-4xl font-trajan font-bold text-accent uppercase tracking-wide border-b border-ink/10 pb-4">
                            Get involved!
                        </h2>
                        
                        <div className="space-y-6 text-lg leading-relaxed">
                            <p>
                                We always need more contributors. Whether you want to write one opinion piece or have a regular column, make a cartoon or be on the organizing team, there is space for you!
                            </p>
                            
                            <p>
                                If you have an idea but are not sure how you would make it come to life, we organize regular workshops where you can discuss angles, work on your writing, and get feedback. Feel free to contact anyone on the team to discuss your idea!
                            </p>
                        </div>

                        {/* Unsure what we cover? BOX */}
                        <div className="bg-white/30 border border-ink/5 p-8 flex flex-col md:flex-row justify-between items-start gap-8">
                            <div className="space-y-4">
                                <h3 className="font-trajan font-bold text-xl uppercase tracking-tight">Unsure what we cover?</h3>
                                <ul className="space-y-2 font-avenir text-gray-700">
                                    <li className="flex gap-2 items-start">• <span>All things Minerva-related</span></li>
                                    <li className="flex gap-2 items-start">• <span>Opinion pieces</span></li>
                                    <li className="flex gap-2 items-start">• <span>Epiphanies from the rotation cities</span></li>
                                    <li className="flex gap-2 items-start">• <span>Refurbished LBAs</span></li>
                                    <li className="flex gap-2 items-start">• <span>Reports from the institution</span></li>
                                    <li className="flex gap-2 items-start">• <span>Cartoons</span></li>
                                    <li className="flex gap-2 items-start">• <span>+more!</span></li>
                                </ul>
                            </div>
                            {/* Blue Arrow (Optional aesthetic from screenshot) */}
                            <div className="hidden md:flex flex-grow items-center justify-center pt-12 self-end text-accent/20">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
                                    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
                                </svg>
                            </div>
                        </div>

                        <div className="space-y-6 text-lg leading-relaxed">
                            <p>
                                If you don&rsquo;t see yourself as a writer yet, we still need people who want to edit pieces, work on the layout for our retroactive issues, or help improve our website - reach out.
                            </p>
                            
                            <p>
                                Have an idea for an event or workshop that might work well with us? Keep in touch! We work with professors, alumni, and external partners to improve our skills, and are always keen on expanding!
                            </p>
                        </div>
                    </section>
                    
                    {/* Footnote Contact */}
                    <div className="pt-20 text-center lg:text-right">
                        <p className="font-trajan text-xl mb-1 italic">Questions, comments, concerns?</p>
                        <a href="mailto:theminervacolumn@gmail.com" className="font-trajan text-xl font-bold hover:text-accent transition-colors">
                            theminervacolumn@gmail.com
                        </a>
                    </div>
                </div>

                {/* Right Sidebar (4 columns) */}
                <aside className="lg:col-span-4 space-y-16 lg:border-l lg:border-ink/5 lg:pl-12">
                    
                    {/* Contact Us */}
                    <section className="space-y-6">
                        <h2 className="text-3xl font-trajan italic font-bold tracking-tight">Contact us!</h2>
                        <p className="italic leading-relaxed text-gray-700 font-trajan">
                            You can reach the editorial team by telegram or knocking on our doors if you&rsquo;re in one of our reshalls, or email theminervacolumn@gmail.com
                        </p>
                        <div className="grid grid-cols-2 gap-4 font-trajan text-sm tracking-tighter">
                            <span>@Kajsafalsen</span>
                            <span>@ishankulovad</span>
                            <span>@bolitamagicamila</span>
                            <span>@NOTClaratripodi</span>
                        </div>
                    </section>

                    {/* Blue Prompt Box */}
                    <div className="bg-accent text-white p-10 flex flex-col items-center justify-center text-center space-y-4 shadow-lg transform hover:scale-[1.02] transition-transform">
                        <h3 className="text-4xl md:text-5xl font-trajan font-bold leading-tight uppercase tracking-widest">
                            Read.<br/>Write.<br/>Think.
                        </h3>
                    </div>


                    {/* Website Outreach */}
                    <section className="space-y-6 py-6 border-t border-ink/5">
                        <h2 className="text-2xl font-trajan italic font-bold">Check out our website!</h2>
                        <div className="p-4 border border-accent/20 rounded bg-white/50 text-center">
                            <p className="text-sm font-avenir text-gray-500 italic">
                                You are already here. Explore our archive to find more stories.
                            </p>
                        </div>
                    </section>

                </aside>
            </div>

            {/* Bottom Margin Padding */}
            <div className="h-20"></div>
        </div>
    );
}
