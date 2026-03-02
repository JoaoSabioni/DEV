'use client'
import FooterContacto from '../components/FooterContacto'

export default function Galeria() {
  return (
    <main className="bg-black text-white pt-40">
      <div className="px-12 mb-24">
        <h1 className="font-display text-[10vw] uppercase leading-none">ARQUIVO<br/><span className="text-silver-dim">VISUAL</span></h1>
      </div>
      <div className="grid md:grid-cols-12 gap-px bg-white/10 border-y border-white/10">
        <div className="md:col-span-8 h-[500px] bg-dark flex items-center justify-center grayscale">
           <span className="text-[9px] tracking-[1em] opacity-20 uppercase">Espaço_Pinhal_Novo</span>
        </div>
        <div className="md:col-span-4 h-[500px] bg-dark2 flex items-center justify-center grayscale border-l border-white/10">
           <span className="text-[9px] tracking-[1em] opacity-20 uppercase">Detalhe_Corte</span>
        </div>
      </div>
      <FooterContacto />
    </main>
  )
}