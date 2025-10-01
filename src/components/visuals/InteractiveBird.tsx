"use client";

import { useEffect, useRef, useCallback } from "react";

/** ---- Types (export supaya bisa dipakai di page jika perlu) ---- */
export type SequenceKey =
  | "FLY_FLAP"
  | "FLY_GLIDE"
  | "FLEE_FLAP"
  | "LAND"
  | "TAKEOFF"
  | "PERCH_IDLE"
  | "PERCH_LOOK_L"
  | "PERCH_LOOK_R"
  | "PERCH_PREEN"
  | "PERCH_PECK"
  | "SEARCH_GLIDE";

export type AnimationSequence = {
  row: number;      // baris di sprite sheet (0-based)
  frames: number;   // jumlah kolom aktif
  fps: number;      // frame per detik
  loop?: boolean;   // default true
};

export type AnimationMap = Partial<Record<SequenceKey, AnimationSequence>> & {
  // minimal wajib ada
  FLY_FLAP: AnimationSequence;
  PERCH_IDLE: AnimationSequence;
  FLEE_FLAP: AnimationSequence;
};

type BirdStatus = "FLYING" | "SEARCHING" | "APPROACHING" | "PERCHED" | "FLEEING";

type Props = {
  spriteSheetSrc: string;
  spriteCols: number;
  spriteRows: number;
  animationMap: AnimationMap;
  birdSize?: number;
  flySpeed?: number;
  mouseRepelDistance?: number;
  perchSelectors?: string[];
};

