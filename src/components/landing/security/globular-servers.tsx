import { motion } from "framer-motion";

export const GlobularServers = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-[0_0_12px_rgba(34,211,238,0.3)]">
    {/* Symmetrical Globe Wireframe */}
    <motion.circle cx="50" cy="50" r="35" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" />
    <motion.ellipse cx="50" cy="50" rx="35" ry="15" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" 
      animate={{ rx: active ? [35, 5, 35] : 35 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
    <motion.ellipse cx="50" cy="50" rx="15" ry="35" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" 
      animate={{ rx: active ? [15, 35, 15] : 15 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
    
    {/* Perfectly Centered Server Racks */}
    <g transform="translate(25, 22)">
      {[0, 18, 36].map((y, i) => (
        <motion.g key={y} animate={{ y: active ? [0, -2, 0] : 0 }} transition={{ duration: 2, delay: i*0.2, repeat: Infinity }}>
          <rect x="0" y={y} width="50" height="12" rx="3" fill="#0A0A0A" stroke="#22d3ee" strokeWidth="1.5" />
          <motion.circle cx="10" cy={y+6} r="2" fill="#fff" animate={{ opacity: active ? [1, 0.2, 1] : 0.5 }} transition={{ duration: 0.5 + i*0.3, repeat: Infinity }} />
          <motion.circle cx="18" cy={y+6} r="2" fill="#22d3ee" animate={{ opacity: active ? [1, 0, 1] : 0.5 }} transition={{ duration: 0.8 + i*0.1, repeat: Infinity }} />
        </motion.g>
      ))}
    </g>
  </svg>
);
