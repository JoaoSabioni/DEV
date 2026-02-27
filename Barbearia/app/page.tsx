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

  return (
    <div style={{ background: '#080808', color: '#e8e8e8', fontFamily: "'Didact Gothic', sans-serif", overflowX: 'hidden' }}>

      {/* Custom Cursor */}
      <div ref={cursorRef} style={{ position: 'fixed', width: 8, height: 8, background: '#c8c8c8', borderRadius: '50%', pointerEvents: 'none', zIndex: 9999, transform: 'translate(-50%,-50%)', transition: 'width .2s,height .2s' }} />
      <div ref={ringRef} style={{ position: 'fixed', width: 36, height: 36, border: '1px solid rgba(200,200,200,0.4)', borderRadius: '50%', pointerEvents: 'none', zIndex: 9998, transform: 'translate(-50%,-50%)' }} />

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px 60px', background: 'linear-gradient(to bottom, rgba(8,8,8,0.95), transparent)' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="Elegance Studio" style={{ height: 48, width: 'auto', filter: 'invert(1)', opacity: 0.8 }} />
        </a>
        <div style={{ display: 'flex', gap: 48, alignItems: 'center' }}>
          {['Serviços', 'Galeria', 'Contacto'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#888', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#e8e8e8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
              {item}
            </a>
          ))}
          <a href="#agendar" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#080808', background: '#e8e8e8', padding: '10px 24px', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#c8c8c8')}
            onMouseLeave={e => (e.currentTarget.style.background = '#e8e8e8')}>
            Agendar
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section id="inicio" style={{ minHeight: '100vh', display: 'flex', alignItems: 'flex-end', padding: '0 60px 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 40%, rgba(180,180,180,0.04) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(120,120,120,0.06) 0%, transparent 50%), #080808' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,200,200,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,200,200,0.03) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', right: 60, top: '50%', transform: 'translateY(-50%)', fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(180px,25vw,320px)', fontWeight: 300, color: 'transparent', WebkitTextStroke: '1px rgba(200,200,200,0.06)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>ES</div>

        <div className="fade-up hero-animate" style={{ position: 'relative', zIndex: 2, maxWidth: 700 }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#888', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ display: 'block', width: 40, height: 1, background: '#888' }} />
            Barbearia Premium · Lisboa
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(56px,8vw,110px)', fontWeight: 300, lineHeight: 0.95, marginBottom: 40, letterSpacing: '-0.01em' }}>
            A Arte<br />do <em style={{ fontStyle: 'italic', color: '#888' }}>Corte</em><br />Perfeito
          </h1>
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.12em', color: '#888', lineHeight: 1.8, maxWidth: 400, marginBottom: 56 }}>
            Onde a tradição encontra a sofisticação. Cada detalhe pensado para a sua experiência.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            <a href="#agendar" style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#080808', background: '#e8e8e8', padding: '16px 40px', textDecoration: 'none', transition: 'background .3s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#c8c8c8')}
              onMouseLeave={e => (e.currentTarget.style.background = '#e8e8e8')}>
              Marcar Consulta
            </a>
            <a href="#servicos" style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#888', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#e8e8e8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
              Ver Serviços →
            </a>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 40, right: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, zIndex: 2 }}>
          <div className="animate-scroll-pulse" style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, #888, transparent)' }} />
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888', writingMode: 'vertical-rl' }}>Scroll</span>
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ height: 1, margin: '0 60px', background: 'linear-gradient(to right, transparent, rgba(200,200,200,0.15), transparent)' }} />

      {/* STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(200,200,200,0.08)' }}>
        {[{ num: '12+', label: 'Anos de Experiência' }, { num: '4k+', label: 'Clientes Satisfeitos' }, { num: '5★', label: 'Avaliação Google' }].map((s, i) => (
          <div key={i} className="fade-up" style={{ background: '#080808', padding: '48px 40px', textAlign: 'center', transitionDelay: `${i * 0.1}s` }}
            onMouseEnter={e => (e.currentTarget.style.background = '#111')}
            onMouseLeave={e => (e.currentTarget.style.background = '#080808')}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(48px,6vw,80px)', fontWeight: 300, lineHeight: 1, marginBottom: 12 }}>{s.num}</div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 1, margin: '0 60px', background: 'linear-gradient(to right, transparent, rgba(200,200,200,0.15), transparent)' }} />

      {/* SERVICES */}
      <section id="servicos" style={{ padding: '120px 60px' }}>
        <div style={{ marginBottom: 80 }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#888', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ display: 'block', width: 30, height: 1, background: '#888' }} />
            O Que Oferecemos
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 300, lineHeight: 1.1 }}>
            Serviços &<br /><em style={{ fontStyle: 'italic', color: '#888' }}>Preçário</em>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(200,200,200,0.08)' }}>
          {services.map((s, i) => (
            <div key={i} className="fade-up" style={{ background: '#080808', padding: '56px 40px', position: 'relative', overflow: 'hidden', transitionDelay: `${i * 0.1}s`, transition: 'background .4s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#111')}
              onMouseLeave={e => (e.currentTarget.style.background = '#080808')}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: 'rgba(200,200,200,0.2)', marginBottom: 32, letterSpacing: '0.1em' }}>{s.num}</div>
              <span style={{ fontSize: '2rem', marginBottom: 24, display: 'block' }}>{s.icon}</span>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 300, marginBottom: 16 }}>{s.name}</h3>
              <p style={{ fontSize: '0.75rem', color: '#888', lineHeight: 1.8, marginBottom: 32, letterSpacing: '0.05em' }}>{s.desc}</p>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, color: '#c8c8c8' }}>
                {s.price} <span style={{ fontFamily: "'Didact Gothic', sans-serif", fontSize: '0.7rem', color: '#888', marginLeft: 4 }}>/ sessão</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="galeria" style={{ paddingBottom: 120 }}>
        <div className="fade-up" style={{ padding: '0 60px', marginBottom: 60 }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#888', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ display: 'block', width: 30, height: 1, background: '#888' }} />
            O Nosso Trabalho
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 300 }}>Galeria</h2>
        </div>
        <div style={{ padding: '0 60px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '300px 300px', gap: 4 }}>
          {[
            { label: 'O nosso espaço', icon: '📷', rowSpan: true },
            { label: 'Corte clássico', icon: '✂️' },
            { label: 'Barba premium', icon: '🪒' },
            { label: 'Pacote completo', icon: '👑' },
            { label: 'Detalhes', icon: '⭐' },
          ].map((g, i) => (
            <div key={i} style={{ gridRow: i === 0 ? 'span 2' : 'auto', background: '#1a1a1a', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => { const ov = e.currentTarget.querySelector('.gal-overlay') as HTMLElement; if (ov) ov.style.opacity = '1' }}
              onMouseLeave={e => { const ov = e.currentTarget.querySelector('.gal-overlay') as HTMLElement; if (ov) ov.style.opacity = '0' }}>
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, background: 'linear-gradient(135deg,#1a1a1a,#111)' }}>
                <span style={{ fontSize: '2rem', opacity: 0.2 }}>{g.icon}</span>
                <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888', opacity: 0.4 }}>Foto em breve</span>
              </div>
              <div className="gal-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,8,0.8),transparent)', opacity: 0, transition: 'opacity .4s', display: 'flex', alignItems: 'flex-end', padding: 24 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontStyle: 'italic' }}>{g.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section id="agendar" style={{ padding: '120px 60px', background: '#111', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(100px,18vw,220px)', fontWeight: 300, color: 'transparent', WebkitTextStroke: '1px rgba(200,200,200,0.04)', pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap' }}>AGENDAR</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center', position: 'relative', zIndex: 2 }}>
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#888', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ display: 'block', width: 30, height: 1, background: '#888' }} />
              Reserva Online
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 300, lineHeight: 1.1, marginBottom: 32 }}>
              Agende a Sua<br /><em style={{ fontStyle: 'italic', color: '#888' }}>Visita</em>
            </h2>
            <p style={{ fontSize: '0.75rem', color: '#888', lineHeight: 1.8, maxWidth: 320, marginBottom: 48 }}>Reserve o seu lugar em poucos segundos. Confirmação imediata por SMS.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[['Horário', 'Seg — Sex: 9h — 20h'], ['Sábado', '9h — 18h']].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 1, height: 40, background: 'rgba(200,200,200,0.2)' }} />
                  <div>
                    <p style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888', marginBottom: 6 }}>{label}</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 300 }}>{val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { id: 'nome', label: 'Nome Completo', type: 'text', placeholder: 'O seu nome' },
              { id: 'telefone', label: 'Telefone', type: 'tel', placeholder: '+351 9xx xxx xxx' },
              { id: 'data', label: 'Data Preferida', type: 'date', placeholder: '' },
            ].map((field, i) => (
              <div key={field.id} style={{ borderBottom: '1px solid rgba(200,200,200,0.15)', borderTop: i === 0 ? '1px solid rgba(200,200,200,0.15)' : 'none' }}>
                <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888', paddingTop: 20, paddingBottom: 6 }}>{field.label}</label>
                <input type={field.type} id={field.id} name={field.id} placeholder={field.placeholder} required
                  style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: '#e8e8e8', fontFamily: "'Didact Gothic', sans-serif", fontSize: '0.85rem', paddingBottom: 20, letterSpacing: '0.05em' }} />
              </div>
            ))}
            <div style={{ borderBottom: '1px solid rgba(200,200,200,0.15)' }}>
              <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888', paddingTop: 20, paddingBottom: 6 }}>Serviço</label>
              <select id="servico" name="servico" required
                style={{ width: '100%', background: '#111', border: 'none', outline: 'none', color: '#e8e8e8', fontFamily: "'Didact Gothic', sans-serif", fontSize: '0.85rem', paddingBottom: 20 }}>
                <option value="">Seleccione um serviço</option>
                <option value="corte">Corte Clássico — 15€</option>
                <option value="barba">Barba Premium — 20€</option>
                <option value="completo">Pacote Completo — 35€</option>
                <option value="facial">Hidratação Facial — 25€</option>
                <option value="coloracao">Coloração — 40€</option>
                <option value="expresso">Corte Expresso — 12€</option>
              </select>
            </div>
            <button type="submit" disabled={formStatus !== 'idle'}
              style={{ marginTop: 48, alignSelf: 'flex-start', background: formStatus === 'sent' ? '#888' : '#e8e8e8', color: '#080808', border: 'none', padding: '18px 48px', fontFamily: "'Didact Gothic', sans-serif", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer', transition: 'background .3s' }}>
              {formStatus === 'idle' && 'Confirmar Agendamento'}
              {formStatus === 'sending' && 'A enviar...'}
              {formStatus === 'sent' && '✓ Agendamento Enviado'}
            </button>
          </form>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contacto" style={{ padding: '120px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'start' }}>
        <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#888', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ display: 'block', width: 30, height: 1, background: '#888' }} />
              Encontre-nos
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 300 }}>Contacto</h2>
          </div>
          {[
            { label: 'Morada', value: 'Rua da Elegância, 42\n1200-000 Lisboa' },
            { label: 'Telefone', value: '+351 912 345 678' },
            { label: 'Email', value: 'info@elegancestudio.pt' },
          ].map(c => (
            <div key={c.label}>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>{c.label}</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 300, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{c.value}</p>
            </div>
          ))}
        </div>
        <div className="fade-up" style={{ height: 400, background: '#1a1a1a', border: '1px solid rgba(200,200,200,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <span style={{ fontSize: '2rem', opacity: 0.3 }}>📍</span>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888', opacity: 0.5 }}>Mapa — Em breve</span>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px', borderTop: '1px solid rgba(200,200,200,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
        <img src="/logo.png" alt="Elegance Studio" style={{ height: 32, width: 'auto', filter: 'invert(1)', opacity: 0.4 }} />
        <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(200,200,200,0.25)' }}>© 2025 Elegance Studio. Todos os direitos reservados.</div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Instagram', 'Facebook', 'WhatsApp'].map(s => (
            <a key={s} href="#" style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#e8e8e8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#888')}>{s}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}
