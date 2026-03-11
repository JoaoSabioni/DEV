'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const BARBEIROS = [
  {
    nome: 'Edi',
    cargo: 'Fundador',
    foto: '/Fotos_edi/edi2.png',
    whatsapp: '351912345678',
    instagram: 'edi.elegance',
  },
  {
    nome: 'Tomas',
    cargo: 'Colaborador',
    foto: '/Fotos_Tomas/tomas2.png',
    whatsapp: '351923456789',
    instagram: 'tomas.elegance',
  },
  {
    nome: 'Abreu',
    cargo: 'Colaborador',
    foto: '/Fotos_Abreu/abreu1.png',
    whatsapp: '351934567890',
    instagram: 'abreu.elegance',
  },
]

const SERVICOS = [
  'Sobrancelhas — 3€',
  'Barba — 6€',
  'Corte Simples — 10€',
  'Corte / Degradê — 15€',
  'Corte & Barba — 17€',
]

// Serviços que conflituam entre si (só um por grupo pode estar ativo)
const CONFLITOS: Record<string, string[]> = {
  'Corte Simples — 10€':   ['Corte / Degradê — 15€', 'Corte & Barba — 17€'],
  'Corte / Degradê — 15€': ['Corte Simples — 10€',   'Corte & Barba — 17€'],
  'Corte & Barba — 17€':   ['Corte Simples — 10€',   'Corte / Degradê — 15€', 'Barba — 6€'],
  'Barba — 6€':            ['Corte & Barba — 17€'],
}

const HORARIOS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
]

