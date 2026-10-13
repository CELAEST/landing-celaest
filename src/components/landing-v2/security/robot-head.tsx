import { motion } from "framer-motion";

export const RobotHead = ({ activeNode }: { activeNode: "verified" | "encryption" | "infrastructure" | "all" | null }) => {
  // Mapping the gaze direction based on the hovered node.
  // The center SVG is 100x100. Eye resting at 50,55.
  const lookCoords = {
    verified: { x: -22, y: -10 }, // Looks Top-Left
    encryption: { x: 22, y: -10 }, // Looks Top-Right
    infrastructure: { x: 0, y: 16 }, // Looks Bottom
    all: { x: 0, y: 0 }, // Resting Dead Center targeting all
    null: { x: 0, y: 0 } // Resting
  };

  const target = lookCoords[activeNode || "null"];
  const isAnyActive = activeNode !== null;

  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center group/robot">
      {/* Ambient background pulsing */}
      <div className={`absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.2)_0%,transparent_60%)] blur-xl transition-all duration-1000 ${isAnyActive ? 'scale-125 opacity-100' : 'scale-100 opacity-30'}`} />

      {/* STATIC HELMET SHELL */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-[0_0_20px_rgba(34,211,238,0.5)] z-10"
      >
        <defs>
          <filter id="robot-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
               <feMergeNode in="blur" />
               <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <clipPath id="visor-v2">
             <path d="M 15 45 L 50 78 L 85 45 L 75 35 L 50 55 L 25 35 Z" />
          </clipPath>
          
          <linearGradient id="metal-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>

          <linearGradient id="metal-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#333" />
            <stop offset="100%" stopColor="#111" />
          </linearGradient>
        </defs>

        {/* --- BACK LAYER: Neck & Cables --- */}
        <path d="M 35 80 L 65 80 L 70 100 L 30 100 Z" fill="#020202" stroke="#22d3ee" strokeWidth="0.5" />
        {/* Intricate Neck Pistons/Cables */}
        {[35, 40, 45, 50, 55, 60, 65].map(x => (
          <line key={x} x1={x} y1="80" x2={x} y2="100" stroke="#22d3ee" strokeWidth="0.5" opacity="0.3" />
        ))}
        <path d="M 40 85 L 60 85" stroke="#444" strokeWidth="1" />
        <path d="M 40 90 L 60 90" stroke="#444" strokeWidth="1" />
        <path d="M 40 95 L 60 95" stroke="#444" strokeWidth="1" />

        {/* --- MID LAYER: Main Armor Shell --- */}
        {/* Jaw / Lower plate */}
        <path d="M 18 55 L 50 90 L 82 55 L 94 55 L 86 20 C 86 5, 14 5, 14 20 L 6 55 Z" fill="url(#metal-grad)" stroke="#111" strokeWidth="1.5" />
        
        {/* Cheek Armor / Ventilation Intakes */}
        <path d="M 12 55 L 45 88 L 35 75 Z" fill="#050505" stroke="#22d3ee" strokeWidth="0.5" />
        <path d="M 88 55 L 55 88 L 65 75 Z" fill="#050505" stroke="#22d3ee" strokeWidth="0.5" />
        
        {/* Left Vents (Breathing Animation) */}
        <g opacity="0.8">
           <motion.line x1="16" y1="62" x2="30" y2="76" stroke="#22d3ee" strokeWidth="0.5" animate={{ strokeOpacity: isAnyActive ? [0.2, 1, 0.2] : 0.2 }} transition={{ duration: 1.5, repeat: Infinity }} />
           <motion.line x1="18" y1="64" x2="32" y2="78" stroke="#22d3ee" strokeWidth="0.5" animate={{ strokeOpacity: isAnyActive ? [0.2, 1, 0.2] : 0.2 }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
           <motion.line x1="20" y1="66" x2="34" y2="80" stroke="#22d3ee" strokeWidth="0.5" animate={{ strokeOpacity: isAnyActive ? [0.2, 1, 0.2] : 0.2 }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />
        </g>
        
        {/* Right Vents (Breathing Animation) */}
        <g opacity="0.8">
           <motion.line x1="84" y1="62" x2="70" y2="76" stroke="#22d3ee" strokeWidth="0.5" animate={{ strokeOpacity: isAnyActive ? [0.2, 1, 0.2] : 0.2 }} transition={{ duration: 1.5, repeat: Infinity }} />
           <motion.line x1="82" y1="64" x2="68" y2="78" stroke="#22d3ee" strokeWidth="0.5" animate={{ strokeOpacity: isAnyActive ? [0.2, 1, 0.2] : 0.2 }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
           <motion.line x1="80" y1="66" x2="66" y2="80" stroke="#22d3ee" strokeWidth="0.5" animate={{ strokeOpacity: isAnyActive ? [0.2, 1, 0.2] : 0.2 }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />
        </g>

        {/* Top Cranium / Braincase with heavy industrial lines */}
        <path d="M 16 30 C 16 8, 84 8, 84 30 C 70 45, 30 45, 16 30 Z" fill="url(#metal-light)" stroke="#444" strokeWidth="1" />
        {/* Cranium Panel Cutout */}
        <path d="M 30 15 C 30 10, 70 10, 70 15 C 65 25, 35 25, 30 15 Z" fill="#111" stroke="#22d3ee" strokeWidth="0.5" />
        {/* Forehead LED */}
        <motion.path d="M 40 10 L 60 10 L 55 18 L 45 18 Z" fill="#22d3ee" filter="url(#robot-glow)" animate={{ opacity: isAnyActive ? 0.9 : 0.2 }} />

        {/* Side Antennas / Sensor Pods */}
        <rect x="2" y="32" width="10" height="28" rx="2" fill="#111" stroke="#444" strokeWidth="1.5" />
        <rect x="88" y="32" width="10" height="28" rx="2" fill="#111" stroke="#444" strokeWidth="1.5" />
        {/* Ear Bolts */}
        <circle cx="7" cy="46" r="3" fill="#050505" stroke="#22d3ee" strokeWidth="0.5" />
        <circle cx="93" cy="46" r="3" fill="#050505" stroke="#22d3ee" strokeWidth="0.5" />
        {/* Antenna LEDs */}
        <motion.circle cx="7" cy="36" r="1.5" fill="#22d3ee" filter="url(#robot-glow)" animate={{ opacity: isAnyActive ? [1, 0, 1] : 0.2 }} transition={{ duration: 0.5, repeat: Infinity }} />
        <motion.circle cx="93" cy="36" r="1.5" fill="#22d3ee" filter="url(#robot-glow)" animate={{ opacity: isAnyActive ? [1, 0, 1] : 0.2 }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }} />

        {/* --- FRONT LAYER: The Visor and Eyes --- */}
        {/* Thick Bezel around Visor */}
        <path d="M 10 40 L 50 82 L 90 40 L 80 30 L 50 58 L 20 30 Z" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.3" />
        {/* Dark Glass Visor */}
        <path d="M 12 40 L 50 80 L 88 40 L 80 32 L 50 60 L 20 32 Z" fill="#000" stroke="#050505" strokeWidth="2" />
        
        {/* The MOVING Eye inside the Static Visor Clip */}
        <g clipPath="url(#visor-v2)">
           {/* Scanline grid inside visor */}
           {[45, 50, 55, 60, 65, 70, 75].map(y => (
             <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(34,211,238,0.15)" strokeWidth="0.5" />
           ))}
           
           {/* Eye container ONLY moves inside the visor */}
           <motion.g
             animate={{ x: target.x, y: target.y }}
             transition={{ type: "spring", stiffness: 180, damping: 12, mass: 0.8 }}
           >
             {/* Complex Iris Assembly */}
             <circle cx="50" cy="55" r="11" fill="#050505" stroke="#22d3ee" strokeWidth="1" />
             <circle cx="50" cy="55" r="7" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="3 4" />
             {/* Glowing pupil */}
             <circle cx="50" cy="55" r="4" fill="#22d3ee" filter="url(#robot-glow)" className={isAnyActive ? "animate-pulse" : ""} />
             <circle cx="50" cy="55" r="1.5" fill="#fff" />
             
             {/* Reticle / Crosshairs tracking with the eye */}
             <line x1="30" y1="55" x2="43" y2="55" stroke="#22d3ee" strokeWidth="1.5" opacity="0.8" />
             <line x1="57" y1="55" x2="70" y2="55" stroke="#22d3ee" strokeWidth="1.5" opacity="0.8" />
             <line x1="50" y1="35" x2="50" y2="43" stroke="#22d3ee" strokeWidth="1.5" opacity="0.8" />
             <line x1="50" y1="67" x2="50" y2="75" stroke="#22d3ee" strokeWidth="1.5" opacity="0.8" />
           </motion.g>
           
           {/* Vertical Scanner bar running up and down the visor */}
           <motion.line 
             x1="0" x2="100" y1="35" y2="35" 
             stroke="rgba(34,211,238,0.4)" strokeWidth="1.5"
             animate={{ y: [0, 45, 0] }}
             transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
             filter="url(#robot-glow)"
           />
        </g>
        
        {/* Glass Reflection Highlight */}
        <path d="M 16 43 L 50 78 L 84 43" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />

      </svg>
    </div>
  );
};
