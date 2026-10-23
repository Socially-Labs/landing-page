"use client";

import { useEffect, useRef } from "react";

/** Original, pointer-responsive caustics, rendered without video or remote assets. */
export function TidalBackground({ quiet = false }: { quiet?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const context = element.getContext("2d");
    if (!context) return;
    const host = element.parentElement!.parentElement!;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0.5, y: 0.5 };
    const current = { x: 0.5, y: 0.5 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let time = 0;
    let previous = 0;

    const draw = (timestamp: number) => {
      if (!visible || document.hidden) {
        frame = 0;
        return;
      }
      const delta = previous ? Math.min(timestamp - previous, 50) : 0;
      previous = timestamp;
      if (!motion.matches) time += delta * 0.00011;
      current.x += (pointer.x - current.x) * 0.035;
      current.y += (pointer.y - current.y) * 0.035;
      context.clearRect(0, 0, width, height);
      // Broad, overlapping ribbons give the water its soft refracted light.
      for (let layer = 0; layer < 8; layer++) {
        const offset = layer * 0.68;
        const middle = height * (0.47 + layer * 0.062);
        const amplitude = height * (0.08 + layer * 0.011);
        context.beginPath();
        for (let x = -30; x <= width + 30; x += 12) {
          const normalized = x / width;
          const wave = Math.sin(normalized * 5.2 + time + offset) * amplitude;
          const cross = Math.cos(normalized * 3.4 - time * 0.7 + offset) * amplitude * 0.7;
          const response =
            Math.exp(-Math.pow((normalized - current.x) * 2.2, 2)) *
            (current.y - 0.5) *
            height *
            0.2;
          const y = middle + wave + cross + response;
          if (x === -30) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.strokeStyle = layer % 3 === 0 ? "rgba(255,255,255,0.65)" : "rgba(119,222,248,0.25)";
        context.lineWidth = 16 + layer * 7;
        context.filter = `blur(${12 + layer * 2}px)`;
        context.stroke();
        context.strokeStyle = "rgba(255,255,255,0.26)";
        context.lineWidth = 1;
        context.filter = "blur(1px)";
        context.stroke();
      }
      context.filter = "none";
      if (!motion.matches) frame = requestAnimationFrame(draw);
      else frame = 0;
    };
    const start = () => {
      if (!frame && visible && !document.hidden) {
        previous = 0;
        frame = requestAnimationFrame(draw);
      }
    };
    const resize = new ResizeObserver(() => {
      width = host.clientWidth;
      height = host.clientHeight;
      // Cap backing resolution: this is a soft decorative surface.
      const ratio = Math.min(window.devicePixelRatio, 1.5);
      element.width = Math.round(width * ratio);
      element.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      start();
    });
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    const move = (event: PointerEvent) => {
      if (motion.matches) return;
      const bounds = host.getBoundingClientRect();
      pointer.x = (event.clientX - bounds.left) / bounds.width;
      pointer.y = (event.clientY - bounds.top) / bounds.height;
    };
    const reset = () => {
      pointer.x = 0.5;
      pointer.y = 0.5;
    };
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else start();
    };
    const preference = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      start();
    };
    resize.observe(host);
    intersection.observe(host);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", reset);
    document.addEventListener("visibilitychange", visibility);
    motion.addEventListener("change", preference);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", visibility);
      motion.removeEventListener("change", preference);
    };
  }, []);

  return (
    <div className={`tidal-background${quiet ? " tidal-quiet" : ""}`} aria-hidden="true">
      <div className="tidal-light" />
      <canvas ref={canvas} />
      <svg
        className="tidal-orbits"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <ellipse cx="180" cy="-120" rx="580" ry="720" />
        <ellipse cx="1260" cy="-120" rx="580" ry="720" />
        <ellipse cx="180" cy="1130" rx="580" ry="720" />
        <ellipse cx="1260" cy="1130" rx="580" ry="720" />
      </svg>
    </div>
  );
}
