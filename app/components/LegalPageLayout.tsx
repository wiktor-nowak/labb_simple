import Footer from "./Footer";
import Header from "./Header";

type Section = {
  heading: string;
  body: string[];
};

type LegalPageLayoutProps = {
  eyebrow: string;
  title: string;
  sections: Section[];
};

export default function LegalPageLayout({
  eyebrow,
  title,
  sections,
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-dvh bg-ink">
      <Header />

      <main className="mx-auto max-w-[65ch] px-6 py-16 tablet:px-10 tablet:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-faint">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-sans text-4xl leading-[1.05] tracking-[-0.01em] text-paper tablet:text-5xl">
          {title}
        </h1>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-sans text-xl text-paper">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-relaxed text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