export default function PageContactar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedBarbeiro, setSelectedBarbeiro] = useState<number | null>(null)
  const [selectedServicos, setSelectedServicos] = useState<string[]>([])
  const [nome, setNome] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [dia, setDia] = useState('')
  const [mes, setMes] = useState('')
  const [ano, setAno] = useState('')
  const [horario, setHorario] = useState('')
  const [horarioOpen, setHorarioOpen] = useState(false)

  const barbeiro = selectedBarbeiro !== null ? BARBEIROS[selectedBarbeiro] : null

  const hoje = new Date()
  const amanha = new Date(hoje)
  amanha.setDate(hoje.getDate() + 1)

  const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
  const DIAS_SEMANA = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado']

  const diasNoMes = (m: string, a: string) => {
    if (!m || !a) return 31
    return new Date(parseInt(a), parseInt(m), 0).getDate()
  }

  const isDiaValido = (d: string, m: string, a: string) => {
    if (!d || !m || !a) return true
    const dt = new Date(parseInt(a), parseInt(m) - 1, parseInt(d))
    return dt >= amanha
  }

  const dataLabel = (() => {
    if (!dia || !mes || !ano) return ''
    const dt = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia))
    return `${DIAS_SEMANA[dt.getDay()]}, ${dia} de ${MESES[parseInt(mes)-1]} de ${ano}`
  })()

  const dataFormatada = dia && mes && ano ? `${dia}/${mes}/${ano}` : ''

  const anosDisponiveis = (() => {
    const a = []
    for (let i = hoje.getFullYear(); i <= hoje.getFullYear() + 1; i++) a.push(i)
    return a
  })()

  const isDisabled = (s: string) => {
    const conflitos = CONFLITOS[s] ?? []
    return conflitos.some((c) => selectedServicos.includes(c))
  }

  const toggleServico = (s: string) => {
    if (isDisabled(s)) return
    setSelectedServicos((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    )
  }
  const buildWhatsAppMsg = () => {
    const servicosLine = selectedServicos.length > 0
      ? `Tenho interesse nos serviços: *${selectedServicos.join(', ')}*`
      : ''
    const linhas = [
      `Olá ${barbeiro?.nome},`,
      ``,
      `O meu nome é *${nome || '(sem nome)'}*.`,
      servicosLine,
      dataFormatada ? `Data pretendida: *${dataFormatada}${horario ? ` às ${horario}` : ''}*` : '',
      mensagem ? `\n${mensagem}` : '',
      ``,
      `Gostava de marcar uma consulta. Obrigado.`,
    ].filter((l) => l !== '')
    return encodeURIComponent(linhas.join('\n'))
  }

  const handleWhatsApp = () => {
    if (!barbeiro) return
    const url = `https://wa.me/${barbeiro.whatsapp}?text=${buildWhatsAppMsg()}`
    window.open(url, '_blank')
  }

  const handleInstagram = () => {
    if (!barbeiro) return
    window.open(`https://instagram.com/${barbeiro.instagram}`, '_blank')
  }

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
            <Link href="/galeria" className="text-[12px] tracking-[0.2em] uppercase font-semibold text-zinc-400 hover:text-white transition-colors">Galeria</Link>
            <Link href="/contactar" className="text-[11px] tracking-[0.2em] uppercase text-black bg-white px-6 py-2.5 font-bold hover:bg-zinc-200 transition-all">CONTACTO</Link>
          </div>
          <button className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px]" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-64' : 'max-h-0'} bg-black/98 border-t border-white/5`}>
          <div className="flex flex-col px-6 py-6 gap-6">
            <Link href="/servicos" onClick={() => setMenuOpen(false)} className="text-[12px] tracking-[0.3em] uppercase font-semibold text-zinc-400 hover:text-white transition-colors">Serviços</Link>
            <Link href="/galeria" onClick={() => setMenuOpen(false)} className="text-[12px] tracking-[0.3em] uppercase font-semibold text-zinc-400 hover:text-white transition-colors">Galeria</Link>
            <Link href="/contactar" onClick={() => setMenuOpen(false)} className="text-[11px] tracking-[0.3em] uppercase text-black bg-white px-6 py-3 font-bold text-center hover:bg-zinc-200 transition-all">CONTACTO</Link>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <section className="pt-36 md:pt-44 pb-16 md:pb-20 px-6 md:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 text-zinc-400 text-[11px] tracking-[0.5em] uppercase mb-8">
            <span className="w-12 h-px bg-zinc-500" /> PINHAL NOVO · EST. 2025
          </div>
          <h1 className="font-serif text-[clamp(3rem,10vw,120px)] leading-[0.85] font-medium uppercase tracking-tighter">
            CONTACTAR
          </h1>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="px-6 md:px-8 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Coluna esquerda */}
          <div className="flex flex-col gap-12">

            {/* Passo 1 — Barbeiro */}
            <div>
              <p className="text-[10px] tracking-[0.8em] text-zinc-300 uppercase mb-6">
                01 · Escolhe o barbeiro
              </p>
              <div className="flex flex-col gap-3">
                {BARBEIROS.map((b, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedBarbeiro(i)}
                    className={`flex items-center gap-5 px-6 py-5 border transition-all duration-300 text-left
                      ${selectedBarbeiro === i
                        ? 'border-white bg-white/5'
                        : 'border-white/10 hover:border-white/30'
                      }`}
                  >
                    <div className="relative w-12 h-12 shrink-0 overflow-hidden">
                      <Image src={b.foto} alt={b.nome} fill className="object-cover object-top" />
                    </div>
                    <div>
                      <p className="font-serif text-lg uppercase tracking-tight">{b.nome}</p>
                      <p className="text-[10px] tracking-[0.4em] text-zinc-300 uppercase">{b.cargo}</p>
                    </div>
                    {selectedBarbeiro === i && (
                      <span className="ml-auto text-[10px] tracking-[0.3em] text-zinc-400 uppercase">Selecionado</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Passo 2 — Serviços (multi-select) */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-[10px] tracking-[0.8em] text-zinc-300 uppercase">
                  02 · Serviço (opcional)
                </p>
                {selectedServicos.length > 0 && (
                  <span className="text-[10px] tracking-[0.3em] text-zinc-400 uppercase">
                    {selectedServicos.length} selecionado{selectedServicos.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {SERVICOS.map((s, i) => {
                  const isSelected = selectedServicos.includes(s)
                  const disabled = isDisabled(s)
                  return (
                    <button
                      key={i}
                      onClick={() => toggleServico(s)}
                      disabled={disabled}
                      title={disabled ? 'Incompatível com o serviço selecionado' : undefined}
                      className={`flex items-center justify-between px-6 py-4 border text-left text-[12px] tracking-[0.1em] transition-all duration-300
                        ${isSelected
                          ? 'border-white text-white bg-white/5'
                          : disabled
                            ? 'border-white/5 text-zinc-600 cursor-not-allowed opacity-40'
                            : 'border-white/20 text-zinc-300 hover:border-white/50 hover:text-white cursor-pointer'
                        }`}
                    >
                      <span>{s}</span>
                      <span className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-all duration-300
                        ${isSelected ? 'border-white bg-white' : disabled ? 'border-white/10' : 'border-white/20'}`}>
                        {isSelected && (
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Passo 3 — Nome */}
            <div>
              <p className="text-[10px] tracking-[0.8em] text-zinc-300 uppercase mb-6">
                03 · O teu nome
              </p>
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full bg-transparent border border-white/20 focus:border-white/60 outline-none px-6 py-4 text-[13px] tracking-wider text-white placeholder:text-zinc-500 transition-all"
              />
            </div>

            {/* Passo 4 — Data */}
            <div>
              <p className="text-[10px] tracking-[0.8em] text-zinc-300 uppercase mb-6">
                04 · Data pretendida (opcional)
              </p>
              <div className="grid grid-cols-3 gap-3">
                {/* Dia */}
                <select
                  value={dia}
                  onChange={(e) => { setDia(e.target.value) }}
                  className="bg-black border border-white/20 focus:border-white/60 outline-none px-4 py-4 text-[12px] tracking-wider text-white transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="text-zinc-500">Dia</option>
                  {Array.from({ length: diasNoMes(mes, ano) }, (_, i) => i + 1).map((d) => {
                    const dStr = String(d).padStart(2, '0')
                    const valido = isDiaValido(dStr, mes, ano)
                    return (
                      <option key={d} value={dStr} disabled={!valido} className={valido ? 'text-white' : 'text-zinc-600'}>
                        {dStr}
                      </option>
                    )
                  })}
                </select>
                {/* Mês */}
                <select
                  value={mes}
                  onChange={(e) => { setMes(e.target.value); setDia('') }}
                  className="bg-black border border-white/20 focus:border-white/60 outline-none px-4 py-4 text-[12px] tracking-wider text-white transition-all appearance-none cursor-pointer"
                >
                  <option value="">Mês</option>
                  {MESES.map((m, i) => (
                    <option key={i} value={String(i + 1).padStart(2, '0')}>{m}</option>
                  ))}
                </select>
                {/* Ano */}
                <select
                  value={ano}
                  onChange={(e) => { setAno(e.target.value); setDia('') }}
                  className="bg-black border border-white/20 focus:border-white/60 outline-none px-4 py-4 text-[12px] tracking-wider text-white transition-all appearance-none cursor-pointer"
                >
                  <option value="">Ano</option>
                  {anosDisponiveis.map((a) => (
                    <option key={a} value={String(a)}>{a}</option>
                  ))}
                </select>
              </div>
              {dataLabel && (
                <p className="text-[10px] tracking-[0.3em] text-zinc-400 uppercase mt-3">{dataLabel}</p>
              )}
            </div>

            {/* Passo 5 — Horário */}
            <div>
              <p className="text-[10px] tracking-[0.8em] text-zinc-300 uppercase mb-6">
                05 · Horário pretendido (opcional)
              </p>
              <button
                onClick={() => setHorarioOpen(!horarioOpen)}
                className="w-full flex items-center justify-between px-6 py-5 border border-white/20 hover:border-white/40 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <span className="text-[12px] tracking-[0.2em] uppercase text-zinc-300 group-hover:text-white transition-colors">
                    {horario ? horario : 'Escolher horário'}
                  </span>
                </div>
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className={`text-zinc-500 transition-transform duration-300 ${horarioOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <div className={`overflow-hidden transition-all duration-500 ${horarioOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="border border-t-0 border-white/20 px-6 py-5">
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {HORARIOS.map((h) => (
                      <button
                        key={h}
                        onClick={() => { setHorario(horario === h ? '' : h); setHorarioOpen(false) }}
                        className={`py-3 border text-[11px] tracking-[0.15em] transition-all duration-200
                          ${horario === h
                            ? 'border-white bg-white text-black font-semibold'
                            : 'border-white/15 text-zinc-400 hover:border-white/50 hover:text-white'
                          }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Passo 6 — Mensagem extra */}
            <div>
              <p className="text-[10px] tracking-[0.8em] text-zinc-300 uppercase mb-6">
                06 · Mensagem adicional (opcional)
              </p>
              <textarea
                placeholder="Acrescenta alguma informação..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                rows={3}
                className="w-full bg-transparent border border-white/20 focus:border-white/60 outline-none px-6 py-4 text-[13px] tracking-wider text-white placeholder:text-zinc-500 transition-all resize-none"
              />
            </div>

          </div>

          {/* Coluna direita — botões de envio */}
          <div className="flex flex-col justify-start lg:pt-14 gap-8">

            <div className="border-b border-white/5 pb-10">
              <h2 className="font-serif text-[clamp(2rem,4vw,48px)] uppercase tracking-tighter leading-tight mb-4">
                Envia a<br />tua mensagem
              </h2>
              <p className="text-[12px] text-zinc-300 tracking-wider leading-relaxed">
                Seleciona o barbeiro, o serviço pretendido e envia diretamente via WhatsApp ou Instagram.
              </p>
            </div>

            {/* Preview da mensagem */}
            {barbeiro && (
              <div className="border border-white/20 p-6 bg-white/[0.03]">
                <p className="text-[9px] tracking-[0.6em] text-zinc-400 uppercase mb-4">Pré-visualização</p>
                <p className="text-[12px] text-zinc-200 leading-relaxed whitespace-pre-line">
                  {[
                    `Olá ${barbeiro.nome},`,
                    ``,
                    `O meu nome é ${nome || '(sem nome)'}.`,
                    selectedServicos.length > 0 ? `Tenho interesse nos serviços: ${selectedServicos.join(', ')}` : '',
                    dataLabel ? `Data pretendida: ${dataLabel}${horario ? ` às ${horario}` : ''}` : '',
                    mensagem || '',
                    ``,
                    `Gostava de marcar. Obrigado.`,
                  ].filter((l) => l !== '').join('\n')}
                </p>
              </div>
            )}

            {/* Botões */}
            <div className="flex flex-col gap-4">
              <button
                onClick={handleWhatsApp}
                disabled={!barbeiro}
                className={`flex items-center justify-between px-8 py-6 border transition-all duration-300 group
                  ${barbeiro
                    ? 'border-white/20 hover:bg-white hover:text-black cursor-pointer'
                    : 'border-white/5 text-zinc-700 cursor-not-allowed'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span className="text-[11px] tracking-[0.3em] uppercase font-semibold">Enviar via WhatsApp</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-40 group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={handleInstagram}
                disabled={!barbeiro}
                className={`flex items-center justify-between px-8 py-6 border transition-all duration-300 group
                  ${barbeiro
                    ? 'border-white/20 hover:bg-white hover:text-black cursor-pointer'
                    : 'border-white/5 text-zinc-700 cursor-not-allowed'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  <span className="text-[11px] tracking-[0.3em] uppercase font-semibold">Abrir Instagram</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-40 group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {!barbeiro && (
              <p className="text-[11px] text-zinc-400 tracking-wider">
                ← Seleciona um barbeiro para continuar
              </p>
            )}

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 px-6 md:px-8 border-t border-white/5 text-center bg-zinc-950/30">
        <p className="text-[10px] tracking-[0.6em] md:tracking-[0.8em] text-zinc-500 uppercase">ELEGANCE STUDIO © 2026 · PINHAL NOVO · PORTUGAL</p>
      </footer>
    </div>
  )
}