import Styles from "./styles/marquee.module.css";

const marqueeTexts = [
  "• Build •",
  "• Develop •",
  "• Collaborate •",
  "• Build Fast •",
  "• Ship Together •",
  "• Project Tracking •",
  "• Task Management •",
  "• Team Sync •",
  "• Dveloper Workspace •",
  "• Stay organized •",
  "• Clean UI •",
  "• Dev-Powered •",
  "• Productive Teams •",
  "• Launch Ready •",
  "• Project Clarity •",
  "• Team Goals •",
];

export default function MarqueeContent() {
  return (
    <div className="bg-white pt-9">
      <div className="relative overflow-hidden bg-white py-14">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-gray-500 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-gray-500 to-transparent" />

        <div className={`${Styles.marqueeScroll} flex whitespace-nowrap gap-6`}>
          {[...marqueeTexts, ...marqueeTexts].map((marquee, i) => (
            <span
              key={i}
              className="px-6 py-2 bg-white text-black rounded-full font-medium text-sm"
            >
              {marquee}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
