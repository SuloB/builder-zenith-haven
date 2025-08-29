import { ChevronLeft, ChevronRight, Check, Star } from "lucide-react";

type Plan = { label: string; price: string };

type Game = {
  title: string;
  description: string;
  badge?: string;
  tags: string[];
  plans: Plan[];
};

const games: Game[] = [
  {
    title: "Fortnite",
    description:
      "Our Fortnite cheat provides you with the ultimate advantage in battle royale matches.",
    badge: "FREE",
    tags: ["Advanced Aimbot", "ESP", "Triggerbot", "No Recoil & Spread", "HWID Cleaner"],
    plans: [
      { label: "Daily", price: "$4.99" },
      { label: "Weekly", price: "$14.99" },
      { label: "Monthly", price: "$19.99" },
    ],
  },
  {
    title: "CS2",
    description:
      "Professional‑grade tools for competitive CS2 play with undetectable stability.",
    tags: ["Pixel‑perfect Triggerbot", "Wallhack", "Radar Hack", "Skin Changer"],
    plans: [
      { label: "Daily", price: "$2.99" },
      { label: "Weekly", price: "$7.99" },
      { label: "Monthly", price: "$5.99" },
    ],
  },
  {
    title: "DayZ",
    description:
      "Survive and thrive in the harsh world of DayZ with our comprehensive toolkit.",
    tags: ["Player & Zombie ESP", "Item ESP", "Vehicle ESP", "Screenshot Safe"],
    plans: [
      { label: "Daily", price: "$3.99" },
      { label: "Weekly", price: "$9.99" },
      { label: "Monthly", price: "$14.99" },
    ],
  },
  {
    title: "Valorant",
    description:
      "Bypass Vanguard with our advanced Valorant cheat solutions for competitive play.",
    tags: ["Numerous Aimbot", "Agent ESP", "Triggerbot", "Anti‑Report Protection"],
    plans: [
      { label: "Daily", price: "$4.99" },
      { label: "Weekly", price: "$14.99" },
      { label: "Monthly", price: "$19.99" },
    ],
  },
  {
    title: "Apex Legends",
    description:
      "Dominate the Apex Games with our toolkit for aggressive and tactical playstyles.",
    tags: ["Weapon Specific Aimbot", "Legend Specific ESP", "No Recoil & Spread", "Aim Lock Prioritization"],
    plans: [
      { label: "Daily", price: "$2.99" },
      { label: "Weekly", price: "$7.99" },
      { label: "Monthly", price: "$5.99" },
    ],
  },
  {
    title: "Call of Duty",
    description:
      "Complete dominance across all Call of Duty titles with our multi‑game solution.",
    tags: ["Adaptive Aimbot", "Customisable ESP", "Stream Safe", "Advanced UAV"],
    plans: [
      { label: "Daily", price: "$3.99" },
      { label: "Weekly", price: "$9.99" },
      { label: "Monthly", price: "$14.99" },
    ],
  },
];

function Step({ index, label, active }: { index: number; label: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={
          "grid h-8 w-8 place-items-center rounded-full text-sm font-semibold " +
          (active
            ? "bg-gradient-to-br from-brand-rose to-brand-fuchsia text-white ring-2 ring-white/20"
            : "bg-white/5 text-white/70 ring-1 ring-white/10")
        }
      >
        {index}
      </div>
      <span className={"text-sm " + (active ? "text-white" : "text-white/70")}>{label}</span>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-white/80 transition shadow-[0_0_0_rgba(0,0,0,0)] hover:ring-2 hover:ring-brand-rose/50 hover:shadow-[0_0_16px_theme(colors.brand.fuchsia/.45)]">
      <Check className="h-3.5 w-3.5 text-brand-rose" /> {children}
    </span>
  );
}

function CTAButton() {
  return (
    <div className="relative">
      <button className="w-full rounded-2xl bg-gradient-to-r from-brand-rose to-brand-fuchsia px-4 py-3 text-center text-sm font-semibold text-white ring-1 ring-white/10 transition hover:brightness-110 hover:ring-2 hover:ring-brand-rose/60 hover:shadow-[0_0_28px_theme(colors.brand.fuchsia/.55)] focus:outline-none">
        Add To The Cart
      </button>
    </div>
  );
}

function GameCard({ game }: { game: Game }) {
  return (
    <div className="relative group">
      {/* OUTER glow behind card */}
      

      {/* Card body (clipped) */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 shadow-[0_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur transition hover:bg-white/[0.04]">
        {/* top preview */}
        <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800/60 via-zinc-900/50 to-black/60">
          <div className="absolute inset-0 bg-[radial-gradient(500px_200px_at_60%_0%,theme(colors.brand.rose/.25),transparent)]" />
          {game.badge && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white ring-1 ring-white/15">
              <Star className="h-3.5 w-3.5 text-brand-rose" /> {game.badge}
            </span>
          )}
        </div>

        {/* content */}
        <div className="p-4">
          <h3 className="text-xl font-semibold text-white">{game.title}</h3>
          <p className="mt-2 text-sm text-white/70">{game.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {game.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <div className="mt-5">
            <CTAButton />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
      <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 ring-2 ring-brand-rose/40 transition group-hover:opacity-100" />
      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <section className="relative">
      {/* subtle corner lines */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-64 w-px bg-white/10" />
        <div className="absolute right-0 top-0 h-64 w-px bg-white/10" />
        <div className="absolute left-0 top-0 h-px w-full bg-white/10" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* stepper */}
        <div className="mx-auto max-w-3xl py-10">
          <div className="flex items-center justify-between text-white/80">
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-white/10 hover:bg-white/10">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-6">
              <Step index={1} label="Select Your Package" active />
              <div className="h-px w-10 bg-white/10" />
              <Step index={2} label="Additions" />
              <div className="h-px w-10 bg-white/10" />
              <Step index={3} label="Checkout" />
            </div>
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-white/10 hover:bg-white/10">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 gap-6 pb-28 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((g) => (
            <GameCard key={g.title} game={g} />
          ))}
        </div>

        {/* bottom decorative prism like in screenshots */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-brand-rose/40 via-brand-fuchsia/20 to-transparent blur-[50px]" />
          <div className="pointer-events-none select-none text-center font-extrabold tracking-tight text-transparent">
            <span className="bg-gradient-to-t from-brand-rose/30 via-brand-fuchsia/20 to-transparent bg-clip-text text-[18vw] leading-none opacity-40">
              Prism
            </span>
          </div>
          <div className="pb-10 text-center text-sm text-white/60">
            <p>made with heart © {new Date().getFullYear()}</p>
            <p className="mt-1">prism • rebla</p>
          </div>
        </div>
      </div>
    </section>
  );
}
