"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Jumlah objek yang disimulasikan */
  count?: number;
  /** Skala ukuran objek (px). Jika menggunakan gambar, ini akan menjadi tingginya. */
  size?: number;
  /** Kecepatan maksimal (px/detik) */
  maxSpeed?: number;
  /** Kekuatan belok maksimal (lebih kecil = belok lebih halus) */
  maxForce?: number;
  /** Warna objek (jika tidak menggunakan gambar) */
  color?: string;
  /** URL gambar untuk objek. Jika null, akan menggambar bentuk default. */
  imgSrc?: string | null;
  /** Apakah objek menghindari kursor mouse */
  repelMouse?: boolean;
  /** Radius pengaruh kursor (px) */
  mouseRadius?: number;
  /** Durasi efek "scatter" saat diklik (ms) */
  scatterMs?: number;
  /** Opasitas global (0..1) */
  opacity?: number;
  /** Tingkat motion blur (0=tidak ada, 1=maksimal). Latar belakang harus gelap. */
  motionBlurAmount?: number;
  /** Warna efek cahaya di sekitar objek (contoh: '#FFFFFF'). Null untuk mematikan. */
  glowColor?: string | null;
  /** Warna latar belakang canvas untuk efek blur yang benar */
  backgroundColor?: string;
};

type Vec = { x: number; y: number };

type Bird = {
  pos: Vec;
  vel: Vec;
  acc: Vec;
  // Properti unik untuk setiap burung agar lebih organik
  uniqueMaxSpeed: number;
  uniqueSize: number;
};

