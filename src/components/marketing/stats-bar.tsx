const stats = [
  { value: "5M+", label: "Impressions generated" },
  { value: "30K+", label: "Leads generated" },
  { value: "2,000+", label: "Vetted creators" },
  { value: "5K+", label: "Posts published" },
];

export function StatsBar() {
  return (
    <section className="bg-primary py-16">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm font-medium text-primary-foreground/70">
          Proven across thousands of campaigns
        </p>
        <dl className="mt-8 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <dd className="text-4xl font-semibold tracking-tight text-primary-foreground sm:text-5xl">
                {stat.value}
              </dd>
              <dt className="mt-2 text-sm text-primary-foreground/70">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
