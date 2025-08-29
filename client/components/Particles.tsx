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
      const { width } = parent.getBoundingClientRect();
      const r = 14 + Math.random() * 26;
      const length = 60 + Math.random() * 120;
      return {
        anchorX: Math.random() * width,
        anchorY: 0,
        x: 0,
        y: 0,
        r,
        swingPhase: Math.random() * Math.PI * 2,
        swingSpeed: 0.003 + Math.random() * 0.004,
        swingAmp: 8 + Math.random() * 12,
        bobAmp: 4 + Math.random() * 6,
        length,
        hue: 265 + Math.random() * 30,
        alpha: 0.25 + Math.random() * 0.35,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.006,
        stringLen: 16 + Math.random() * 28,
      } as any;
    });

    function draw() {
      const parent = canvas.parentElement!;
      const { width, height } = parent.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      // additive glow for chrome feel
      ctx.globalCompositeOperation = "lighter";

      for (const p of particles as any[]) {
        // swing like hanging ornaments
        p.swingPhase += p.swingSpeed;
        const swingX = Math.sin(p.swingPhase) * p.swingAmp;
        const bob = Math.cos(p.swingPhase * 2) * p.bobAmp;
        p.x = p.anchorX + swingX;
        p.y = p.anchorY + p.length + bob;
        p.rot += p.rotSpeed;

        // soft bloom behind orb
        ctx.shadowColor = `hsla(${p.hue}, 95%, 70%, ${Math.min(0.6, p.alpha + 0.2)})`;
        ctx.shadowBlur = p.r * 1.5;

        // base chrome orb
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 1.6);
        g.addColorStop(0.0, `hsla(${p.hue}, 90%, 95%, ${p.alpha})`);
        g.addColorStop(0.15, `hsla(${p.hue + 10}, 95%, 80%, ${p.alpha})`);
        g.addColorStop(0.35, `hsla(${p.hue + 15}, 85%, 62%, ${p.alpha * 0.9})`);
        g.addColorStop(0.6, `hsla(${p.hue + 20}, 80%, 50%, ${p.alpha * 0.6})`);
        g.addColorStop(1.0, `hsla(${p.hue + 25}, 80%, 45%, 0)`);

        ctx.fillStyle = g as unknown as string;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // reset shadow for crisp overlays
        ctx.shadowBlur = 0;

        // specular dot
        const sx = p.x - p.r * 0.35;
        const sy = p.y - p.r * 0.35;
        const sgrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, p.r * 0.7);
        sgrad.addColorStop(0, `rgba(255,255,255,0.95)`);
        sgrad.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.fillStyle = sgrad as unknown as string;
        ctx.beginPath();
        ctx.arc(sx, sy, p.r * 0.7, 0, Math.PI * 2);
        ctx.fill();

        // rim light
        ctx.strokeStyle = `hsla(${p.hue + 10}, 90%, 75%, ${Math.min(0.7, p.alpha + 0.3)})`;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r - 0.5, 0, Math.PI * 2);
        ctx.stroke();

        // ornament cap (gold) and hanging string
        const capW = Math.max(8, p.r * 0.6);
        const capH = Math.max(5, p.r * 0.28);
        const capX = p.x - capW / 2;
        const capY = p.y - p.r - capH + 1;
        const cg = ctx.createLinearGradient(capX, capY, capX, capY + capH);
        cg.addColorStop(0, "rgba(255,240,200,0.95)");
        cg.addColorStop(1, "rgba(210,170,90,0.95)");
        ctx.fillStyle = cg as unknown as string;
        ctx.fillRect(capX, capY, capW, capH);
        ctx.strokeStyle = "rgba(255,255,255,0.4)";
        ctx.lineWidth = 0.8;
        ctx.strokeRect(capX, capY, capW, capH);
        // small ring on cap
        ctx.beginPath();
        ctx.arc(p.x, capY, 3, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,240,200,0.9)";
        ctx.lineWidth = 1;
        ctx.stroke();
        // hanging string
        ctx.beginPath();
        ctx.moveTo(p.x, capY - 0.5);
        ctx.lineTo(p.x, 8);
        ctx.strokeStyle = `rgba(255,255,255,0.35)`;
        ctx.lineWidth = 1;
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
