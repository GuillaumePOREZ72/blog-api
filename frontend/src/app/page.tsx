import { ArrowRight, Star, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const featuredPosts = [
    {
      id: 1,
      title: 'The Rise of Neobrutalism in Web Design',
      excerpt:
        'Why bold borders and hard shadows are taking over the modern web...',
      category: 'Design',
      date: 'Oct 24, 2024',
      color: 'bg-primary',
    },
    {
      id: 2,
      title: "Mastering Next.js 15: What's New?",
      excerpt:
        'Exploring the latest features in Next.js and how they change development...',
      category: 'Tech',
      date: 'Oct 22, 2024',
      color: 'bg-secondary',
    },
    {
      id: 3,
      title: 'The Future of AI in Creative Writing',
      excerpt:
        'How generative models are assisting writers without replacing creativity...',
      category: 'AI',
      date: 'Oct 20, 2024',
      color: 'bg-accent',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="neo-card bg-primary relative overflow-hidden flex flex-col items-center text-center !p-12 sm:!p-20">
        <div className="absolute top-4 right-4 animate-bounce">
          <Star className="text-black fill-white" size={40} />
        </div>
        <div className="absolute bottom-10 left-10 -rotate-12 opacity-20">
          <Zap className="text-black fill-black" size={120} />
        </div>

        <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-tight max-w-4xl tracking-tight">
          SHARE YOUR <span className="bg-white px-4 neo-border">THOUGHTS</span>{' '}
          WITH THE WORLD.
        </h1>
        <p className="text-xl font-medium mb-10 max-w-2xl">
          Welcome to Neoblog. A place where content meets character. No fluff,
          just bold ideas and even bolder designs.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/posts"
            className="neo-btn !bg-black text-white px-10 py-4 text-xl flex items-center gap-3"
          >
            Explore Posts <ArrowRight />
          </Link>
          <div className="flex items-center gap-2 font-bold bg-white neo-border px-4 py-2">
            <TrendingUp size={24} />
            <span>1.2k Weekly Readers</span>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-black">LATEST STORIES</h2>
          <Link
            href="/posts"
            className="font-bold hover:underline transition-all"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="neo-card neo-shadow-hover flex flex-col h-full !p-0 overflow-hidden"
            >
              <div
                className={`h-48 ${post.color} neo-border-b flex items-center justify-center`}
              >
                <span className="bg-white neo-border px-3 py-1 font-bold text-sm uppercase">
                  {post.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-slate-500 font-bold text-sm mb-2">
                  {post.date}
                </span>
                <h3 className="text-2xl font-black mb-4 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-600 font-medium mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <Link
                    href={`/posts/${post.id}`}
                    className="font-black flex items-center gap-1 group"
                  >
                    Read More
                    <ArrowRight
                      className="group-hover:translate-x-1 transition-transform"
                      size={18}
                    />
                  </Link>
                  <button className="neo-border p-1 hover:bg-gray-100 transition-colors">
                    <Star size={18} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="neo-card bg-secondary text-white flex flex-col md:flex-row items-center gap-8 !p-12">
        <div className="space-y-4 flex-grow">
          <h2 className="text-4xl font-black">STAY IN THE LOOP</h2>
          <p className="text-xl font-medium opacity-90 max-w-xl">
            Get the latest bold ideas delivered straight to your inbox. No spam,
            only high-contrast wisdom.
          </p>
        </div>
        <div className="flex w-full md:w-auto gap-4">
          <input
            type="email"
            placeholder="your@email.com"
            className="neo-border px-4 py-3 bg-white text-black font-bold outline-none flex-grow md:w-64"
          />
          <button className="neo-btn !bg-black text-white whitespace-nowrap">
            Join Now
          </button>
        </div>
      </section>
    </div>
  );
}
