# TUB - Plataforma de Não Conformidades

## Problem Statement
Plataforma web interna para Transportes Urbanos de Braga (TUB) para visualização e análise de indicadores operacionais de não conformidades com relatórios Power BI embebidos.

## Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI
- **Backend**: FastAPI + MongoDB (Motor)
- **Design**: TUB brand identity (#017cb7, #01a7f4, Outfit/Work Sans fonts)
- **Power BI**: iframe embed com autoAuth

## User Personas
- Funcionários TUB (acesso interno, sem autenticação)

## Core Requirements
- Homepage com visão geral e navegação para 3 áreas
- 3 páginas analíticas: Acertos, Trocas, Faltas de Circulação
- KPIs mock no topo de cada página
- Relatório Power BI embebido (iframe) como elemento central
- Design fiel à identidade visual TUB
- Responsivo e adaptável

## What's Been Implemented (2026-04-13)
- Homepage com hero section, stats overview, e 3 navigation cards
- Página Acertos com 4 KPIs + Power BI embed
- Página Trocas com 4 KPIs + Power BI embed
- Página Faltas de Circulação com 4 KPIs + Power BI embed
- Header sticky com navegação (active states)
- Footer institucional TUB
- Backend API com endpoints de KPIs mock
- Design TUB brand (#017cb7, Outfit/Work Sans fonts)
- Responsivo com menu mobile

## Prioritized Backlog
- P0: Concluído - MVP funcional
- P1: Integração Power BI com token service principal ("app owns data")
- P1: KPIs dinâmicos (ligação a dados reais)
- P2: Notificações/Avisos internos
- P3: Exportação de relatórios

## Next Tasks
1. Integrar Power BI com autenticação service principal para embedding seguro
2. Ligar KPIs a dados reais da base de dados operacional
3. Adicionar filtros de data aos KPIs
