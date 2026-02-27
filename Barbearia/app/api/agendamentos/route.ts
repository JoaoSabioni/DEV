import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const agendamentos = await prisma.agendamento.findMany();
  return NextResponse.json(agendamentos);
}

export async function POST(req: Request) {
  const body = await req.json();
  const agendamento = await prisma.agendamento.create({ data: body });
  return NextResponse.json(agendamento, { status: 201 });
}