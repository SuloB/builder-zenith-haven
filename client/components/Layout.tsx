import { Link, NavLink, Outlet } from "react-router-dom";
import { useMemo } from "react";

function BrandMark() {
  return (
    <Link to="/" aria-label="Prism" className="inline-flex items-center gap-2">
      <span className="relative grid place-items-center h-8 w-8 rounded-full bg-gradient-to-br from-brand-rose to-brand-fuchsia shadow-[0_0_40px_theme(colors.brand.rose/.35)]">
        <span className="absolute inset-0 rounded-full ring-1 ring-white/15" />
        <span className="font-extrabold text-white">P</span>
      </span>
      <span className="sr-only sm:not-sr-only sm:font-semibold sm:text-white">Prism</span>
    </Link>
  );
}

const links = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/shop", label: "Shop" },
  { to: "/status", label: "Status" },
];

export default function Layout() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen text-white bg-[radial-gradient(1000px_500px_at_70%_20%,rgba(244,63,94,0.18),transparent),radial-gradient(800px_400px_at_80%_70%,rgba(217,70,239,0.15),transparent),linear-gradient(180deg,hsl(var(--background)),hsl(var(--background)))]">
      {/* top gradient edge */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-[480px] w-[480px] rounded-full bg-brand-rose/20 blur-[100px]" />
        <div className="absolute top-40 -right-24 h-[420px] w-[420px] rounded-full bg-brand-fuchsia/20 blur-[90px]" />
      </div>

      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/20 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <BrandMark />
          <nav className="hidden md:flex items-center gap-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive ? "bg-white/10 text-white" : "text-white/80 hover:text-white hover:bg-white/10"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                `hidden sm:inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/90 transition-colors ${
                  isActive ? "bg-white/10" : "hover:bg-white/10"
                }`
              }
            >
              Sign in
              <span aria-hidden>›</span>
            </NavLink>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="relative mt-24">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-rose-600/40 via-fuchsia-600/20 to-transparent blur-[60px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 pt-24">
          <div className="text-center text-sm text-white/60">
            <p>made with heart © {year}</p>
            <p className="mt-1">prism • rebla</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
