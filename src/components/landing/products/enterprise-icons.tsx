import { motion } from "framer-motion";

export const EnterpriseEdgeIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 shrink-0 drop-shadow-[0_0_12px_rgba(34,211,238,0.2)]">
    <rect x="5" y="5" width="90" height="90" rx="20" fill={active ? "rgba(34,211,238,0.08)" : "#161616"} stroke={active ? "#22d3ee" : "rgba(255,255,255,0.06)"} strokeWidth="2" className="transition-colors duration-500" />
    {/* Micro-server racks */}
    {[30, 48, 66].map((y, i) => (
      <motion.g key={y} animate={{ y: active ? [0, -2, 0] : 0 }} transition={{ duration: 1.5, repeat: Infinity, delay: i*0.2}}>
        <rect x="25" y={y} width="50" height="10" rx="2" fill="#000" stroke={active ? "#22d3ee" : "#555"} strokeWidth="1.5" className="transition-colors duration-500" />
        <motion.circle cx="32" cy={y+5} r="2" fill="#fff" animate={{ opacity: active ? [0.2, 1, 0.2] : 0.5 }} transition={{ duration: 1, repeat: Infinity, delay: i*0.3 }} />
        <motion.circle cx="40" cy={y+5} r="2" fill="#22d3ee" animate={{ opacity: active ? [0, 1, 0] : 0.2 }} transition={{ duration: 1.5, repeat: Infinity, delay: i*0.4 }} />
      </motion.g>
    ))}
    {/* Background scanning line */}
    {active && <motion.line x1="10" y1="50" x2="90" y2="50" stroke="rgba(34,211,238,0.4)" strokeWidth="1" animate={{ y: [-40, 40] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />}
  </svg>
);

export const EnterpriseVaultIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 shrink-0 drop-shadow-[0_0_12px_rgba(16,185,129,0.2)]">
    <rect x="5" y="5" width="90" height="90" rx="20" fill={active ? "rgba(16,185,129,0.08)" : "#161616"} stroke={active ? "#10b981" : "rgba(255,255,255,0.06)"} strokeWidth="2" className="transition-colors duration-500" />
    
    {/* Vault Door Matrix */}
    {active && [...Array(9)].map((_, i) => (
       <motion.line key={i} x1={15 + i * 8.75} y1="15" x2={15 + i * 8.75} y2="85" stroke="#10b981" strokeWidth="1" strokeDasharray="3 5"
         animate={{ y: [-10, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} opacity="0.3" />
    ))}

    {/* Vault Body - Scaled down for breathing room */}
    <g transform="translate(12.5, 12.5) scale(0.75)">
      <motion.path d="M 30 45 V 30 C 30 10 70 10 70 30 V 45" fill="none" stroke={active ? "#fff" : "#777"} strokeWidth="5" strokeLinecap="round" 
        animate={{ d: active ? "M 30 45 V 25 C 30 10 70 10 70 25 V 45" : "M 30 45 V 35 C 30 20 70 20 70 35 V 45" }} transition={{ duration: 0.5 }}/>
      <rect x="20" y="45" width="60" height="40" rx="8" fill="#0A0A0A" stroke={active ? "#10b981" : "#555"} strokeWidth="4" className="transition-colors duration-500" />
      <circle cx="50" cy="60" r="4" fill={active ? "#fff" : "#777"} className="transition-colors duration-500" />
      <path d="M 48 64 L 48 72 L 52 72 L 52 64 Z" fill={active ? "#fff" : "#777"} className="transition-colors duration-500" />
    </g>
  </svg>
);

export const EnterpriseLicenseIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 shrink-0">
    {/* Base Container */}
    <rect x="5" y="5" width="90" height="90" rx="20" fill={active ? "rgba(34,211,238,0.05)" : "#161616"} stroke={active ? "rgba(34,211,238,0.3)" : "rgba(255,255,255,0.06)"} strokeWidth="2" className="transition-colors duration-500" />
    
    {/* Micro-Ticks Ring (Lock Tumbler) */}
    <motion.circle cx="50" cy="50" r="36" fill="none" stroke={active ? "rgba(34,211,238,0.2)" : "#444"} strokeWidth="4" strokeDasharray="1 6"
       animate={{ rotate: active ? 360 : 0 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "center" }} />

    {/* Verification Scanner Ring */}
    <motion.circle cx="50" cy="50" r="32" fill="none" stroke={active ? "rgba(34,211,238,0.4)" : "#333"} strokeWidth="1.5" strokeDasharray="40 80"
       animate={{ rotate: active ? -360 : 0 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "center" }} />
       
    {/* Shield Base (Represents Protection/License) */}
    <motion.path d="M 50 18 L 75 25 L 75 55 C 75 75 50 85 50 85 C 50 85 25 75 25 55 L 25 25 Z" fill={active ? "rgba(34,211,238,0.1)" : "#0c0c0c"} stroke={active ? "#22d3ee" : "#555"} strokeWidth="2"
      animate={{ scale: active ? [0.96, 1.04, 0.96] : 1 }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "center" }} />
      
    {/* Cryptographic Keyhole */}
    <g transform="translate(50, 48) scale(0.9)">
      <circle cx="0" cy="-6" r="7" fill={active ? "#fff" : "#999"} className="transition-colors duration-500" />
      <path d="M -5 -2 L 5 -2 L 8 12 Q 8 15 0 15 Q -8 15 -8 12 Z" fill={active ? "#fff" : "#999"} className="transition-colors duration-500" />
      
      {/* Scanning Validation Laser over the keyhole */}
      {active && (
        <motion.line x1="-15" y1="-15" x2="15" y2="-15" stroke="#22d3ee" strokeWidth="1.5"
          animate={{ y: [-15, 20, -15] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
      )}
    </g>

    {/* Validation Pulses (Authentication Success) */}
    {active && (
       <motion.circle cx="50" cy="50" r="10" fill="none" stroke="#22d3ee" strokeWidth="2"
         animate={{ r: [10, 45], opacity: [0.8, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }} />
    )}
  </svg>
);

export const EnterprisePulseIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-[14px] h-[14px] shrink-0">
     <rect x="0" y="0" width="100" height="100" fill="transparent" stroke={active ? "rgba(34,211,238,0.1)" : "rgba(255,255,255,0.05)"} strokeWidth="4" strokeDasharray="10 10" className="transition-colors duration-500"/>
     <motion.path d="M 5 50 L 30 50 L 45 15 L 60 85 L 75 50 L 95 50" fill="none" stroke={active ? "#22d3ee" : "#8b8b98"} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" 
       animate={active ? { strokeDashoffset: [200, 0] } : {}} strokeDasharray="200" transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="transition-colors duration-500" />
  </svg>
);

export const EnterpriseDiskIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-[14px] h-[14px] shrink-0">
    {[20, 50, 80].map((y, i) => (
       <g key={y}>
         <ellipse cx="50" cy={y} rx="40" ry="12" fill={active ? (i === 1 ? "rgba(34,211,238,0.15)" : "transparent") : "transparent"} stroke={active ? "#22d3ee" : "#8b8b98"} strokeWidth="6" className="transition-colors duration-500" />
         <path d={`M 10 ${y} V ${y+15} A 40 12 0 0 0 90 ${y+15} V ${y}`} fill="transparent" stroke={active ? "#22d3ee" : "#8b8b98"} strokeWidth="6" className="transition-colors duration-500" />
         {active && i === 1 && <motion.circle cx="30" cy={y} r="4" fill="#22d3ee" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />}
         {active && i === 1 && <motion.circle cx="45" cy={y} r="4" fill="#22d3ee" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }} />}
       </g>
    ))}
  </svg>
);

