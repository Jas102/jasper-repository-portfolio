// Mount this ONCE, near the root of the app (e.g. in App.jsx, as the very
// first child, above <Navbar />). It's `fixed`, so it stays put and shows
// through every section — sections themselves should NOT set their own
// bg-black / bg-white, otherwise this gets covered up.

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#fbfaf8] dark:bg-[#050308] transition-colors duration-500">
      <style>{`
        @keyframes drift-a {
          0%   { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          25%  { transform: translate(160px, -110px) scale(1.15) rotate(8deg); }
          50%  { transform: translate(70px, 130px) scale(0.9) rotate(-5deg); }
          75%  { transform: translate(-130px, 40px) scale(1.08) rotate(6deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
        }
        @keyframes drift-b {
          0%   { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          30%  { transform: translate(-150px, 90px) scale(1.12) rotate(-7deg); }
          60%  { transform: translate(-60px, -120px) scale(0.92) rotate(4deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
        }
        @keyframes drift-c {
          0%   { transform: translate(0px, 0px) scale(1); }
          40%  { transform: translate(110px, -140px) scale(1.18); }
          70%  { transform: translate(-90px, -30px) scale(0.88); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes drift-d {
          0%   { transform: translate(0px, 0px) scale(1); }
          50%  { transform: translate(-120px, 100px) scale(1.15); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .bg-orb-a { animation: drift-a 18s ease-in-out infinite; }
        .bg-orb-b { animation: drift-b 22s ease-in-out infinite; }
        .bg-orb-c { animation: drift-c 26s ease-in-out infinite; }
        .bg-orb-d { animation: drift-d 30s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .bg-orb-a, .bg-orb-b, .bg-orb-c, .bg-orb-d { animation: none !important; }
        }
      `}</style>

      {/* gradient orbs — indigo / violet / sky / pink, same palette in both
          themes. Blur brought down from 110-120px to 70-85px and opacity
          raised so the movement actually reads instead of dissolving into
          an even haze. */}
      <div
        className="bg-orb-a absolute -top-40 -left-32 h-[560px] w-[560px] rounded-full opacity-[0.38] blur-[85px] dark:opacity-[0.28]"
        style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
      />
      <div
        className="bg-orb-b absolute top-1/3 -right-28 h-[520px] w-[520px] rounded-full opacity-[0.34] blur-[80px] dark:opacity-[0.24]"
        style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)" }}
      />
      <div
        className="bg-orb-c absolute bottom-[-8%] left-1/4 h-[480px] w-[480px] rounded-full opacity-[0.32] blur-[80px] dark:opacity-[0.2]"
        style={{ background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)" }}
      />
      <div
        className="bg-orb-d absolute top-[8%] right-[8%] h-[380px] w-[380px] rounded-full opacity-[0.26] blur-[70px] dark:opacity-[0.16]"
        style={{ background: "radial-gradient(circle, #f472b6 0%, transparent 70%)" }}
      />

      {/* vignette — much lighter touch now: fades in later (65% instead of
          45%) and caps at a lower max opacity, so the clouds stay visible
          out toward the edges instead of washing out to flat white/black */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 20%, transparent 55%, rgba(251,250,248,0.3) 100%)" }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{ background: "radial-gradient(ellipse at 50% 20%, transparent 55%, rgba(5,3,8,0.35) 100%)" }}
      />
    </div>
  );
}