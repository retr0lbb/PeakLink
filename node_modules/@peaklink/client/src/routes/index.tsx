/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <noo need> */
/** biome-ignore-all lint/correctness/useUniqueElementIds: <no need> */
import { createFileRoute } from '@tanstack/react-router'
import { Compass, Mountain } from 'lucide-react';
import { useState } from 'react';
import HikingMap from '@/components/Map';

export const Route = createFileRoute("/")({
  component: App,
})

function App() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Coluna Esquerda */}
      <div className="w-1/3 flex flex-col justify-center px-16 py-12">
        <div className="max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <Mountain className="w-8 h-8 text-violet-600" strokeWidth={1.5} />
            <span className="text-2xl font-light tracking-wide text-stone-800">
              PeakLink
            </span>
          </div>

          {/* Título */}
          <h1 className="text-5xl font-extralight text-stone-800 leading-tight mb-6">
            Descubra novos
            <br />
            <span className="text-violet-600">caminhos</span>
          </h1>

          {/* Descrição */}
          <p className="text-stone-600 font-normal text-lg mb-10 leading-relaxed">
            Registre suas trilhas, acompanhe seu progresso e conecte-se com a natureza de forma simples.
          </p>

          {/* Botão */}
          <button
            type='button'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group flex items-center gap-3 bg-violet-600 text-white px-8 py-4 rounded-full font-medium tracking-wide transition-all duration-300 hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-200"
          >
            <Compass 
              className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'rotate-45' : ''}`} 
              strokeWidth={1.5} 
            />
            Explore agora
          </button>

          {/* Stats minimalistas */}
          <div className="flex gap-12 mt-16 pt-8 border-t border-stone-200">
            <div>
              <p className="text-3xl font-extralight text-stone-800">2.4k</p>
              <p className="text-sm text-stone-400 font-light">trilhas</p>
            </div>
            <div>
              <p className="text-3xl font-extralight text-stone-800">890</p>
              <p className="text-sm text-stone-400 font-light">exploradores</p>
            </div>
            <div>
              <p className="text-3xl font-extralight text-stone-800">156</p>
              <p className="text-sm text-stone-400 font-light">regiões</p>
            </div>
          </div>
        </div>
      </div>

      {/* Coluna Direita - Mapa */}
      <div className="w-2/3 relative">
        <HikingMap />
      </div>
    </div>
  );
}