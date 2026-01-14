import { Zap, Sparkles, Cpu, ArrowRight, Check, Star } from 'lucide-react';

export function ComponentExamples() {
  return (
    <div className="space-y-12">
      {/* Buttons */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Botones</h2>
          <p className="text-slate-400">Diferentes estilos para llamadas a la acción</p>
        </div>
        
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primary Gradient */}
            <div className="space-y-3">
              <p className="text-xs text-slate-500">Primary Gradient</p>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl font-medium shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all hover:scale-105">
                Comenzar Ahora
              </button>
            </div>

            {/* Primary Solid */}
            <div className="space-y-3">
              <p className="text-xs text-slate-500">Primary Solid</p>
              <button className="w-full px-6 py-3 bg-cyan-500 text-white rounded-xl font-medium hover:bg-cyan-600 transition-all flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Automatizar
              </button>
            </div>

            {/* Secondary */}
            <div className="space-y-3">
              <p className="text-xs text-slate-500">Secondary</p>
              <button className="w-full px-6 py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700 transition-all border border-slate-700">
                Saber Más
              </button>
            </div>

            {/* Outline */}
            <div className="space-y-3">
              <p className="text-xs text-slate-500">Outline</p>
              <button className="w-full px-6 py-3 bg-transparent text-cyan-400 rounded-xl font-medium border-2 border-cyan-500/50 hover:bg-cyan-500/10 transition-all">
                Explorar
              </button>
            </div>

            {/* Ghost */}
            <div className="space-y-3">
              <p className="text-xs text-slate-500">Ghost</p>
              <button className="w-full px-6 py-3 text-slate-300 rounded-xl font-medium hover:bg-slate-800 transition-all">
                Cancelar
              </button>
            </div>

            {/* Icon Button */}
            <div className="space-y-3">
              <p className="text-xs text-slate-500">Icon Button</p>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium shadow-lg shadow-pink-500/50 hover:shadow-pink-500/70 transition-all flex items-center justify-center gap-2">
                Ver Demo
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Cards & Contenedores</h2>
          <p className="text-slate-400">Estilos de tarjetas para diferentes contenidos</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Basic Card */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800 hover:border-purple-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Card Básico</h3>
            <p className="text-slate-400">Contenedor estándar para información y features</p>
          </div>

          {/* Feature Card with Gradient Border */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity blur"></div>
            <div className="relative bg-slate-900 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Card Premium</h3>
              <p className="text-slate-400">Con borde degradado para elementos destacados</p>
            </div>
          </div>

          {/* Glass Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Glass Card</h3>
            <p className="text-slate-400">Efecto glassmorphism para overlays modernos</p>
          </div>
        </div>
      </section>

      {/* Badges & Tags */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Badges & Tags</h2>
          <p className="text-slate-400">Etiquetas y estados visuales</p>
        </div>
        
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800">
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full text-sm font-medium">
              IA Avanzada
            </span>
            <span className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium border border-cyan-500/20">
              Automatización
            </span>
            <span className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium border border-purple-500/20">
              En Desarrollo
            </span>
            <span className="px-4 py-2 bg-pink-500/10 text-pink-400 rounded-full text-sm font-medium border border-pink-500/20">
              Nuevo
            </span>
            <span className="px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-sm font-medium border border-green-500/20 flex items-center gap-1">
              <Check className="w-4 h-4" />
              Activo
            </span>
            <span className="px-4 py-2 bg-slate-800 text-slate-300 rounded-full text-sm font-medium">
              Standard
            </span>
          </div>
        </div>
      </section>

      {/* Input Fields */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Campos de Entrada</h2>
          <p className="text-slate-400">Inputs y formularios</p>
        </div>
        
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Input Estándar</label>
              <input
                type="text"
                placeholder="Ingresa tu email..."
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Input con Gradiente</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nombre de tu proyecto..."
                  className="w-full px-4 py-3 bg-slate-800 border-2 border-transparent rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
                  style={{
                    background: 'linear-gradient(#1E293B, #1E293B) padding-box, linear-gradient(135deg, #06B6D4, #A855F7) border-box'
                  }}
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-300">Textarea</label>
              <textarea
                placeholder="Describe tu proyecto de automatización..."
                rows={4}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Example */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Ejemplo: Cards de Pricing</h2>
          <p className="text-slate-400">Aplicación completa del sistema de diseño</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Basic Plan */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800 hover:border-cyan-500/50 transition-all">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-white">$29</span>
                <span className="text-slate-400">/mes</span>
              </div>
              <p className="text-slate-400 text-sm">Para proyectos pequeños</p>
            </div>
            <ul className="space-y-3 mb-8">
              {['10 automatizaciones', 'Soporte por email', '1GB almacenamiento', 'Analytics básicos'].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full px-6 py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700 transition-all">
              Comenzar
            </button>
          </div>

          {/* Pro Plan - Featured */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-75 blur"></div>
            <div className="relative bg-slate-900 rounded-2xl p-8">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full text-xs font-medium flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Popular
                </span>
              </div>
              <div className="mb-6 mt-2">
                <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">$99</span>
                  <span className="text-slate-400">/mes</span>
                </div>
                <p className="text-slate-400 text-sm">Para equipos en crecimiento</p>
              </div>
              <ul className="space-y-3 mb-8">
                {['Automatizaciones ilimitadas', 'Soporte prioritario 24/7', '50GB almacenamiento', 'Analytics avanzados', 'API access', 'Integraciones premium'].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-slate-300">
                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl font-medium shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all hover:scale-105">
                Comenzar Prueba
              </button>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800 hover:border-pink-500/50 transition-all">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-white">Custom</span>
              </div>
              <p className="text-slate-400 text-sm">Para organizaciones grandes</p>
            </div>
            <ul className="space-y-3 mb-8">
              {['Todo en Pro', 'Deployment personalizado', 'SLA garantizado', 'Soporte dedicado', 'Consultoría IA', 'White label'].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-slate-300">
                  <Check className="w-5 h-5 text-pink-400 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
              Contactar Ventas
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
