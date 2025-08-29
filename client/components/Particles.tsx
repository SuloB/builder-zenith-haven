import { useEffect, useRef } from "react";

type Props = { className?: string };

export default function Particles({ className }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let raf = 0;

    function resize() {
      const parent = canvas.parentElement!;
      const { width, height } = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    const count = 24;
    const particles = Array.from({ length: count }).map(() => {
      const parent = canvas.parentElement!;
      const { width, height } = parent.getBoundingClientRect();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: 14 + Math.random() * 26,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        hue: 265 + Math.random() * 30, // purple band
        alpha: 0.2 + Math.random() * 0.35,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.005,
      } as any;
    });

    function draw() {
      const parent = canvas.parentElement!;
      const { width, height } = parent.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      // additive glow for chrome feel
      ctx.globalCompositeOperation = "lighter";

      for (const p of particles as any[]) {
        // motion
        p.x += p.dx;
        p.y += p.dy;
        p.rot += p.rotSpeed;
        // wrap around
        if (p.x < -p.r) p.x = width + p.r;
        if (p.x > width + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = height + p.r;
        if (p.y > height + p.r) p.y = -p.r;

        // base chrome orb
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 1.6);
        g.addColorStop(0.0, `hsla(${p.hue}, 90%, 90%, ${p.alpha})`);
        g.addColorStop(0.15, `hsla(${p.hue + 10}, 95%, 75%, ${p.alpha})`);
        g.addColorStop(0.35, `hsla(${p.hue + 15}, 85%, 60%, ${p.alpha * 0.8})`);
        g.addColorStop(0.6, `hsla(${p.hue + 20}, 80%, 45%, ${p.alpha * 0.5})`);
        g.addColorStop(1.0, `hsla(${p.hue + 25}, 80%, 40%, 0)`);

        ctx.fillStyle = g as unknown as string;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // specular dot
        const sx = p.x - p.r * 0.35;
        const sy = p.y - p.r * 0.35;
        const sgrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, p.r * 0.7);
        sgrad.addColorStop(0, `rgba(255,255,255,0.9)`);
        sgrad.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.fillStyle = sgrad as unknown as string;
        ctx.beginPath();
        ctx.arc(sx, sy, p.r * 0.7, 0, Math.PI * 2);
        ctx.fill();

        // glossy reflection stripe
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.clip();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        const lg = ctx.createLinearGradient(-p.r, 0, p.r, 0);
        lg.addColorStop(0.45, "rgba(255,255,255,0)");
        lg.addColorStop(0.5, "rgba(255,255,255,0.45)");
        lg.addColorStop(0.55, "rgba(255,255,255,0)");
        ctx.fillStyle = lg as unknown as string;
        ctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 2);
        ctx.restore();

        // rim light
        ctx.strokeStyle = `hsla(${p.hue + 10}, 90%, 70%, ${Math.min(0.5, p.alpha + 0.2)})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r - 0.5, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "source-over";

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={ref} className="h-full w-full" />
    </div>
  );
}
