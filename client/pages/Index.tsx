import { ArrowRight, Eye, Shield, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-brand-rose via-brand-fuchsia to-brand-rose bg-clip-text text-transparent">
      {children}
    </span>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition hover:bg-white/[0.04]">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-rose/30 to-brand-fuchsia/30 text-rose-200 ring-1 ring-white/10">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/70">{description}</p>
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 ring-2 ring-brand-rose/40 transition group-hover:opacity-100" />
    </div>
  );
}

export default function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-24 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-brand-rose/10 blur-[120px]" />
          <div className="absolute right-0 top-1/3 h-[520px] w-[520px] translate-x-1/4 rounded-full bg-brand-fuchsia/10 blur-[100px]" />
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-28 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300/80">
              Dominate the competition
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white md:text-6xl">
              Unleash Your <GradientText>True Gaming</GradientText> Potential
            </h1>
            <p className="mt-6 max-w-xl text-white/70">
              Undetectable by anti-cheat systems, consistently reliable during intense matches, and rigorously updated to maintain perfect
              compatibility with the latest game versions.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-rose to-brand-fuchsia px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_rgb(217,70,239,0.35)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-brand-rose/60"
              >
                Unlock Access
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Decorative schematic on the right */}
          <div className="relative hidden lg:block">
            <svg viewBox="0 0 640 420" className="h-full w-full" aria-hidden>
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="rgb(244 63 94 / 0.6)" />
                  <stop offset="100%" stopColor="rgb(217 70 239 / 0.6)" />
                </linearGradient>
              </defs>
              <g stroke="url(#g1)" strokeWidth="2" opacity="0.7">
                <path d="M20 60h120v80h120v-40h120v120h120" fill="none" />
                <circle cx="20" cy="60" r="4" />
                <circle cx="140" cy="60" r="4" />
                <circle cx="260" cy="140" r="4" />
                <circle cx="380" cy="100" r="4" />
                <circle cx="500" cy="220" r="4" />
              </g>
              <g opacity="0.85">
                <rect x="480" y="260" width="120" height="120" rx="16" className="fill-white/3 stroke-white/10" />
                <g fill="white">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <rect key={i} x={500 + ((i % 3) * 32)} y={280 + (Math.floor(i / 3) * 32)} width="20" height="20" rx="4" className="fill-white/20" />
                  ))}
                </g>
              </g>
              <text x="444" y="82" className="fill-white/70 text-[14px]">Streaming mode</text>
              <text x="288" y="128" className="fill-white/70 text-[14px]">Kernel support</text>
              <rect x="392" y="24" width="48" height="28" rx="6" className="fill-black/40 stroke-white/15" />
              <text x="406" y="44" className="fill-white/90 text-[14px]">333</text>
            </svg>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-16 shadow-[0_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-extrabold text-white md:text-4xl">
                Designed to meet your expectations
              </h2>
              <p className="mt-4 text-white/70">
                Experience gaming dominance with our cutting‑edge features designed for competitive players.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={Eye}
                title="Enhanced Visuals"
                description="Gain superior visual effects that provide you unparalleled situational intelligence in any situation."
              />
              <FeatureCard
                icon={Target}
                title="Dominate With Aim"
                description="Tired of clicking? Turn on our undetectable aiming features and win every match."
              />
              <FeatureCard
                icon={Zap}
                title="Never‑seen exploits"
                description="Unlock access to exploits precisely developed by our team, providing unique advantages."
              />
              <FeatureCard
                icon={Shield}
                title="Always in stealth"
                description="Bypass screen‑sharing, streaming software, and anti‑cheat systems while maintaining invisibility."
              />
            </div>

            {/* Large PRISM word */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1/3 select-none text-center font-extrabold tracking-tight text-transparent">
              <span className="bg-gradient-to-t from-brand-rose/30 via-brand-fuchsia/20 to-transparent bg-clip-text text-[18vw] leading-none opacity-40">
                Prism
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