export default function FlyingBirdsCanvas({
  count = 35,
  size = 16,
  maxSpeed = 220, // Kecepatan ditingkatkan
  maxForce = 5.0,
  color = "#FFFFFF",
  imgSrc = null,
  repelMouse = true,
  mouseRadius = 150,
  scatterMs = 800,
  opacity = 1.0,
  motionBlurAmount = 0.15,
  glowColor = "#FFFFFF",
  backgroundColor = "rgba(4, 120, 87, 1)", // Warna hijau default
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const birdsRef = useRef<Bird[]>([]);
  const mouseRef = useRef<{ x: number; y: number; scatterUntil: number } | null>(null);
  const boundsRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const lastTimeRef = useRef<number>(0);

  // Helper Vector Functions
  const limit = (v: Vec, max: number) => {
    const mSq = v.x * v.x + v.y * v.y;
    if (mSq > max * max) {
      const m = Math.sqrt(mSq);
      v.x = (v.x / m) * max;
      v.y = (v.y / m) * max;
    }
  };
  const sub = (a: Vec, b: Vec): Vec => ({ x: a.x - b.x, y: a.y - b.y });
  const add = (a: Vec, b: Vec): Vec => ({ x: a.x + b.x, y: a.y + b.y });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setup = () => {
      const pr = Math.max(1, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * pr;
      canvas.height = rect.height * pr;
      ctx.setTransform(pr, 0, 0, pr, 0, 0);
      boundsRef.current = { w: rect.width, h: rect.height };

      birdsRef.current = Array.from({ length: count }).map(() => ({
        pos: { x: Math.random() * rect.width, y: Math.random() * rect.height },
        vel: { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 },
        acc: { x: 0, y: 0 },
        uniqueMaxSpeed: maxSpeed * (0.8 + Math.random() * 0.4), // Variasi kecepatan -+20%
        uniqueSize: size * (0.9 + Math.random() * 0.2), // Variasi ukuran -+10%
      }));
    };

    const tick = (currentTime: number) => {
      const dt = Math.min(0.032, (currentTime - (lastTimeRef.current || currentTime)) / 1000);
      lastTimeRef.current = currentTime;
      const { w, h } = boundsRef.current;

      // --- Efek Motion Blur ---
      ctx.globalAlpha = 1;
      // Gunakan backgroundColor dari props untuk motion blur
      const bgColorParts = backgroundColor.match(/\d+/g) || ["4", "120", "87"];
      const [r, g, b] = bgColorParts.map(Number);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${1 - Math.pow(1 - motionBlurAmount, 60 * dt)})`;
      ctx.fillRect(0, 0, w, h);

      const m = mouseRef.current;
      const now = performance.now();

      const neighDistSq = 70 * 70;
      const sepDistSq = 28 * 28;
      const alignWeight = 1.0, cohWeight = 0.8, sepWeight = 1.6;
      const boundaryMargin = 80, boundaryForce = 250;

      for (const me of birdsRef.current) {
        me.acc = { x: 0, y: 0 };
        let neighborCount = 0;
        const avgVel = { x: 0, y: 0 }, center = { x: 0, y: 0 }, separation = { x: 0, y: 0 };

        for (const other of birdsRef.current) {
          if (me === other) continue;
          const dSq = (other.pos.x - me.pos.x) ** 2 + (other.pos.y - me.pos.y) ** 2;
          if (dSq < neighDistSq) {
            neighborCount++;
            avgVel.x += other.vel.x; avgVel.y += other.vel.y;
            center.x += other.pos.x; center.y += other.pos.y;
            if (dSq < sepDistSq) {
              separation.x -= other.pos.x - me.pos.x;
              separation.y -= other.pos.y - me.pos.y;
            }
          }
        }

        if (neighborCount > 0) {
          avgVel.x /= neighborCount; avgVel.y /= neighborCount;
          limit(avgVel, me.uniqueMaxSpeed);
          const steerAlign = sub(avgVel, me.vel);
          limit(steerAlign, maxForce);
          steerAlign.x *= alignWeight; steerAlign.y *= alignWeight;
          me.acc = add(me.acc, steerAlign);

          center.x /= neighborCount; center.y /= neighborCount;
          const desired = sub(center, me.pos);
          limit(desired, me.uniqueMaxSpeed);
          const steerCoh = sub(desired, me.vel);
          limit(steerCoh, maxForce);
          steerCoh.x *= cohWeight; steerCoh.y *= cohWeight;
          me.acc = add(me.acc, steerCoh);

          limit(separation, me.uniqueMaxSpeed);
          const steerSep = sub(separation, me.vel);
          limit(steerSep, maxForce);
          steerSep.x *= sepWeight; steerSep.y *= sepWeight;
          me.acc = add(me.acc, steerSep);
        }

        if (me.pos.x < boundaryMargin) me.acc.x += boundaryForce;
        if (me.pos.x > w - boundaryMargin) me.acc.x -= boundaryForce;
        if (me.pos.y < boundaryMargin) me.acc.y += boundaryForce;
        if (me.pos.y > h - boundaryMargin) me.acc.y -= boundaryForce;
        
        // --- Interaksi Mouse yang Lebih Kuat ---
        if (m && repelMouse) {
          const dmx = me.pos.x - m.x;
          const dmy = me.pos.y - m.y;
          const d = Math.hypot(dmx, dmy) || 1;
          if (d < mouseRadius) {
            const f = ((mouseRadius - d) / mouseRadius) * 600; // Kekuatan repel ditingkatkan
            me.acc.x += (dmx / d) * f;
            me.acc.y += (dmy / d) * f;
          }
          if (now < m.scatterUntil) {
            me.acc.x += (Math.random() - 0.5) * 100;
            me.acc.y += (Math.random() - 0.5) * 100;
          }
        }

        me.vel.x += me.acc.x * dt;
        me.vel.y += me.acc.y * dt;
        limit(me.vel, me.uniqueMaxSpeed);
        me.pos.x += me.vel.x * dt;
        me.pos.y += me.vel.y * dt;

        if (me.pos.x < -20) me.pos.x = w + 20;
        if (me.pos.x > w + 20) me.pos.x = -20;
        if (me.pos.y < -20) me.pos.y = h + 20;
        if (me.pos.y > h + 20) me.pos.y = -20;

        const angle = Math.atan2(me.vel.y, me.vel.x);
        ctx.save();
        ctx.translate(me.pos.x, me.pos.y);
        ctx.rotate(angle);
        ctx.globalAlpha = opacity;
        
        // --- Efek Glow ---
        if (glowColor) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = glowColor;
        }

        if (imageRef.current) {
          const img = imageRef.current;
          const h = me.uniqueSize;
          const w = h * (img.naturalWidth / img.naturalHeight);
          ctx.drawImage(img, -w / 2, -h / 2, w, h);
        } else {
          const l = me.uniqueSize;
          const wing = l * 0.5;
          ctx.beginPath();
          ctx.moveTo(l * 0.6, 0);
          ctx.lineTo(-l * 0.4, wing);
          ctx.lineTo(-l * 0.2, 0);
          ctx.lineTo(-l * 0.4, -wing);
          ctx.closePath();
          ctx.fillStyle = color;
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId.current = requestAnimationFrame(tick);
    };

    const onResize = () => setup();
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left, y: e.clientY - rect.top,
        scatterUntil: mouseRef.current?.scatterUntil ?? 0,
      };
    };
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      mouseRef.current = { x, y, scatterUntil: performance.now() + scatterMs };
      birdsRef.current.forEach(b => {
        const pushForce = 6 * maxSpeed; // Kekuatan dorong klik ditingkatkan
        const away = sub(b.pos, { x, y });
        const d = Math.hypot(away.x, away.y) || 1;
        if (d < mouseRadius * 1.5) {
          b.vel.x += (away.x / d) * pushForce * 0.2;
          b.vel.y += (away.y / d) * pushForce * 0.2;
        }
      });
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    const startAnimation = () => {
      setup();
      lastTimeRef.current = performance.now();
      animationFrameId.current = requestAnimationFrame(tick);
    };

    if (imgSrc) {
      const img = new Image();
      img.onload = () => { imageRef.current = img; startAnimation(); };
      img.onerror = () => { console.error("Gagal memuat gambar."); imageRef.current = null; startAnimation(); };
      img.src = imgSrc;
    } else {
      imageRef.current = null;
      startAnimation();
    }

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
    };
  }, [count, size, maxSpeed, maxForce, color, imgSrc, repelMouse, mouseRadius, scatterMs, opacity, motionBlurAmount, glowColor, backgroundColor]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none", background: backgroundColor }} />;
}

