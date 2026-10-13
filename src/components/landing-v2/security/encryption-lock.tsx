import { motion } from "framer-motion";

export const EncryptionLock = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-[0_0_12px_rgba(34,211,238,0.3)]">
    {/* Matrix background dashes */}
    <g className="opacity-30">
        {[...Array(6)].map((_, i) => (
          <motion.line key={i} x1={30 + i*8} y1="30" x2={30 + i*8} y2="70" stroke="#22d3ee" strokeWidth="1" strokeDasharray="2 4"
            animate={{ strokeDashoffset: active ? [0, -20] : 0 }}
            transition={{ duration: 1 + i*0.2, repeat: Infinity, ease: "linear" }}
          />
        ))}
    </g>
    {/* Centered Lock Shackle */}
    <motion.path
      d="M35 45 V 30 C35 20 65 20 65 30 V 45"
      fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"
      animate={{ d: active ? "M35 45 V 30 C35 20 65 20 65 30 V 45" : "M35 45 V 37 C35 27 65 27 65 37 V 45" }}
      transition={{ duration: 0.3 }}
    />
    {/* Centered Lock Body */}
    <motion.rect
      x="25" y="45" width="50" height="40" rx="8"
      fill="rgba(34,211,238,0.05)" stroke="#22d3ee" strokeWidth="2"
      animate={{ fill: active ? "rgba(34,211,238,0.2)" : "rgba(34,211,238,0.05)" }}
    />
    <circle cx="50" cy="60" r="4" fill="#fff" />
    <path d="M49 64 L49 75 L51 75 L51 64 Z" fill="#fff" />
  </svg>
);
