"use client";

import { useEffect, useRef, useCallback } from "react";

// Tipe untuk pemetaan animasi
type AnimationSequence = {
  row: number; // Baris di sprite sheet (dimulai dari 0)
  frameCount: number; // Jumlah frame dalam sekuens ini
  speed: number; // Frame per detik
};

// Mendefinisikan semua status burung yang mungkin
type BirdStatus = "FLYING" | "SEARCHING" | "APPROACHING" | "PERCHED" | "FLEEING";

// Tipe AnimationMap yang fleksibel
type AnimationMap = {
  FLYING: AnimationSequence;
  PERCHED: AnimationSequence;
  FLEEING: AnimationSequence;
  SEARCHING?: AnimationSequence; // Opsional
  APPROACHING?: AnimationSequence; // Opsional
};

// Tipe untuk properti komponen
type Props = {
  spriteSheetSrc: string;
  birdSize?: number;
  flySpeed?: number;
  mouseRepelDistance?: number;
  perchSelectors?: string[];
  spriteCols: number;
  spriteRows: number;
  animationMap: AnimationMap;
};

// PERBAIKAN: Tipe internal state diubah untuk logika orientasi baru
type BirdState = {
  pos: { x: number; y: number };
  vel: { x: number; y: number };
  angle: number; // Sekarang hanya untuk miring naik/turun
  direction: number; // 1 untuk kiri, -1 untuk kanan
  state: BirdStatus;
  animationTimer: number;
  currentFrame: number;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const angleLerp = (a: number, b: number, t: number) => {
    let delta = b - a;
    if (delta > Math.PI) delta -= 2 * Math.PI;
    if (delta < -Math.PI) delta += 2 * Math.PI;
    return a + delta * t;
};

export default function InteractiveBird({
  spriteSheetSrc,
  birdSize = 85,
  flySpeed = 180,
  mouseRepelDistance = 120,
  perchSelectors = ["h1", "h2", ".perch-spot"],
  spriteCols,
  spriteRows,
  animationMap,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const birdRef = useRef<BirdState | null>(null);
  const spriteImageRef = useRef<HTMLImageElement | null>(null);
  const spriteFrameSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const perchPointsRef = useRef<{ x: number; y: number }[]>([]);
  const targetPerchRef = useRef<{ x: number; y: number } | null>(null);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const timersRef = useRef<{ stateChange: number; flee: number }>({ stateChange: 0, flee: 0 });
  const lastTimeRef = useRef<number>(0);
  const animationFrameId = useRef<number>(0);

  const scanPerchPoints = useCallback(() => {
    const points: { x: number; y: number }[] = [];
    const selectors = perchSelectors.join(", ");
    if (!selectors) return;
    document.querySelectorAll(selectors).forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.width > birdSize) {
        points.push({ x: rect.left + rect.width / 2, y: rect.top - 10 });
      }
    });
    perchPointsRef.current = points;
  }, [perchSelectors, birdSize]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let isCancelled = false;
    
    const setup = () => {
        const pr = Math.max(1, window.devicePixelRatio || 1);
        canvas.width = window.innerWidth * pr;
        canvas.height = window.innerHeight * pr;
        ctx.setTransform(pr, 0, 0, pr, 0, 0);

        birdRef.current = {
            pos: { x: window.innerWidth * 0.8, y: window.innerHeight * 0.2 },
            vel: { x: -flySpeed, y: (Math.random() - 0.5) * flySpeed * 0.5 },
            angle: 0,
            direction: 1, // Mulai menghadap kiri (sesuai sprite)
            state: "FLYING", 
            animationTimer: 0, 
            currentFrame: 0,
        };
        timersRef.current.stateChange = Date.now() + 4000;
    };
    
    const tick = (currentTime: number) => {
      if (isCancelled || !birdRef.current) return;
      
      const dt = Math.min(0.032, (currentTime - lastTimeRef.current) / 1000);
      lastTimeRef.current = currentTime;

      const bird = birdRef.current;
      const now = Date.now();
      const prevState = bird.state;

      // --- Logika State Machine ---
      const mouseDistance = Math.hypot(bird.pos.x - mousePosRef.current.x, bird.pos.y - mousePosRef.current.y);
      if (mouseDistance < mouseRepelDistance && bird.state !== "FLEEING") {
        bird.state = "FLEEING";
        timersRef.current.flee = now + 2000;
      }

      switch (bird.state) {
        case "FLYING": if (now > timersRef.current.stateChange) bird.state = "SEARCHING"; bird.vel.x += (Math.random() - 0.5) * 200 * dt; bird.vel.y += (Math.random() - 0.5) * 200 * dt; break;
        case "SEARCHING": const closestPerch = perchPointsRef.current.sort((a, b) => Math.hypot(a.x-bird.pos.x, a.y-bird.pos.y) - Math.hypot(b.x-bird.pos.x, b.y-bird.pos.y))[0]; if (closestPerch) { targetPerchRef.current = closestPerch; bird.state = "APPROACHING"; } else { bird.state = "FLYING"; timersRef.current.stateChange = now + 5000; } break;
        case "APPROACHING": if (!targetPerchRef.current) { bird.state = "SEARCHING"; break; } const target = targetPerchRef.current; const distanceToTarget = Math.hypot(target.x - bird.pos.x, target.y - bird.pos.y); if (distanceToTarget < 10) { bird.state = "PERCHED"; bird.pos = target; timersRef.current.stateChange = now + (3000 + Math.random() * 4000); } else { const desiredVel = { x: target.x - bird.pos.x, y: target.y - bird.pos.y }; const speed = Math.min(flySpeed * 1.5, distanceToTarget * 2); const mag = Math.hypot(desiredVel.x, desiredVel.y) || 1; bird.vel.x = lerp(bird.vel.x, (desiredVel.x / mag) * speed, 0.1); bird.vel.y = lerp(bird.vel.y, (desiredVel.y / mag) * speed, 0.1); } break;
        case "PERCHED": bird.vel = { x: 0, y: 0 }; if (now > timersRef.current.stateChange) { bird.state = "FLYING"; targetPerchRef.current = null; bird.vel = { x: (Math.random()-0.5) * flySpeed, y: -flySpeed }; timersRef.current.stateChange = now + (5000 + Math.random() * 5000); } break;
        case "FLEEING": const repelAngle = Math.atan2(bird.pos.y - mousePosRef.current.y, bird.pos.x - mousePosRef.current.x); bird.vel.x = lerp(bird.vel.x, Math.cos(repelAngle) * flySpeed * 2, 0.1); bird.vel.y = lerp(bird.vel.y, Math.sin(repelAngle) * flySpeed * 2, 0.1); if (now > timersRef.current.flee) { bird.state = "FLYING"; timersRef.current.stateChange = now + 5000; } break;
      }
      
      if(bird.state !== prevState) bird.currentFrame = 0;

      // Update posisi & kecepatan
      const speed = Math.hypot(bird.vel.x, bird.vel.y);
      const maxCurrentSpeed = bird.state === 'FLEEING' ? flySpeed * 2 : flySpeed;
      if (speed > maxCurrentSpeed) { bird.vel.x = (bird.vel.x / speed) * maxCurrentSpeed; bird.vel.y = (bird.vel.y / speed) * maxCurrentSpeed; }
      bird.pos.x += bird.vel.x * dt;
      bird.pos.y += bird.vel.y * dt;
      if (bird.pos.x < birdSize) bird.vel.x = Math.abs(bird.vel.x);
      if (bird.pos.x > window.innerWidth - birdSize) bird.vel.x = -Math.abs(bird.vel.x);
      if (bird.pos.y < birdSize) bird.vel.y = Math.abs(bird.vel.y);
      if (bird.pos.y > window.innerHeight - birdSize) bird.vel.y = -Math.abs(bird.vel.y);
      
      // --- LOGIKA VISUAL & ORIENTASI BARU ---
      let anim: AnimationSequence;
      switch (bird.state) {
        case "SEARCHING": anim = animationMap.SEARCHING || animationMap.FLYING; break;
        case "APPROACHING": anim = animationMap.APPROACHING || animationMap.FLYING; break;
        default: anim = animationMap[bird.state];
      }
      
      // 1. Tentukan arah hadap horizontal (kiri/kanan)
      if (bird.state !== 'PERCHED') {
        // Arah mengikuti kecepatan horizontal
        const targetDirection = bird.vel.x > 0 ? -1 : 1; // -1 (kanan), 1 (kiri)
        bird.direction = lerp(bird.direction, targetDirection, 0.1);
      }
      
      // 2. Tentukan sudut miring (naik/turun)
      let targetAngle = 0;
      if (bird.state !== 'PERCHED') {
        // Miring sedikit berdasarkan kecepatan vertikal
        targetAngle = (bird.vel.y / flySpeed) * 0.4 * bird.direction;
      }
      bird.angle = angleLerp(bird.angle, targetAngle, 0.1);

      bird.animationTimer += dt;
      if (bird.animationTimer > 1 / anim.speed) {
        bird.currentFrame = (bird.currentFrame + 1) % anim.frameCount;
        bird.animationTimer = 0;
      }
      
      // --- Render ---
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (spriteImageRef.current) {
        const frame = spriteFrameSize.current;
        const w = birdSize;
        const h = birdSize * (frame.h / frame.w);

        const currentCol = bird.currentFrame % spriteCols;
        const currentRow = anim.row;

        ctx.save();
        ctx.translate(bird.pos.x, bird.pos.y);
        // PERBAIKAN: Gunakan scale untuk membalik sprite, lalu rotate untuk miring
        ctx.scale(bird.direction, 1);
        ctx.rotate(bird.angle);
        
        ctx.drawImage(
          spriteImageRef.current,
          currentCol * frame.w, currentRow * frame.h,
          frame.w, frame.h,
          -w / 2, -h / 2,
          w, h
        );
        ctx.restore();
      }
      animationFrameId.current = requestAnimationFrame(tick);
    };

    const img = new Image();
    img.onload = () => {
      spriteImageRef.current = img;
      spriteFrameSize.current = {
        w: img.naturalWidth / spriteCols,
        h: img.naturalHeight / spriteRows,
      };
      setup();
      scanPerchPoints();
      lastTimeRef.current = performance.now();
      animationFrameId.current = requestAnimationFrame(tick);
    };
    img.src = spriteSheetSrc;

    const onMouseMove = (e: MouseEvent) => { mousePosRef.current = { x: e.clientX, y: e.clientY }; };
    const onResize = () => { setup(); scanPerchPoints(); };
    
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    const scanInterval = setInterval(scanPerchPoints, 2000);

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      clearInterval(scanInterval);
    };
  }, [spriteSheetSrc, birdSize, flySpeed, mouseRepelDistance, perchSelectors, scanPerchPoints, spriteCols, spriteRows, animationMap]);

  return <canvas ref={canvasRef} aria-hidden style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 9999 }} />;
}

