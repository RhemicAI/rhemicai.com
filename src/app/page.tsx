import CustomCursor from '@/components/CustomCursor/CustomCursor';
import FixedNav from '@/components/FixedNav/FixedNav';
import AttentionHero from '@/components/AttentionHero/AttentionHero';

export default function Home() {
  return (
    <main className="bg-black min-h-screen selection:bg-white/20 selection:text-white cursor-none">
      <CustomCursor />
      <FixedNav />
      <AttentionHero />

      {/* Placeholder sections for scroll depth */}
      {['Solutions', 'About', 'Contact'].map((section) => (
        <div
          key={section}
          className="min-h-screen flex items-center justify-center border-t border-white/5"
        >
          <h2 className="text-3xl font-extralight text-white/15 tracking-[0.3em] uppercase">
            {section} — Coming Soon
          </h2>
        </div>
      ))}
    </main>
  );
}
