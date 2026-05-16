"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  maxOpacity?: number;
  className?: string;
}

function resolveColor(color: string): { r: number; g: number; b: number } {
  if (typeof document === "undefined") return { r: 0, g: 0, b: 0 };

  const el = document.createElement("div");
  el.style.color = color;
  document.body.appendChild(el);
  const computed = getComputedStyle(el).color;
  document.body.removeChild(el);

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return { r: 0, g: 0, b: 0 };

  ctx.fillStyle = computed;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return { r, g, b };
}

export function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "var(--color-primary)",
  maxOpacity = 0.3,
  className,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const resolvedColorRef = useRef<{ r: number; g: number; b: number }>({ r: 0, g: 0, b: 0 });

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    },
    []
  );

  useEffect(() => {
    const resolve = () => {
      resolvedColorRef.current = resolveColor(color);

      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        resolvedColorRef.current = resolveColor("var(--color-primary-foreground)");
      }
    };

    resolve();

    const observer = new MutationObserver(() => {
      resolve();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [color]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    setupCanvas(canvas, dimensions.width, dimensions.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cols = Math.ceil(dimensions.width / (squareSize + gridGap));
    const rows = Math.ceil(dimensions.height / (squareSize + gridGap));
    const squares = Array.from({ length: cols * rows }, () => Math.random() * maxOpacity);

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      const { r, g, b } = resolvedColorRef.current;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const index = i * rows + j;
          if (Math.random() < flickerChance) {
            squares[index] = Math.random() * maxOpacity;
          }
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${squares[index]})`;
          const x = i * (squareSize + gridGap);
          const y = j * (squareSize + gridGap);
          ctx.fillRect(x, y, squareSize, squareSize);
        }
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [dimensions, squareSize, gridGap, flickerChance, maxOpacity, setupCanvas]);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
