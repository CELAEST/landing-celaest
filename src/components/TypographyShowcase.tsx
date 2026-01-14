export function TypographyShowcase() {
  return (
    <div className="space-y-12">
      {/* Font Families */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Familias Tipográficas</h2>
          <p className="text-slate-400">Sistema tipográfico moderno y legible</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Primary Font */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Primary: Inter</h3>
              <p className="text-sm text-slate-400">Para títulos, headings y UI elements</p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Regular</p>
                <p className="text-2xl text-white" style={{ fontWeight: 400 }}>The quick brown fox jumps</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Medium</p>
                <p className="text-2xl text-white" style={{ fontWeight: 500 }}>The quick brown fox jumps</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Semibold</p>
                <p className="text-2xl text-white" style={{ fontWeight: 600 }}>The quick brown fox jumps</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Bold</p>
                <p className="text-2xl text-white" style={{ fontWeight: 700 }}>The quick brown fox jumps</p>
              </div>
            </div>
          </div>

          {/* Secondary Font */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Monospace: JetBrains Mono</h3>
              <p className="text-sm text-slate-400">Para código, datos técnicos y números</p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Regular</p>
                <p className="text-2xl text-white font-mono" style={{ fontWeight: 400 }}>const AI = true;</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Medium</p>
                <p className="text-2xl text-white font-mono" style={{ fontWeight: 500 }}>const AI = true;</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Semibold</p>
                <p className="text-2xl text-white font-mono" style={{ fontWeight: 600 }}>const AI = true;</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Bold</p>
                <p className="text-2xl text-white font-mono" style={{ fontWeight: 700 }}>const AI = true;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heading Scales */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Escala de Títulos</h2>
          <p className="text-slate-400">Jerarquía visual para contenido estructurado</p>
        </div>
        
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800 space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <p className="text-xs text-slate-500 mb-2">H1 - 3.75rem (60px)</p>
            <h1 className="text-white">Automatización Inteligente</h1>
          </div>
          <div className="pb-4 border-b border-slate-800">
            <p className="text-xs text-slate-500 mb-2">H2 - 3rem (48px)</p>
            <h2 className="text-white">Tecnología de Vanguardia</h2>
          </div>
          <div className="pb-4 border-b border-slate-800">
            <p className="text-xs text-slate-500 mb-2">H3 - 2.25rem (36px)</p>
            <h3 className="text-white">Soluciones Empresariales</h3>
          </div>
          <div className="pb-4 border-b border-slate-800">
            <p className="text-xs text-slate-500 mb-2">H4 - 1.875rem (30px)</p>
            <h4 className="text-white">Innovación Continua</h4>
          </div>
          <div className="pb-4 border-b border-slate-800">
            <p className="text-xs text-slate-500 mb-2">H5 - 1.5rem (24px)</p>
            <h5 className="text-white">Procesamiento Neural</h5>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-2">H6 - 1.25rem (20px)</p>
            <h6 className="text-white">Machine Learning</h6>
          </div>
        </div>
      </section>

      {/* Body Text */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Texto de Cuerpo</h2>
          <p className="text-slate-400">Variaciones para diferentes contextos</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800 space-y-6">
            <div>
              <p className="text-xs text-slate-500 mb-2">Large - 1.125rem (18px)</p>
              <p className="text-lg text-white">
                La automatización inteligente transforma procesos empresariales mediante algoritmos avanzados de IA.
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-2">Base - 1rem (16px)</p>
              <p className="text-base text-white">
                La automatización inteligente transforma procesos empresariales mediante algoritmos avanzados de IA.
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-2">Small - 0.875rem (14px)</p>
              <p className="text-sm text-white">
                La automatización inteligente transforma procesos empresariales mediante algoritmos avanzados de IA.
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-2">Extra Small - 0.75rem (12px)</p>
              <p className="text-xs text-white">
                La automatización inteligente transforma procesos empresariales mediante algoritmos avanzados de IA.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800 space-y-6">
            <div>
              <p className="text-xs text-slate-500 mb-2">Muted Text</p>
              <p className="text-base text-slate-400">
                Texto secundario para descripciones y ayuda contextual
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-2">Accent Text (Cyan)</p>
              <p className="text-base text-cyan-400">
                Enlaces y elementos interactivos importantes
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-2">Accent Text (Purple)</p>
              <p className="text-base text-purple-400">
                Highlights y elementos de atención especial
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-2">Gradient Text</p>
              <p className="text-base bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Elementos premium y llamadas de acción destacadas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Typography Guidelines */}
      <section className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800">
        <h2 className="text-3xl font-bold text-white mb-6">Guías de Uso</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Espaciado</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• Line height: 1.5x para cuerpo</li>
              <li>• Line height: 1.2x para títulos</li>
              <li>• Letter spacing: -0.02em títulos grandes</li>
              <li>• Letter spacing: normal para cuerpo</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Jerarquía</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• H1: Hero sections, landing principal</li>
              <li>• H2: Títulos de sección</li>
              <li>• H3: Sub-secciones importantes</li>
              <li>• Body Large: Introducción de secciones</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Contraste</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• Blanco sobre oscuro: contenido principal</li>
              <li>• Gradientes: CTAs y elementos premium</li>
              <li>• Slate-400: texto secundario</li>
              <li>• Cyan/Purple: acciones y links</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
