'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const LOJA = [
  '/Fotos_loja/loja1.png',
  '/Fotos_loja/loja2.png',
  '/Fotos_loja/loja3.png',
  '/Fotos_loja/loja4.png',
]

const COLABORADORES = [
  {
    nome: 'Edi',
    cargo: 'Fundador',
    principal: '/Fotos_edi/edi2.png',
    fotos: [
      '/Fotos_edi/edi3.png',
      '/Fotos_edi/edi4.png',
      '/Fotos_edi/edi5.png',
      '/Fotos_edi/edi6.png',
      '/Fotos_edi/edi7.png',
      '/Fotos_edi/edi8.png',
    ],
  },
  {
    nome: 'Tomas',
    cargo: 'Colaborador',
    principal: '/Fotos_Tomas/tomas2.png',
    fotos: [
      '/Fotos_Tomas/tomas3.png',
      '/Fotos_Tomas/tomas4.png',
      '/Fotos_Tomas/tomas5.png',
      '/Fotos_Tomas/tomas6.png',
      '/Fotos_Tomas/tomas7.png',
      '/Fotos_Tomas/tomas8.png',
      '/Fotos_Tomas/tomas9.png',
    ],
  },
  {
    nome: 'Abreu',
    cargo: 'Colaborador',
    principal: '/Fotos_Abreu/abreu1.png',
    fotos: [
      '/Fotos_Abreu/abreu2.png',
      '/Fotos_Abreu/abreu3.png',
      '/Fotos_Abreu/abreu4.png',
      '/Fotos_Abreu/abreu5.png',
      '/Fotos_Abreu/abreu6.png',
      '/Fotos_Abreu/abreu7.png',
      '/Fotos_Abreu/abreu8.png',
    ],
  },
]

export default function PageGaleria() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-black text-white font-sans selection:bg-white selection:text-black min-h-screen overflow-x-hidden">

      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/10 bg-black/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 py-1">
          <Link href="/main" className="transition-all hover:opacity-70 flex items-center">
            <Image src="/logo.png" alt="Elegance Studio" height={90} width={90} className="h-[68px] md:h-[84px] w-auto" />
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            <Link href="/servicos" className="text-[12px] tracking-[0.2em] uppercase font-semibold text-zinc-400 hover:text-white transition-colors">Serviços</Link>
            <Link href="/galeria" className="text-[12px] tracking-[0.2em] uppercase font-semibold text-white transition-colors">Galeria</Link>
            <a href="/main#contacto" className="text-[11px] tracking-[0.2em] uppercase text-black bg-white px-6 py-2.5 font-bold hover:bg-zinc-200 transition-all">CONTACTO</a>
          </div>

          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-64' : 'max-h-0'} bg-black/98 border-t border-white/5`}>
          <div className="flex flex-col px-6 py-6 gap-6">
            <Link href="/servicos" onClick={() => setMenuOpen(false)} className="text-[12px] tracking-[0.3em] uppercase font-semibold text-zinc-400 hover:text-white transition-colors">Serviços</Link>
            <Link href="/galeria" onClick={() => setMenuOpen(false)} className="text-[12px] tracking-[0.3em] uppercase font-semibold text-white">Galeria</Link>
            <a href="/main#contacto" onClick={() => setMenuOpen(false)} className="text-[11px] tracking-[0.3em] uppercase text-black bg-white px-6 py-3 font-bold text-center hover:bg-zinc-200 transition-all">CONTACTO</a>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <section className="pt-36 md:pt-44 pb-16 md:pb-20 px-6 md:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 text-zinc-600 text-[11px] tracking-[0.5em] uppercase mb-8">
            <span className="w-12 h-px bg-zinc-800" /> PINHAL NOVO · EST. 2025
          </div>
          <h1 className="font-serif text-[clamp(3rem,10vw,120px)] leading-[0.85] font-medium uppercase tracking-tighter">
            GALERIA
          </h1>
        </div>
      </section>

      {/* Loja */}
      <section className="py-20 md:py-28 px-6 md:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <p className="text-[10px] tracking-[0.8em] text-zinc-600 uppercase mb-3">Espaço</p>
              <h2 className="font-serif text-[clamp(2rem,5vw,56px)] uppercase tracking-tighter">O Estúdio</h2>
            </div>
            <div className="w-16 h-px bg-zinc-800 mb-3" />
          </div>

          {/* Loja grid: 1 grande + 3 pequenas */}
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 h-[420px] md:h-[580px]">
            <div className="col-span-2 row-span-2 relative overflow-hidden group">
              <Image src={LOJA[0]} alt="Loja" fill className="object-cover transition-transform duration-700 group-hover:scale-105 " />
            </div>
            {LOJA.slice(1).map((src, i) => (
              <div key={i} className="relative overflow-hidden group">
                <Image src={src} alt="Loja" fill className="object-cover transition-transform duration-700 group-hover:scale-105 " />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Colaboradores */}
      <section className="py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16 md:mb-20">
            <div>
              <p className="text-[10px] tracking-[0.8em] text-zinc-600 uppercase mb-3">Equipa</p>
              <h2 className="font-serif text-[clamp(2rem,5vw,56px)] uppercase tracking-tighter">Colaboradores</h2>
            </div>
            <div className="w-16 h-px bg-zinc-800 mb-3" />
          </div>

          <div className="space-y-24 md:space-y-32">
            {COLABORADORES.map((colab, ci) => (
              <div key={ci}>
                {/* Nome + cargo */}
                <div className="flex items-baseline gap-6 mb-10 md:mb-12 border-b border-white/5 pb-8">
                  <h3 className="font-serif text-[clamp(2.5rem,7vw,80px)] uppercase tracking-tighter leading-none">{colab.nome}</h3>
                  <span className="text-[11px] tracking-[0.4em] text-zinc-500 uppercase">{colab.cargo}</span>
                </div>

                {/* Grid de fotos */}
                <div className="grid grid-cols-[55%_1fr_1fr] grid-rows-2 h-[500px] md:h-[700px]">
                  <div className="col-span-1 row-span-2 relative overflow-hidden group">
                    <Image
                      src={colab.principal}
                      alt={colab.nome}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="55vw"
                    />
                  </div>
                  {colab.fotos.slice(0, 4).map((src, fi) => (
                    <div key={fi} className="relative overflow-hidden group">
                      <Image
                        src={src}
                        alt={colab.nome}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        sizes="25vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="py-14 px-6 md:px-8 border-t border-white/5 text-center bg-zinc-950/30">
        <p className="text-[10px] tracking-[0.6em] md:tracking-[0.8em] text-zinc-700 uppercase">ELEGANCE STUDIO © 2026 · PINHAL NOVO · PORTUGAL</p>
      </footer>
    </div>
  )
}
