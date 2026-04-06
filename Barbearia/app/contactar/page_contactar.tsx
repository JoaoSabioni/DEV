'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../components/Navbar'

const BARBEIROS = [
  { nome: 'Edi', cargo: 'Fundador', foto: '/Fotos_edi/edi2.png', whatsapp: '351933320269', instagram: 'edi.elegance' },
  { nome: 'Tomas', cargo: 'Colaborador', foto: '/Fotos_Tomas/tomas2.png', whatsapp: '351914302079', instagram: 'tomas.elegance' },
  { nome: 'Abreu', cargo: 'Colaborador', foto: '/Fotos_Abreu/abreuPrincipal.jpg', whatsapp: '351913388301', instagram: 'abreu.elegance' },
]

const SERVICOS = [
  'Sobrancelhas — 3€',
  'Barba — 6€',
  'Corte Simples — 10€',
  'Corte / Degradê — 15€',
  'Corte & Barba — 17€',
]

const CONFLITOS: Record<string, string[]> = {
  'Corte Simples — 10€':    ['Corte / Degradê — 15€', 'Corte & Barba — 17€'],
  'Corte / Degradê — 15€':  ['Corte Simples — 10€',   'Corte & Barba — 17€'],
  'Corte & Barba — 17€':    ['Corte Simples — 10€',   'Corte / Degradê — 15€', 'Barba — 6€'],
  'Barba — 6€':             ['Corte & Barba — 17€'],
}

const HORARIOS = [
  '09:00','09:30','10:00','10:30','11:00','11:30',
  '12:00','12:30','14:00','14:30','15:00','15:30',
  '16:00','16:30','17:00','17:30','18:00','18:30',
]

