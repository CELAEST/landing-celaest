import { motion } from "framer-motion";

export const VerifiedShield = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-[0_0_12px_rgba(34,211,238,0.3)]">
    {/* Outer rotating dashed ring */}
    <motion.circle
      cx="50" cy="50" r="46" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="1" strokeDasharray="4 8"
      animate={{ rotate: active ? 360 : 0 }} transition={{ duration: active ? 10 : 30, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "center" }}
    />
    {/* Mathematically Symmetrical Shield */}
    <motion.path
      d="M 50 15 L 85 25 L 85 55 C 85 80 50 95 50 95 C 50 95 15 80 15 55 L 15 25 Z"
      fill="rgba(34,211,238,0.05)" stroke="#22d3ee" strokeWidth="2"
      animate={{ fill: active ? "rgba(34,211,238,0.15)" : "rgba(34,211,238,0.05)" }}
      transition={{ duration: 0.5 }}
    />
    {/* Symmetrical Centered Checkmark */}
    <motion.path
      d="M 33 55 L 45 67 L 67 43"
      fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: active ? 1 : 0.4 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  </svg>
);
