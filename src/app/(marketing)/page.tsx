// src/app/(marketing)/page.tsx
export default function ComingSoonPage() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(35,181,91,0.3),_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(12,90,47,0.35),_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen">
        <div
          className="h-full w-full animate-pulse"
          style={{
            animationDuration: "9s",
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
            filter: "blur(0.5px)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl space-y-6 text-center">
        <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-brand-100">
          Website baru segera hadir
        </div>
        <p className="text-sm uppercase tracking-[0.6em] text-white/60">Halo dari</p>
        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
          <span className="block bg-gradient-to-r from-brand-200 via-white to-brand-200 bg-clip-text text-transparent">
            TUNAS ESTA INDONESIA
          </span>
        </h1>
        <p className="text-base text-white/70 md:text-lg">
          Kami sedang memoles tampilan baru. Terima kasih sudah singgah dan tetap nantikan kabar
          resmi peluncurannya.
        </p>
      </div>
    </main>
  );
}