export default function PageContactar() {
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

  const diasNoMes = (m: string, a: string) => (!m || !a) ? 31 : new Date(parseInt(a), parseInt(m), 0).getDate()

  const isDiaValido = (d: string, m: string, a: string) => {
    if (!d || !m || !a) return true
    return new Date(parseInt(a), parseInt(m) - 1, parseInt(d)) >= amanha
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

  const isDisabled = (s: string) => (CONFLITOS[s] ?? []).some((c) => selectedServicos.includes(c))

  const toggleServico = (s: string) => {
    if (isDisabled(s)) return
    setSelectedServicos((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s])
  }

  const buildWhatsAppMsg = () => {
    const linhas = [
      `Olá ${barbeiro?.nome},`,
      ``,
      `O meu nome é *${nome || '(sem nome)'}*.`,
      selectedServicos.length > 0 ? `Tenho interesse nos serviços: *${selectedServicos.join(', ')}*` : '',
      dataFormatada ? `Data pretendida: *${dataFormatada}${horario ? ` às ${horario}` : ''}*` : '',
      mensagem ? `\n${mensagem}` : '',
      ``,
      `Gostava de marcar uma consulta. Obrigado.`,
    ].filter((l) => l !== '')
    return encodeURIComponent(linhas.join('\n'))
  }

  const handleWhatsApp = () => {
    if (!barbeiro) return
    window.open(`https://wa.me/${barbeiro.whatsapp}?text=${buildWhatsAppMsg()}`, '_blank')
  }

  const handleInstagram = () => {
    if (!barbeiro) return
    window.open(`https://instagram.com/${barbeiro.instagram}`, '_blank')
  }

  return (
    <div className="bg-black text-whitDe font-sans selection:bg-white selection:text-black min-h-screen overflow-x-hidden">

      <Navbar activePage="contactar" />

      {/* Page Header */}
      <section className="pt-36 md:pt-44 pb-16 md:pb-20 px-6 md:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 text-zinc-400 text-[11px] tracking-[0.5em] uppercase mb-8">
            <span className="w-12 h-px bg-zinc-500" /> PINHAL NOVO · EST. 2025
          </div>
          <h1 className="font-serif text-[clamp(3rem,10vw,120px)] leading-[0.85] font-medium uppercase tracking-tighter">CONTACTAR</h1>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="px-6 md:px-8 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Esquerda — passos */}
          <div className="flex flex-col gap-12">

            {/* 01 Barbeiro */}
            <div>
              <p className="text-[10px] tracking-[0.8em] text-zinc-300 uppercase mb-6">01 · Escolhe o barbeiro</p>
              <div className="flex flex-col gap-3">
                {BARBEIROS.map((b, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedBarbeiro(i)}
                    className={`flex items-center gap-5 px-6 py-5 border transition-all duration-300 text-left
                      ${selectedBarbeiro === i ? 'border-white bg-white/5' : 'border-white/10 hover:border-white/30'}`}
                  >
                    <div className="relative w-12 h-12 shrink-0 overflow-hidden">
                      <Image src={b.foto} alt={b.nome} fill className="object-cover object-top" />
                    </div>
                    <div>
                      <p className="font-serif text-lg uppercase tracking-tight">{b.nome}</p>
                      <p className="text-[10px] tracking-[0.4em] text-zinc-300 uppercase">{b.cargo}</p>
                    </div>
                    {selectedBarbeiro === i && <span className="ml-auto text-[10px] tracking-[0.3em] text-zinc-400 uppercase">Selecionado</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* 02 Serviços */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-[10px] tracking-[0.8em] text-zinc-300 uppercase">02 · Serviço (opcional)</p>
                {selectedServicos.length > 0 && (
                  <span className="text-[10px] tracking-[0.3em] text-zinc-400 uppercase">{selectedServicos.length} selecionado{selectedServicos.length > 1 ? 's' : ''}</span>
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
                        ${isSelected ? 'border-white text-white bg-white/5'
                          : disabled ? 'border-white/5 text-zinc-600 cursor-not-allowed opacity-40'
                          : 'border-white/20 text-zinc-300 hover:border-white/50 hover:text-white cursor-pointer'}`}
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

            {/* 03 Nome */}
            <div>
              <p className="text-[10px] tracking-[0.8em] text-zinc-300 uppercase mb-6">03 · O teu nome</p>
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full bg-transparent border border-white/20 focus:border-white/60 outline-none px-6 py-4 text-[13px] tracking-wider text-white placeholder:text-zinc-500 transition-all"
              />
            </div>

            {/* 04 Data */}
            <div>
              <p className="text-[10px] tracking-[0.8em] text-zinc-300 uppercase mb-6">04 · Data pretendida (opcional)</p>
              <div className="grid grid-cols-3 gap-3">
                <select value={dia} onChange={(e) => setDia(e.target.value)} className="bg-black border border-white/20 focus:border-white/60 outline-none px-4 py-4 text-[12px] tracking-wider text-white transition-all appearance-none cursor-pointer">
                  <option value="">Dia</option>
                  {Array.from({ length: diasNoMes(mes, ano) }, (_, i) => i + 1).map((d) => {
                    const dStr = String(d).padStart(2, '0')
                    const valido = isDiaValido(dStr, mes, ano)
                    return <option key={d} value={dStr} disabled={!valido} className={valido ? 'text-white' : 'text-zinc-600'}>{dStr}</option>
                  })}
                </select>
                <select value={mes} onChange={(e) => { setMes(e.target.value); setDia('') }} className="bg-black border border-white/20 focus:border-white/60 outline-none px-4 py-4 text-[12px] tracking-wider text-white transition-all appearance-none cursor-pointer">
                  <option value="">Mês</option>
                  {MESES.map((m, i) => <option key={i} value={String(i + 1).padStart(2, '0')}>{m}</option>)}
                </select>
                <select value={ano} onChange={(e) => { setAno(e.target.value); setDia('') }} className="bg-black border border-white/20 focus:border-white/60 outline-none px-4 py-4 text-[12px] tracking-wider text-white transition-all appearance-none cursor-pointer">
                  <option value="">Ano</option>
                  {anosDisponiveis.map((a) => <option key={a} value={String(a)}>{a}</option>)}
                </select>
              </div>
              {dataLabel && <p className="text-[10px] tracking-[0.3em] text-zinc-400 uppercase mt-3">{dataLabel}</p>}
            </div>

            {/* 05 Horário */}
            <div>
              <p className="text-[10px] tracking-[0.8em] text-zinc-300 uppercase mb-6">05 · Horário pretendido (opcional)</p>
              <button onClick={() => setHorarioOpen(!horarioOpen)} className="w-full flex items-center justify-between px-6 py-5 border border-white/20 hover:border-white/40 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                  <span className="text-[12px] tracking-[0.2em] uppercase text-zinc-300 group-hover:text-white transition-colors">{horario || 'Escolher horário'}</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`text-zinc-500 transition-transform duration-300 ${horarioOpen ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6" /></svg>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${horarioOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="border border-t-0 border-white/20 px-6 py-5">
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {HORARIOS.map((h) => (
                      <button key={h} onClick={() => { setHorario(horario === h ? '' : h); setHorarioOpen(false) }}
                        className={`py-3 border text-[11px] tracking-[0.15em] transition-all duration-200
                          ${horario === h ? 'border-white bg-white text-black font-semibold' : 'border-white/15 text-zinc-400 hover:border-white/50 hover:text-white'}`}>
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 06 Mensagem */}
            <div>
              <p className="text-[10px] tracking-[0.8em] text-zinc-300 uppercase mb-6">06 · Mensagem adicional (opcional)</p>
              <textarea
                placeholder="Acrescenta alguma informação..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                rows={3}
                className="w-full bg-transparent border border-white/20 focus:border-white/60 outline-none px-6 py-4 text-[13px] tracking-wider text-white placeholder:text-zinc-500 transition-all resize-none"
              />
            </div>

          </div>

          {/* Direita — envio */}
          <div className="flex flex-col justify-start lg:pt-14 gap-8">

            <div className="border-b border-white/5 pb-10">
              <h2 className="font-serif text-[clamp(2rem,4vw,48px)] uppercase tracking-tighter leading-tight mb-4">
                Envia a<br />tua mensagem
              </h2>
              <p className="text-[12px] text-zinc-300 tracking-wider leading-relaxed">
                Seleciona o barbeiro, o serviço pretendido e envia diretamente via WhatsApp ou Instagram.
              </p>
            </div>

            {/* Preview */}
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
              <button onClick={handleWhatsApp} disabled={!barbeiro}
                className={`flex items-center justify-between px-8 py-6 border transition-all duration-300 group
                  ${barbeiro ? 'border-white/20 hover:bg-white hover:text-black cursor-pointer' : 'border-white/5 text-zinc-700 cursor-not-allowed'}`}
              >
                <div className="flex items-center gap-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">...</svg>
                  <span className="text-[11px] tracking-[0.3em] uppercase font-semibold">Enviar via WhatsApp</span>
                </div>
                <svg width="16" height="16" .../>
              </button>
            </div>  

            {!barbeiro && <p ...>← Seleciona um barbeiro para continuar</p>}

            <p className="text-[9px] text-zinc-700 tracking-wider leading-relaxed">
              Ao enviar a mensagem, os dados que introduziste são transmitidos diretamente ao barbeiro via WhatsApp ou Instagram. O Elegance Studio não armazena qualquer informação pessoal nos seus servidores.{' '}
              <Link href="/politica-privacidade" className="underline hover:text-zinc-500 transition-colors">Política de Privacidade</Link>
            </p>

          </div>
        </div>
      </section>

      <footer className="py-14 px-6 md:px-8 border-t border-white/5 text-center bg-zinc-950/30">
        <p className="text-[10px] tracking-[0.6em] md:tracking-[0.8em] text-zinc-500 uppercase mb-4">ELEGANCE STUDIO © 2026 · PINHAL NOVO · PORTUGAL</p>
        <Link href="/politica-privacidade" className="text-[9px] tracking-[0.4em] text-zinc-700 uppercase hover:text-zinc-500 transition-colors">Política de Privacidade</Link>
      </footer>
    </div>
  )
}
