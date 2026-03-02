'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function PageServicos() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-black text-white font-sans min-h-screen selection:bg-white selection:text-black">
      {/* Nav com Logo para voltar ao Main */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/10 bg-black/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
          <Link href="/main" className="hover:opacity-80 transition-opacity">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={120} 
              height={36} 
              className="object-contain"
            />
          </Link>
          <Link href="/main" className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 hover:text-white transition-colors">
            Voltar ao Início
          </Link>
        </div>
      </nav>
      
      <main className="pt-48 pb-32 px-8 max-w-7xl mx-auto">
        <header className="mb-24 fade-up">
          <h1 className="font-serif text-[clamp(3rem,8vw,100px)] leading-none uppercase mb-8">
            MENU<br /><span className="text-zinc-600">DETALHADO</span>
          </h1>
          <p className="text-zinc-400 text-sm tracking-[0.4em] uppercase max-w-xl leading-relaxed">
            Técnica e precisão aplicados a cada serviço. Valores fixos e transparência total.
          </p>
        </header>

        {/* Exemplo de Grid de Conteúdo Detalhado */}
        <div className="grid gap-16 fade-up">
          <div className="group border-b border-white/5 pb-12">
            <div className="flex justify-between items-baseline mb-4">
              <h2 className="font-serif text-4xl uppercase tracking-tight">Corte Signature</h2>
              <span className="text-3xl font-light">15€</span>
            </div>
            <p className="text-xs text-zinc-500 tracking-widest uppercase italic">
              45 MIN · Corte por medida com consulta de visagismo e acabamento à navalha.
            </p>
          </div>
          
          <div className="group border-b border-white/5 pb-12">
            <div className="flex justify-between items-baseline mb-4">
              <h2 className="font-serif text-4xl uppercase tracking-tight">Barba Tradicional</h2>
              <span className="text-3xl font-light">12€</span>
            </div>
            <p className="text-xs text-zinc-500 tracking-widest uppercase italic">
              30 MIN · Design de barba com toalha quente e óleos nutritivos.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}