type BirdState = {
  pos: { x: number; y: number };
  vel: { x: number; y: number };
  angle: number;
  dir: number; // 1 = kiri, -1 = kanan
  state: BirdStatus;

  seqKey: SequenceKey;
  seqTimer: number;
  seqFrame: number;
  seqOneShotNext?: SequenceKey;

  nextIdleAt: number;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const angleLerp = (a: number, b: number, t: number) => {
  let d = b - a;
  if (d > Math.PI) d -= 2 * Math.PI;
  if (d < -Math.PI) d += 2 * Math.PI;
  return a + d * t;
};

export default function InteractiveBird({
  spriteSheetSrc,
  spriteCols,
  spriteRows,
  animationMap,
  birdSize = 85,
  flySpeed = 180,
  mouseRepelDistance = 120,
  perchSelectors = ["h1", "h2", ".perch-spot"],
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const birdRef = useRef<BirdState | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const frameSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const lastTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const perchPtsRef = useRef<{ x: number; y: number }[]>([]);
  const targetPerchRef = useRef<{ x: number; y: number } | null>(null);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const timersRef = useRef<{ stateChange: number; flee: number }>({ stateChange: 0, flee: 0 });

  const scanPerch = useCallback(() => {
    const list: { x: number; y: number }[] = [];
    const sel = perchSelectors.join(", ");
    if (!sel) return;
    document.querySelectorAll(sel).forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > birdSize) list.push({ x: r.left + r.width / 2, y: r.top - 10 });
    });
    perchPtsRef.current = list;
  }, [perchSelectors, birdSize]);

  const play = (key: SequenceKey, oneShotNext?: SequenceKey) => {
    const bird = birdRef.current!;
    bird.seqKey = key;
    bird.seqTimer = 0;
    bird.seqFrame = 0;
    bird.seqOneShotNext = oneShotNext;
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let cancelled = false;

    const setup = () => {
      const pr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = window.innerWidth * pr;
      canvas.height = window.innerHeight * pr;
      ctx.setTransform(pr, 0, 0, pr, 0, 0);

      birdRef.current = {
        pos: { x: window.innerWidth * 0.8, y: window.innerHeight * 0.25 },
        vel: { x: -flySpeed, y: (Math.random() - 0.5) * flySpeed * 0.5 },
        angle: 0,
        dir: 1,
        state: "FLYING",
        seqKey: "FLY_FLAP",
        seqTimer: 0,
        seqFrame: 0,
        nextIdleAt: 0,
      };
      timersRef.current.stateChange = Date.now() + 4000;
    };

    const tick = (tNow: number) => {
      if (cancelled || !birdRef.current) return;
      const dt = Math.min(0.032, (tNow - lastTimeRef.current) / 1000);
      lastTimeRef.current = tNow;

      const now = Date.now();
      const bird = birdRef.current;

      // --- State Machine ---
      const md = Math.hypot(bird.pos.x - mousePosRef.current.x, bird.pos.y - mousePosRef.current.y);
      if (md < mouseRepelDistance && bird.state !== "FLEEING") {
        bird.state = "FLEEING";
        play("FLEE_FLAP");
        timersRef.current.flee = now + 2000;
      }

      switch (bird.state) {
        case "FLYING": {
          if (now > timersRef.current.stateChange) bird.state = "SEARCHING";
          bird.vel.x += (Math.random() - 0.5) * 80 * dt;
          bird.vel.y += (Math.random() - 0.5) * 60 * dt;
          if (animationMap.FLY_GLIDE && Math.random() < 0.005) play("FLY_GLIDE");
          break;
        }
        case "SEARCHING": {
          bird.vel.x += (Math.random() - 0.5) * 50 * dt;
          bird.vel.y += (Math.random() - 0.5) * 40 * dt;
          // cari perch terdekat (tanpa sort)
          let best: { x: number; y: number } | null = null;
          let bestD = Infinity;
          for (const p of perchPtsRef.current) {
            const d = (p.x - bird.pos.x) ** 2 + (p.y - bird.pos.y) ** 2;
            if (d < bestD) { bestD = d; best = p; }
          }
          if (best) {
            targetPerchRef.current = best;
            bird.state = "APPROACHING";
            if (bird.seqKey !== "FLY_FLAP") play("FLY_FLAP");
          } else {
            bird.state = "FLYING";
            timersRef.current.stateChange = now + 5000;
          }
          break;
        }
        case "APPROACHING": {
          const tp = targetPerchRef.current;
          if (!tp) { bird.state = "SEARCHING"; break; }
          const dx = tp.x - bird.pos.x;
          const dy = tp.y - bird.pos.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 40 && animationMap.LAND) {
            play("LAND", "PERCH_IDLE");
            bird.state = "PERCHED";
            bird.vel.x = 0; bird.vel.y = 0;
            bird.nextIdleAt = now + 800;
          } else if (dist < 15) {
            bird.state = "PERCHED";
            bird.vel.x = 0; bird.vel.y = 0;
            play("PERCH_IDLE");
            bird.nextIdleAt = now + 800;
          } else {
            const mag = Math.max(1, dist);
            const spd = Math.min(flySpeed * 1.2, Math.max(flySpeed * 0.3, dist * 1.5));
            const f = dist < 50 ? 0.15 : 0.08;
            bird.vel.x = lerp(bird.vel.x, (dx / mag) * spd, f);
            bird.vel.y = lerp(bird.vel.y, (dy / mag) * spd, f);
            if (bird.seqKey !== "FLY_FLAP") play("FLY_FLAP");
          }
          break;
        }
        case "PERCHED": {
          if (targetPerchRef.current) {
            bird.pos.x = lerp(bird.pos.x, targetPerchRef.current.x, 0.2);
            bird.pos.y = lerp(bird.pos.y, targetPerchRef.current.y, 0.2);
          }
          bird.vel.x = 0; bird.vel.y = 0;

          if (now > bird.nextIdleAt) {
            const picks = [
              "PERCH_IDLE",
              animationMap.PERCH_LOOK_L && "PERCH_LOOK_L",
              animationMap.PERCH_LOOK_R && "PERCH_LOOK_R",
              animationMap.PERCH_PREEN && "PERCH_PREEN",
              animationMap.PERCH_PECK && "PERCH_PECK",
            ].filter(Boolean) as SequenceKey[];
            const next = picks[Math.floor(Math.random() * picks.length)] || "PERCH_IDLE";
            const oneShot = next !== "PERCH_IDLE";
            play(next, oneShot ? "PERCH_IDLE" : undefined);
            bird.nextIdleAt = now + (oneShot ? 1200 : 2000 + Math.random() * 2000);
          }

          if (Math.random() < 0.0015) {
            if (animationMap.TAKEOFF) play("TAKEOFF", "FLY_FLAP"); else play("FLY_FLAP");
            bird.state = "FLYING";
            targetPerchRef.current = null;
            const d = Math.random() > 0.5 ? 1 : -1;
            bird.vel = { x: d * flySpeed * 0.7, y: -flySpeed * 0.8 };
            timersRef.current.stateChange = now + (4000 + Math.random() * 4000);
          }
          break;
        }
        case "FLEEING": {
          const ang = Math.atan2(bird.pos.y - mousePosRef.current.y, bird.pos.x - mousePosRef.current.x);
          bird.vel.x = lerp(bird.vel.x, Math.cos(ang) * flySpeed * 2.5, 0.15);
          bird.vel.y = lerp(bird.vel.y, Math.sin(ang) * flySpeed * 2.5, 0.15);
          if (bird.seqKey !== "FLEE_FLAP") play("FLEE_FLAP");
          if (now > timersRef.current.flee) {
            bird.state = "FLYING";
            timersRef.current.stateChange = now + 5000;
            play("FLY_FLAP");
          }
          break;
        }
      }

      // limit kecepatan
      const sp = Math.hypot(bird.vel.x, bird.vel.y);
      const maxSp = bird.state === "FLEEING" ? flySpeed * 2.5 : flySpeed * 1.2;
      if (sp > maxSp) {
        bird.vel.x = (bird.vel.x / sp) * maxSp;
        bird.vel.y = (bird.vel.y / sp) * maxSp;
      }

      // posisi + pantulan
      bird.pos.x += bird.vel.x * dt;
      bird.pos.y += bird.vel.y * dt;
      if (bird.pos.x < birdSize) bird.vel.x = Math.abs(bird.vel.x);
      if (bird.pos.x > window.innerWidth - birdSize) bird.vel.x = -Math.abs(bird.vel.x);
      if (bird.pos.y < birdSize) bird.vel.y = Math.abs(bird.vel.y);
      if (bird.pos.y > window.innerHeight - birdSize) bird.vel.y = -Math.abs(bird.vel.y);

      // orientasi & angle
      if (bird.state !== "PERCHED") {
        const targetDir = bird.vel.x > 0 ? -1 : 1; // kanan = -1 (sprite default kiri)
        bird.dir = lerp(bird.dir, targetDir, 0.25);
      }
      const flip = bird.dir >= 0 ? 1 : -1;
      const targetAngle = bird.state !== "PERCHED" ? (bird.vel.y / flySpeed) * 0.4 * flip : 0;
      bird.angle = angleLerp(bird.angle, targetAngle, 0.1);

      // advance sequence
      const seq = animationMap[bird.seqKey]!;
      const loop = seq.loop ?? true;
      bird.seqTimer += dt;
      if (bird.seqTimer >= 1 / seq.fps) {
        bird.seqTimer = 0;
        bird.seqFrame++;
        if (bird.seqFrame >= seq.frames) {
          if (loop) {
            bird.seqFrame = 0;
          } else {
            bird.seqFrame = seq.frames - 1;
            if (bird.seqOneShotNext) play(bird.seqOneShotNext);
          }
        }
      }

      // render
      const img = imgRef.current;
      if (img) {
        const f = frameSizeRef.current;
        const w = birdSize;
        const h = birdSize * (f.h / f.w);
        const col = Math.min(seq.frames - 1, bird.seqFrame);
        const row = seq.row;

        const ctx = canvas.getContext("2d")!;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(bird.pos.x, bird.pos.y);
        ctx.scale(flip, 1);
        ctx.rotate(bird.angle);
        ctx.drawImage(
          img,
          col * f.w, row * f.h,
          f.w, f.h,
          -w / 2, -h / 2,
          w, h
        );
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    // load sprite
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      frameSizeRef.current = {
        w: img.naturalWidth / spriteCols,
        h: img.naturalHeight / spriteRows,
      };
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setup();
      scanPerch();
      lastTimeRef.current = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    };
    img.src = spriteSheetSrc;

    const onMove = (e: MouseEvent) => (mousePosRef.current = { x: e.clientX, y: e.clientY });
    const onResize = () => { setup(); scanPerch(); };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    const interval = setInterval(scanPerch, 2000);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      clearInterval(interval);
    };
  }, [spriteSheetSrc, spriteCols, spriteRows, animationMap, birdSize, flySpeed, mouseRepelDistance, perchSelectors, scanPerch]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
