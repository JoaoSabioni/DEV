'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SERVICES = [
  { num: '01', name: 'Sobrancelhas', desc: 'Definição e alinhamento com acabamento preciso.', price: '3€', detail: 'Tratamento de sobrancelhas com técnica apurada para um resultado natural e definido.' },
  { num: '02', name: 'Barba', desc: 'Modelação e tratamento completo da barba.', price: '6€', detail: 'Aparagem, definição e acabamento à navalha para uma barba impecável.' },
  { num: '03', name: 'Corte Simples', desc: 'Execução técnica superior com acabamento à navalha.', price: '10€', detail: 'Corte clássico com acabamento refinado, adaptado ao estilo de cada cliente.' },
  { num: '04', name: 'Corte / Degradê', desc: 'Degradê executado com precisão milimétrica.', price: '15€', detail: 'Fade técnico com transição perfeita, do zero ao comprimento desejado.' },
  { num: '05', name: 'Corte & Barba', desc: 'Experiência completa de barbearia premium.', price: '17€', detail: 'Corte e barba com tratamento total — o serviço mais completo do estúdio.' },
]

export default function ServicosPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="bg-black text-white font-sans selection:bg-white selection:text-black min-h-screen overflow-x-hidden">

      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/10 bg-black/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 py-1">
          <Link href="/main" className="transition-all hover:opacity-70 flex items-center">
            <Image src="/logo.png" alt="Elegance Studio" height={90} width={90} className="h-[68px] md:h-[84px] w-auto" />
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            <Link href="/servicos" className="text-[12px] tracking-[0.2em] uppercase font-semibold text-white transition-colors">Serviços</Link>
            <Link href="/galeria" className="text-[12px] tracking-[0.2em] uppercase font-semibold text-zinc-400 hover:text-white transition-colors">Galeria</Link>
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
            <Link href="/servicos" onClick={() => setMenuOpen(false)} className="text-[12px] tracking-[0.3em] uppercase font-semibold text-white">Serviços</Link>
            <Link href="/galeria" onClick={() => setMenuOpen(false)} className="text-[12px] tracking-[0.3em] uppercase font-semibold text-zinc-400 hover:text-white transition-colors">Galeria</Link>
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
            SERVIÇOS
          </h1>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto border-x border-white/5">
        {SERVICES.map((s, i) => (
          <div
            key={s.num}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`
              border-b border-white/5 px-8 md:px-12 lg:px-20
              transition-all duration-500 cursor-default
              ${hovered === i ? 'bg-white/[0.03]' : ''}
            `}
          >
            <div className="py-10 md:py-14 grid grid-cols-[auto_1fr_auto] md:grid-cols-[80px_1fr_auto_auto] items-center gap-6 md:gap-12">

              {/* Number */}
              <span className="text-[11px] text-zinc-700 tracking-widest font-mono">{s.num}</span>

              {/* Name + desc */}
              <div>
                <h2 className={`font-serif text-[clamp(1.8rem,4vw,52px)] font-light uppercase tracking-tight transition-all duration-500 ${hovered === i ? 'translate-x-3' : ''}`}>
                  {s.name}
                </h2>
                <p className={`text-[11px] text-zinc-500 tracking-wider uppercase italic mt-2 transition-all duration-500 ${hovered === i ? 'opacity-100' : 'opacity-0 md:opacity-60'}`}>
                  {s.desc}
                </p>
              </div>

              {/* Detail — só desktop ao hover */}
              <p className={`hidden md:block text-[11px] text-zinc-500 max-w-[220px] leading-relaxed transition-all duration-500 ${hovered === i ? 'opacity-100' : 'opacity-0'}`}>
                {s.detail}
              </p>

              {/* Price */}
              <div className={`font-serif text-[clamp(2rem,4vw,56px)] transition-all duration-500 ${hovered === i ? 'text-white' : 'text-zinc-600'}`}>
                {s.price}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-8 text-center border-t border-white/5 mt-0">
        <p className="text-[10px] tracking-[0.8em] text-zinc-600 uppercase mb-6">Pronto para marcar?</p>
        <a
          href="/main#contacto"
          className="inline-block border border-white/20 px-12 md:px-20 py-5 md:py-6 text-[11px] tracking-[0.5em] uppercase hover:bg-white hover:text-black font-bold transition-all duration-500"
        >
          RESERVAR AGORA
        </a>
      </section>

      {/* Footer */}
      <footer className="py-14 px-6 md:px-8 border-t border-white/5 text-center bg-zinc-950/30">
        <p className="text-[10px] tracking-[0.6em] md:tracking-[0.8em] text-zinc-700 uppercase">ELEGANCE STUDIO © 2026 · PINHAL NOVO · PORTUGAL</p>
      </footer>
    </div>
  )
}
