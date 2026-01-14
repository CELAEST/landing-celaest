import { useState } from 'react';
import { Sparkles, Zap, Cpu, Palette, Type, Layout } from 'lucide-react';
import { ColorPalette } from './ColorPalette';
import { TypographyShowcase } from './TypographyShowcase';
import { ComponentExamples } from './ComponentExamples';

export function BrandShowcase() {
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'components'>('colors');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <header className="border-b border-purple-500/20 backdrop-blur-xl bg-slate-950/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Brand Identity System
                </h1>
                <p className="text-sm text-slate-400">Automatización IA · Vanguardia Tecnológica</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <span className="text-sm text-cyan-300">v1.0 Preview</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <nav className="flex gap-4 mb-12">
          <button
            onClick={() => setActiveTab('colors')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
              activeTab === 'colors'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Palette className="w-5 h-5" />
            <span className="font-medium">Colorimetría</span>
          </button>
          <button
            onClick={() => setActiveTab('typography')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
              activeTab === 'typography'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Type className="w-5 h-5" />
            <span className="font-medium">Tipografía</span>
          </button>
          <button
            onClick={() => setActiveTab('components')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
              activeTab === 'components'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Layout className="w-5 h-5" />
            <span className="font-medium">Componentes</span>
          </button>
        </nav>

        {/* Content */}
        <div className="animate-fadeIn">
          {activeTab === 'colors' && <ColorPalette />}
          {activeTab === 'typography' && <TypographyShowcase />}
          {activeTab === 'components' && <ComponentExamples />}
        </div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
}
