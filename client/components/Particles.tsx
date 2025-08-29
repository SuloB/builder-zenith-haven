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

    const count = 26;
    const particles = Array.from({ length: count }).map(() => {
      const parent = canvas.parentElement!;
      const { width, height } = parent.getBoundingClientRect();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: 12 + Math.random() * 28,
        dx: (Math.random() - 0.5) * 0.6,
        dy: (Math.random() - 0.5) * 0.6,
        hue: 210 + Math.random() * 60, // blue/purple band
        alpha: 0.25 + Math.random() * 0.35,
      };
    });

    function draw() {
      const parent = canvas.parentElement!;
      const { width, height } = parent.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // motion
        p.x += p.dx;
        p.y += p.dy;
        // wrap around
        if (p.x < -p.r) p.x = width + p.r;
        if (p.x > width + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = height + p.r;
        if (p.y > height + p.r) p.y = -p.r;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 1.6);
        grad.addColorStop(0, `hsla(${p.hue}, 90%, 65%, ${p.alpha + 0.2})`);
        grad.addColorStop(1, `hsla(${p.hue + 20}, 90%, 55%, 0)`);

        ctx.fillStyle = grad as unknown as string;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

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