export const EnterpriseStatusBadge = ({ active }: { active: boolean }) => (
  <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-full border relative overflow-hidden transition-all duration-500 ${active ? "bg-emerald-950/50 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]" : "bg-emerald-950/20 border-emerald-500/20"}`}>
    {active && (
      <motion.div className="absolute inset-0 w-full h-[200%] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent skew-x-12 -translate-y-1/2"
         animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
    )}
    <svg viewBox="0 0 100 100" className="w-2.5 h-2.5 shrink-0 relative z-10">
      <circle cx="50" cy="50" r="16" fill="#10b981" className={`${active ? "shadow-[0_0_8px_#10b981]" : ""}`} />
      <motion.circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="12"
        animate={active ? { scale: [0.3, 1], opacity: [1, 0] } : { scale: 0.3, opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity }} />
      <motion.circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="8"
        animate={active ? { scale: [0.3, 1], opacity: [1, 0] } : { scale: 0.3, opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }} />
    </svg>
    <span className={`text-[9px] font-mono tracking-wider font-bold relative z-10 transition-colors duration-300 ${active ? "text-emerald-400 drop-shadow-[0_0_4px_rgba(16,185,129,0.5)]" : "text-emerald-600"}`}>
      OPERATIONAL
    </span>
  </div>
);
