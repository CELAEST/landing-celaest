import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ColorCardProps {
  name: string;
  hex: string;
  rgb: string;
  usage: string;
  isGradient?: boolean;
  gradientClass?: string;
}

function ColorCard({ name, hex, rgb, usage, isGradient, gradientClass }: ColorCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800 hover:border-purple-500/50 transition-all">
      <div
        className={`w-full h-32 rounded-xl mb-4 ${isGradient ? gradientClass : ''} shadow-lg`}
        style={!isGradient ? { backgroundColor: hex } : {}}
      />
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">{name}</h3>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
        {!isGradient && (
          <>
            <p className="text-sm text-cyan-400 font-mono">{hex}</p>
            <p className="text-xs text-slate-500 font-mono">{rgb}</p>
          </>
        )}
        <p className="text-sm text-slate-400 pt-2 border-t border-slate-800">{usage}</p>
      </div>
    </div>
  );
}

export function ColorPalette() {
  const primaryColors = [
    {
      name: 'Cyber Cyan',
      hex: '#06B6D4',
      rgb: 'rgb(6, 182, 212)',
      usage: 'Botones principales, CTAs, enlaces interactivos'
    },
    {
      name: 'Neural Purple',
      hex: '#A855F7',
      rgb: 'rgb(168, 85, 247)',
      usage: 'Acentos, hover states, elementos destacados'
    },
    {
      name: 'AI Pink',
      hex: '#EC4899',
      rgb: 'rgb(236, 72, 153)',
      usage: 'Alerts, notificaciones, badges importantes'
    },
    {
      name: 'Electric Blue',
      hex: '#3B82F6',
      rgb: 'rgb(59, 130, 246)',
      usage: 'Links secundarios, iconos informativos'
    }
  ];

  const neutralColors = [
    {
      name: 'Deep Space',
      hex: '#0F172A',
      rgb: 'rgb(15, 23, 42)',
      usage: 'Fondos principales, contenedores oscuros'
    },
    {
      name: 'Cosmic Gray',
      hex: '#1E293B',
      rgb: 'rgb(30, 41, 59)',
      usage: 'Fondos secundarios, cards, panels'
    },
    {
      name: 'Nebula Slate',
      hex: '#334155',
      rgb: 'rgb(51, 65, 85)',
      usage: 'Bordes, divisores, elementos sutiles'
    },
    {
      name: 'Star White',
      hex: '#F8FAFC',
      rgb: 'rgb(248, 250, 252)',
      usage: 'Texto principal, contenido destacado'
    }
  ];

  const gradients = [
    {
      name: 'Quantum Gradient',
      hex: 'linear-gradient(135deg, #06B6D4, #A855F7)',
      rgb: '',
      usage: 'Logos, headers premium, elementos hero',
      isGradient: true,
      gradientClass: 'bg-gradient-to-br from-cyan-400 to-purple-500'
    },
    {
      name: 'Neural Network',
      hex: 'linear-gradient(135deg, #A855F7, #EC4899)',
      rgb: '',
      usage: 'Botones destacados, badges premium',
      isGradient: true,
      gradientClass: 'bg-gradient-to-br from-purple-500 to-pink-500'
    },
    {
      name: 'Data Flow',
      hex: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
      rgb: '',
      usage: 'Fondos de secciones, overlays',
      isGradient: true,
      gradientClass: 'bg-gradient-to-br from-cyan-400 to-blue-500'
    },
    {
      name: 'Innovation Spectrum',
      hex: 'linear-gradient(135deg, #06B6D4, #A855F7, #EC4899)',
      rgb: '',
      usage: 'Elementos especiales, animaciones',
      isGradient: true,
      gradientClass: 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Primary Colors */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Colores Primarios</h2>
          <p className="text-slate-400">Los colores principales que definen la identidad de la marca</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {primaryColors.map((color) => (
            <ColorCard key={color.name} {...color} />
          ))}
        </div>
      </section>

      {/* Gradients */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Gradientes Tech</h2>
          <p className="text-slate-400">Gradientes modernos para elementos destacados y premium</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gradients.map((gradient) => (
            <ColorCard key={gradient.name} {...gradient} />
          ))}
        </div>
      </section>

      {/* Neutral Colors */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Colores Neutrales</h2>
          <p className="text-slate-400">Paleta de soporte para fondos, textos y elementos UI</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {neutralColors.map((color) => (
            <ColorCard key={color.name} {...color} />
          ))}
        </div>
      </section>

      {/* Color Psychology */}
      <section className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800">
        <h2 className="text-3xl font-bold text-white mb-6">Psicología del Color</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
              <div>
                <h4 className="text-cyan-400 font-semibold">Cyan (Cibernético)</h4>
                <p className="text-sm text-slate-400">Representa tecnología, innovación y confianza digital</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
              <div>
                <h4 className="text-purple-400 font-semibold">Purple (Neural)</h4>
                <p className="text-sm text-slate-400">Evoca inteligencia artificial, creatividad y sofisticación</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
              <div>
                <h4 className="text-pink-400 font-semibold">Pink (Energía)</h4>
                <p className="text-sm text-slate-400">Transmite dinamismo, innovación disruptiva y modernidad</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-slate-800 mt-1.5 flex-shrink-0" />
              <div>
                <h4 className="text-slate-300 font-semibold">Dark Neutrals</h4>
                <p className="text-sm text-slate-400">Profesionalismo, elegancia y enfoque en el contenido</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
