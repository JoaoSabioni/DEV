'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SERVICES = [
  { num: '01', name: 'CORTE', desc: 'Execução técnica superior com acabamento à navalha.', price: '15€' },
  { num: '02', name: 'CORTE & BARBA', desc: 'Corte e barba com tratamento completo.', price: '20€' },
]

const GALLERY_IMAGES = Array.from({ length: 12 }, (_, i) => `/galeria/${i + 1}.jpg`)

export default function PageMain() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('sending')
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setFormStatus('sent')
      setTimeout(() => setFormStatus('idle'), 4000)
    } catch { setFormStatus('idle') }
  }

  return (
    <div className="bg-black text-white font-sans selection:bg-white selection:text-black min-h-screen overflow-x-hidden">
      
      {/* Header Compacto - Altura reduzida de py-5 para py-3 e logo ajustado */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/10 bg-black/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-3">
          <Link href="/main" className="transition-all hover:opacity-70 flex items-center">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={130} 
              height={40} 
              priority 
              className="object-contain h-auto w-auto max-h-[40px]" 
            />
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/servicos" className="text-[12px] tracking-[0.2em] uppercase font-semibold text-zinc-400 hover:text-white transition-colors">Serviços</Link>
            <Link href="/galeria" className="text-[12px] tracking-[0.2em] uppercase font-semibold text-zinc-400 hover:text-white transition-colors">Galeria</Link>
            <a href="#agendar" className="text-[11px] tracking-[0.2em] uppercase text-black bg-white px-6 py-2.5 font-bold hover:bg-zinc-200 transition-all">CONTACTO</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center px-8 pt-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="fade-up">
            <div className="flex items-center gap-4 text-zinc-600 text-[11px] tracking-[0.5em] uppercase mb-10">
              <span className="w-12 h-px bg-zinc-800" /> PINHAL NOVO · EST. 2025
            </div>
            <h1 className="font-serif text-[clamp(3.5rem,12vw,140px)] leading-[0.85] font-medium uppercase mb-10 tracking-tighter">
              ELEGANCE<br /><span className="text-zinc-700">STUDIO</span>
            </h1>
            <a href="#agendar" className="inline-block border border-white/20 px-14 py-6 text-[11px] tracking-[0.5em] uppercase hover:bg-white hover:text-black font-bold transition-all duration-500">RESERVAR AGORA</a>
          </div>
        </div>
      </section>

      {/* Secção de Menu */}
      <section id="servicos" className="border-t border-white/5 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-x divide-white/5 border-x border-white/5">
          <div className="p-12 lg:p-20 flex flex-col justify-center bg-black min-h-[400px]">
             <h2 className="font-serif text-5xl uppercase leading-tight mb-8">O Nosso<br />Menu</h2>
             <Link href="/servicos" className="text-[11px] tracking-[0.3em] text-zinc-400 uppercase hover:text-white flex items-center gap-4 group">
               <span className="w-8 h-px bg-zinc-800 group-hover:w-12 transition-all" /> Ver Detalhes
             </Link>
          </div>
          {SERVICES.map((s) => (
            <div key={s.num} className="fade-up p-12 lg:p-20 hover:bg-white/[0.02] transition-all group flex flex-col justify-between min-h-[400px]">
              <div>
                <div className="text-[11px] text-zinc-800 mb-12 tracking-widest font-mono">{s.num}</div>
                <h3 className="font-serif text-4xl font-light mb-6 uppercase group-hover:translate-x-2 transition-all">{s.name}</h3>
                <p className="text-[11px] text-zinc-500 tracking-wider uppercase italic opacity-60">{s.desc}</p>
              </div>
              <div className="text-4xl font-serif text-zinc-200 border-t border-white/5 pt-8">{s.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO CARROSSEL - COMPRIMIDA AO CENTRO */}
      <section className="py-32 bg-black border-b border-white/5 overflow-hidden">
        <div className="max-w-4xl mx-auto px-8"> 
            <div className="text-center mb-16">
                <h2 className="text-[10px] tracking-[0.6em] text-zinc-500 uppercase">Trabalhos Recentes</h2>
                <div className="w-12 h-px bg-zinc-800 mx-auto mt-4" />
            </div>
            
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />
                
                <div className="overflow-hidden">
                    <div className="flex w-max animate-scroll group-hover:[animation-play-state:paused]">
                        {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, idx) => (
                            <div key={idx} className="relative w-[240px] h-[320px] mx-3 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-700">
                                <Image 
                                    src={img} 
                                    alt="Trabalho Elegance Studio" 
                                    fill 
                                    className="object-cover border border-white/5 rounded-sm"
                                    sizes="240px"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Formulário de Agendamento */}
      <section id="agendar" className="py-40 px-8 bg-black relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-[clamp(2rem,6vw,60px)] uppercase mb-20 fade-up tracking-tighter">RESERVE O SEU LUGAR</h2>
          <form onSubmit={handleBooking} className="grid md:grid-cols-2 gap-x-20 gap-y-12 text-left fade-up">
            <div className="border-b border-white/10 pb-4">
              <label className="text-[10px] tracking-[0.4em] text-zinc-600 uppercase mb-4 block font-bold">Nome Completo</label>
              <input type="text" required className="w-full bg-transparent outline-none text-xl uppercase py-2" placeholder="DIGITE O SEU NOME" />
            </div>
            <div className="border-b border-white/10 pb-4">
              <label className="text-[10px] tracking-[0.4em] text-zinc-600 uppercase mb-4 block font-bold">Telemóvel</label>
              <input type="tel" required className="w-full bg-transparent outline-none text-xl uppercase py-2" placeholder="9XX XXX XXX" />
            </div>
            <div className="md:col-span-2 flex justify-center mt-12">
              <button type="submit" disabled={formStatus !== 'idle'} className="bg-white text-black px-24 py-7 text-[12px] tracking-[0.6em] uppercase font-black hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50">
                {formStatus === 'idle' ? 'CONFIRMAR AGENDAMENTO' : 'A PROCESSAR...'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 border-t border-white/5 text-center bg-zinc-950/30">
        <p className="text-[10px] tracking-[0.8em] text-zinc-700 uppercase">ELEGANCE STUDIO © 2026 · PINHAL NOVO · PORTUGAL</p>
      </footer>

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-264px * 12)); }
        }
        .animate-scroll {
          display: flex;
          animation: scroll 35s linear infinite;
        }
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.2, 0, 0.2, 1);
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}