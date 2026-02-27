'use client'

import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + 'px'
        cursorRef.current.style.top = my + 'px'
      }
    }

    const animate = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px'
        ringRef.current.style.top = ry + 'px'
      }
      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    animate()
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    setTimeout(() => {
      document.querySelectorAll('.hero-animate').forEach(el => el.classList.add('visible'))
    }, 100)
    return () => observer.disconnect()
  }, [])

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('sending')
    const form = e.currentTarget
    const data = {
      nome: (form.elements.namedItem('nome') as HTMLInputElement).value,
      telefone: (form.elements.namedItem('telefone') as HTMLInputElement).value,
      servico: (form.elements.namedItem('servico') as HTMLSelectElement).value,
      data: new Date((form.elements.namedItem('data') as HTMLInputElement).value),
    }
    try {
      await fetch('/api/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setFormStatus('sent')
      form.reset()
      setTimeout(() => setFormStatus('idle'), 3000)
    } catch {
      setFormStatus('idle')
    }
  }

  const services = [
    { num: '01', icon: '✂️', name: 'Corte Clássico', desc: 'Corte tradicional executado com precisão milimétrica. Inclui lavagem e finalização.', price: '15€' },
    { num: '02', icon: '🪒', name: 'Barba Premium', desc: 'Tratamento completo de barba com produtos de luxo, toalha quente e cera artesanal.', price: '20€' },
    { num: '03', icon: '👑', name: 'Pacote Completo', desc: 'Corte + barba + hidratação facial. A experiência Elegance Studio na sua totalidade.', price: '35€' },
    { num: '04', icon: '💆', name: 'Hidratação Facial', desc: 'Tratamento facial profissional com produtos de haute gamme para pele radiante.', price: '25€' },
    { num: '05', icon: '🎨', name: 'Coloração', desc: 'Coloração profissional para cabelo e barba com produtos premium de longa duração.', price: '40€' },
    { num: '06', icon: '⚡', name: 'Corte Expresso', desc: 'Corte rápido e preciso para o homem que valoriza o tempo. Sem espera, sem compromissos.', price: '12€' },
  ]

  const gallery = [
    { label: 'O nosso espaço', icon: '📷', span: true },
    { label: 'Corte clássico', icon: '✂️' },
    { label: 'Barba premium', icon: '🪒' },
    { label: 'Pacote completo', icon: '👑' },
    { label: 'Detalhes', icon: '⭐' },
  ]

  return (
    <>
      {/* Custom Cursor */}
      <div ref={cursorRef} className="fixed w-2 h-2 bg-[#c8c8c8] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-200" />
      <div ref={ringRef} className="fixed w-9 h-9 border border-[#c8c8c8]/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2" />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-15 py-7 bg-gradient-to-b from-[#080808]/95 to-transparent">
        <a href="#" className="flex items-center">
          <img src="/logo.png" alt="Elegance Studio" className="h-12 w-auto invert opacity-80 hover:opacity-100 transition-opacity" />
        </a>
        <ul className="hidden md:flex gap-12 list-none">
          {['Serviços', 'Galeria', 'Contacto'].map(item => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className="text-[0.7rem] tracking-[0.25em] uppercase text-[#888] no-underline hover:text-[#e8e8e8] transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c8c8c8] group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
          <li>
            <a href="#agendar" className="text-[0.65rem] tracking-[0.2em] uppercase text-[#080808] bg-[#e8e8e8] px-6 py-2.5 no-underline hover:bg-[#888] transition-colors">
              Agendar
            </a>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-end px-15 pb-25 relative overflow-hidden" id="inicio">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(180,180,180,0.04)_0%,transparent_60%),radial-gradient(ellipse_at_20%_80%,rgba(120,120,120,0.06)_0%,transparent_50%),#080808]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(200,200,200,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,200,200,0.03) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

        <div className="absolute right-15 top-1/2 -translate-y-1/2 font-display font-light leading-none select-none pointer-events-none hidden lg:block"
          style={{ fontSize: 'clamp(180px,25vw,320px)', color: 'transparent', WebkitTextStroke: '1px rgba(200,200,200,0.06)' }}>
          ES
        </div>

        <div className="relative z-10 max-w-2xl fade-up hero-animate">
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#888] mb-8 flex items-center gap-4 before:block before:w-10 before:h-px before:bg-[#888]">
            Barbearia Premium · Lisboa
          </p>
          <h1 className="font-display font-light leading-[0.95] mb-10 tracking-tight" style={{ fontSize: 'clamp(56px,8vw,110px)' }}>
            A Arte<br />
            do <em className="italic text-[#888]">Corte</em><br />
            Perfeito
          </h1>
          <p className="text-[0.8rem] tracking-[0.12em] text-[#888] leading-[1.8] max-w-sm mb-14">
            Onde a tradição encontra a sofisticação. Cada detalhe pensado para a sua experiência.
          </p>
          <div className="flex items-center gap-10">
            <a href="#agendar" className="text-[0.65rem] tracking-[0.25em] uppercase text-[#080808] bg-[#e8e8e8] px-10 py-4 no-underline hover:bg-[#c8c8c8] hover:-translate-y-0.5 transition-all">
              Marcar Consulta
            </a>
            <a href="#servicos" className="text-[0.65rem] tracking-[0.25em] uppercase text-[#888] no-underline flex items-center gap-3 hover:text-[#e8e8e8] hover:gap-5 transition-all after:content-['→']">
              Ver Serviços
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 right-15 flex flex-col items-center gap-3 z-10">
          <div className="w-px h-15 bg-gradient-to-b from-[#888] to-transparent animate-scroll-pulse" />
          <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#888]" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        </div>
      </section>

      <div className="h-px mx-15 bg-gradient-to-r from-transparent via-[#c8c8c8]/15 to-transparent" />

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#c8c8c8]/8">
        {[
          { num: '12+', label: 'Anos de Experiência' },
          { num: '4k+', label: 'Clientes Satisfeitos' },
          { num: '5★', label: 'Avaliação Google' },
        ].map((s, i) => (
          <div key={s.num} className="bg-[#080808] px-10 py-12 text-center hover:bg-[#111] transition-colors fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="font-display font-light text-[#e8e8e8] leading-none mb-3" style={{ fontSize: 'clamp(48px,6vw,80px)' }}>{s.num}</div>
            <div className="text-[0.65rem] tracking-[0.3em] uppercase text-[#888]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="h-px mx-15 bg-gradient-to-r from-transparent via-[#c8c8c8]/15 to-transparent" />

      {/* SERVICES */}
      <section className="px-15 py-30" id="servicos">
        <div className="flex justify-between items-end mb-20">
          <div>
            <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#888] mb-5 flex items-center gap-4 before:block before:w-8 before:h-px before:bg-[#888]">
              O Que Oferecemos
            </p>
            <h2 className="font-display font-light leading-[1.1] text-[#e8e8e8]" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>
              Serviços &<br /><em className="italic text-[#888]">Preçário</em>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#c8c8c8]/8">
          {services.map((s, i) => (
            <div key={s.num} className="bg-[#080808] p-14 relative overflow-hidden hover:bg-[#111] transition-colors group fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#c8c8c8] group-hover:w-full transition-all duration-500" />
              <div className="font-display text-[0.9rem] text-[#c8c8c8]/20 mb-8 tracking-wider">{s.num}</div>
              <span className="text-4xl mb-6 block grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all">{s.icon}</span>
              <h3 className="font-display font-light text-[1.8rem] mb-4 text-[#e8e8e8]">{s.name}</h3>
              <p className="text-[0.75rem] text-[#888] leading-[1.8] mb-8 tracking-wide">{s.desc}</p>
              <div className="font-display font-light text-[2rem] text-[#c8c8c8]">
                {s.price} <span className="font-body text-[0.7rem] text-[#888] tracking-wider ml-1">/ sessão</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="pb-30" id="galeria">
        <div className="px-15 mb-15 fade-up">
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#888] mb-5 flex items-center gap-4 before:block before:w-8 before:h-px before:bg-[#888]">
            O Nosso Trabalho
          </p>
          <h2 className="font-display font-light text-[#e8e8e8]" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>Galeria</h2>
        </div>

        <div className="px-15 grid grid-cols-2 md:grid-cols-3 gap-1" style={{ gridTemplateRows: '300px 300px' }}>
          {gallery.map((g, i) => (
            <div key={i} className={`bg-[#1a1a1a] relative overflow-hidden group ${i === 0 ? 'row-span-2' : ''}`}>
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#1a1a1a] to-[#111] transition-transform duration-700 group-hover:scale-[1.03]">
                <span className="text-4xl opacity-20">{g.icon}</span>
                <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#888] opacity-40">Foto em breve</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6">
                <span className="font-display text-[1.2rem] italic text-[#e8e8e8]">{g.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section className="px-15 py-30 bg-[#111] relative overflow-hidden" id="agendar">
        <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 font-display font-light pointer-events-none select-none hidden lg:block"
          style={{ fontSize: 'clamp(100px,18vw,220px)', color: 'transparent', WebkitTextStroke: '1px rgba(200,200,200,0.04)', whiteSpace: 'nowrap' }}>
          AGENDAR
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-25 items-center relative z-10">
          <div>
            <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#888] mb-5 flex items-center gap-4 before:block before:w-8 before:h-px before:bg-[#888]">
              Reserva Online
            </p>
            <h2 className="font-display font-light text-[#e8e8e8] mb-8" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>
              Agende a Sua<br /><em className="italic text-[#888]">Visita</em>
            </h2>
            <p className="text-[0.75rem] text-[#888] leading-[1.8] tracking-wide max-w-xs mb-12">
              Reserve o seu lugar em poucos segundos. Confirmação imediata por SMS.
            </p>
            <div className="flex flex-col gap-5">
              {[['Horário', 'Seg — Sex: 9h — 20h'], ['Sábado', '9h — 18h']].map(([label, val]) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-px h-10 bg-[#c8c8c8]/20" />
                  <div>
                    <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#888] mb-1.5">{label}</p>
                    <p className="font-display font-light text-[1.1rem] text-[#e8e8e8]">{val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleBooking} className="flex flex-col">
            {[
              { id: 'nome', label: 'Nome Completo', type: 'text', placeholder: 'O seu nome' },
              { id: 'telefone', label: 'Telefone', type: 'tel', placeholder: '+351 9xx xxx xxx' },
              { id: 'data', label: 'Data Preferida', type: 'date', placeholder: '' },
            ].map((field, i) => (
              <div key={field.id} className={`relative border-b border-[#c8c8c8]/15 ${i === 0 ? 'border-t' : ''}`}>
                <label htmlFor={field.id} className="block text-[0.6rem] tracking-[0.3em] uppercase text-[#888] pt-5 pb-1.5">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  required
                  className="w-full bg-transparent border-none outline-none text-[#e8e8e8] font-body text-[0.85rem] pb-5 tracking-wide placeholder:text-[#888]/40"
                />
              </div>
            ))}
            <div className="relative border-b border-[#c8c8c8]/15">
              <label htmlFor="servico" className="block text-[0.6rem] tracking-[0.3em] uppercase text-[#888] pt-5 pb-1.5">
                Serviço
              </label>
              <select id="servico" name="servico" required
                className="w-full bg-transparent border-none outline-none text-[#e8e8e8] font-body text-[0.85rem] pb-5 tracking-wide">
                <option value="" className="bg-[#111]">Seleccione um serviço</option>
                <option value="corte" className="bg-[#111]">Corte Clássico — 15€</option>
                <option value="barba" className="bg-[#111]">Barba Premium — 20€</option>
                <option value="completo" className="bg-[#111]">Pacote Completo — 35€</option>
                <option value="facial" className="bg-[#111]">Hidratação Facial — 25€</option>
                <option value="coloracao" className="bg-[#111]">Coloração — 40€</option>
                <option value="expresso" className="bg-[#111]">Corte Expresso — 12€</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={formStatus !== 'idle'}
              className="mt-12 self-start bg-[#e8e8e8] text-[#080808] px-12 py-4 font-body text-[0.65rem] tracking-[0.3em] uppercase hover:bg-[#c8c8c8] hover:-translate-y-0.5 transition-all disabled:bg-[#888]"
            >
              {formStatus === 'idle' && 'Confirmar Agendamento'}
              {formStatus === 'sending' && 'A enviar...'}
              {formStatus === 'sent' && '✓ Agendamento Enviado'}
            </button>
          </form>
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-15 py-30 grid grid-cols-1 md:grid-cols-2 gap-25 items-start" id="contacto">
        <div className="flex flex-col gap-12 fade-up">
          <div>
            <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#888] mb-5 flex items-center gap-4 before:block before:w-8 before:h-px before:bg-[#888]">
              Encontre-nos
            </p>
            <h2 className="font-display font-light text-[#e8e8e8]" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>Contacto</h2>
          </div>
          {[
            { label: 'Morada', value: 'Rua da Elegância, 42\n1200-000 Lisboa' },
            { label: 'Telefone', value: '+351 912 345 678' },
            { label: 'Email', value: 'info@elegancestudio.pt' },
          ].map(c => (
            <div key={c.label}>
              <p className="text-[0.6rem] tracking-[0.35em] uppercase text-[#888] mb-3">{c.label}</p>
              <p className="font-display font-light text-[1.4rem] text-[#e8e8e8] leading-snug whitespace-pre-line">{c.value}</p>
            </div>
          ))}
        </div>

        <div className="h-[400px] bg-[#1a1a1a] border border-[#c8c8c8]/8 flex flex-col items-center justify-center gap-4 fade-up">
          <span className="text-4xl opacity-30">📍</span>
          <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[#888] opacity-50">Mapa — Em breve</span>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-15 py-15 border-t border-[#c8c8c8]/8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center">
          <img src="/logo.png" alt="Elegance Studio" className="h-8 w-auto invert opacity-40 hover:opacity-70 transition-opacity" />
        </div>
        <div className="text-[0.6rem] tracking-[0.2em] text-[#c8c8c8]/25">© 2025 Elegance Studio. Todos os direitos reservados.</div>
        <div className="flex gap-6">
          {['Instagram', 'Facebook', 'WhatsApp'].map(s => (
            <a key={s} href="#" className="text-[0.6rem] tracking-[0.2em] uppercase text-[#888] no-underline hover:text-[#e8e8e8] transition-colors">{s}</a>
          ))}
        </div>
      </footer>
    </>
  )
}
