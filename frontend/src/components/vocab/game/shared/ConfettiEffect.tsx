"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
}

export default function ConfettiEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    const colors = ["#F59E0B", "#10B981", "#3B82F6", "#EC4899", "#8B5CF6", "#EF4444"];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Khởi tạo các mảnh confetti
    const createParticles = () => {
      const pCount = 150;
      for (let i = 0; i < pCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height - 20,
          size: Math.random() * 8 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: Math.random() * 4 - 2,
          speedY: Math.random() * 5 + 4,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 4 - 2,
        });
      }
    };
    createParticles();

    // Vòng lặp vẽ và cập nhật
    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y / 30) * 0.8 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y < canvas.height) {
          alive = true;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        // Vẽ xen kẽ hình vuông và hình tròn
        if (p.size % 2 === 0) {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      if (alive) {
        animationFrameId = requestAnimationFrame(update);
      }
    };

    update();

    // Hủy bỏ sau 5 giây để giải phóng tài nguyên
    const timeoutId = setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 5000);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-9999"
    />
  );
}
