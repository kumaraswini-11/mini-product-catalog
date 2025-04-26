export default function Home() {
  return (
    <div
      className="p-4 max-w-2xl mx-auto space-y-6"
      aria-labelledby="about-heading">
      <h1
        id="about-heading"
        className="text-3xl font-bold tracking-tight">
        About ShopCatalog
      </h1>

      <section aria-labelledby="mission-heading">
        <h2
          id="mission-heading"
          className="sr-only">
          ShopCatalog Mission and Overview
        </h2>
        <p className="text-muted-foreground text-base">
          ShopCatalog is a modern e-commerce demo built with Next.js 15. It showcases dynamic
          routing, server-side rendering, and beautiful, accessible UI components.
        </p>
        <p className="text-muted-foreground text-base mt-2">
          Featuring statically generated product pages and clean design with Tailwind CSS, this
          project acts as both a learning tool and a boilerplate for scalable, real-world web
          applications.
        </p>
      </section>
    </div>
  );
}
