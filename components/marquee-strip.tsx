const ITEMS = [
  "PCOS Management",
  "Ovulation Induction",
  "Preconception Care",
  "TTC Support",
  "Reproductive Endocrinology",
  "Fertility Consultation",
  "Cycle Monitoring",
  "Hormonal Profiling",
];

export function MarqueeStrip() {
  // duplicate items for seamless loop
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden bg-adelaide-950 text-blossom-300 py-20 border-y border-adelaide-800"
    >
      <div className="flex gap-12 whitespace-nowrap animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="font-display italic font-semibold text-3xl sm:text-6xl flex items-center gap-12">
            {item}
            <span className="text-blossom-500 not-italic">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
