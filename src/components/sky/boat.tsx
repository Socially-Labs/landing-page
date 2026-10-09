"use client";

import { motion } from "motion/react";
import { useId } from "react";
import type { BoatPlacement } from "./sky-presets";

const TIDE = [0.45, 0, 0.55, 1] as const;

/**
 * The sailboat that rides the cloud sea. It sails to a new placement when the scene changes,
 * bobs and drifts while it waits, and lights a lantern at dusk and night.
 */
export function Boat({ placement, lantern }: { placement: BoatPlacement; lantern: boolean }) {
  const id = useId();
  const { x, y, size } = placement;

  return (
    <motion.div
      className="absolute"
      initial={{
        opacity: 0,
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        marginLeft: -size / 2,
        marginTop: -size * 0.9,
      }}
      animate={{
        opacity: 1,
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        marginLeft: -size / 2,
        marginTop: -size * 0.9,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4, ease: TIDE }}
    >
      <motion.svg
        viewBox="0 0 200 210"
        className="block w-full overflow-visible"
        style={{ originX: 0.5, originY: 0.88 }}
        animate={{ y: [0, -2.4, 0], rotate: [-0.7, 0.7, -0.7], x: [-8, 8, -8] }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 7.4, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 24, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <defs>
          <linearGradient id={`${id}-main`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#DCE5F0" />
            <stop offset="0.5" stopColor="#F8F8F4" />
            <stop offset="1" stopColor="#FFFFFF" />
          </linearGradient>
          <linearGradient id={`${id}-jib`} x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="#D3DEEB" />
            <stop offset="1" stopColor="#F6F7F8" />
          </linearGradient>
          <radialGradient id={`${id}-lantern`}>
            <stop offset="0" stopColor="#FFD9A0" stopOpacity="0.9" />
            <stop offset="1" stopColor="#FFB45A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${id}-mist`}>
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="96" cy="188" rx="104" ry="16" fill={`url(#${id}-mist)`} />
        <path d="M100 16 L127 21 L100 27 Z" fill="#B8935A" />
        <line
          x1="100"
          y1="14"
          x2="100"
          y2="164"
          stroke="#182B43"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M104 26 C 130 62, 146 112, 151 156 L 104 156 Z"
          fill={`url(#${id}-main)`}
          stroke="#C3D0DF"
          strokeWidth="0.8"
        />
        <path d="M104 72 L 136 72 M104 114 L 147 114" stroke="#D3DCE8" strokeWidth="0.8" />
        <path
          d="M96 32 C 76 72, 60 114, 52 154 L 96 154 Z"
          fill={`url(#${id}-jib)`}
          stroke="#C3D0DF"
          strokeWidth="0.8"
        />
        <line
          x1="100"
          y1="159"
          x2="156"
          y2="159"
          stroke="#182B43"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <line
          x1="14"
          y1="158"
          x2="-6"
          y2="151"
          stroke="#182B43"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M12 157 C 44 163, 124 165, 182 162 C 177 176, 161 188, 139 191 L 58 191 C 38 187, 22 173, 12 157 Z"
          fill="#182B43"
        />
        <path d="M20 166 C 60 171, 130 172, 178 169" stroke="#B8935A" strokeWidth="2" fill="none" />
        <circle cx="72" cy="179" r="2.2" fill="#B8935A" />
        <circle cx="96" cy="180" r="2.2" fill="#B8935A" />
        <circle cx="120" cy="180" r="2.2" fill="#B8935A" />
        <motion.g
          initial={false}
          animate={{ opacity: lantern ? 1 : 0 }}
          transition={{ duration: 1.2 }}
        >
          <circle cx="152" cy="148" r="28" fill={`url(#${id}-lantern)`} />
          <circle cx="152" cy="148" r="2.8" fill="#FFE2B0" />
        </motion.g>
      </motion.svg>
    </motion.div>
  );
}
