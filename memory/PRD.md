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
- Homepage com hero section, stats overview dinâmico da BD, e 3 navigation cards
- Página Acertos com 4 KPIs dinâmicos + Power BI embed + filtro de datas + upload
- Página Trocas com 4 KPIs dinâmicos + Power BI embed + filtro de datas + upload
- Página Faltas com 4 KPIs dinâmicos + Power BI embed + filtro de datas + upload
- Importação CSV/Excel com detecção automática de colunas (Data, Linha, Motorista)
- KPIs calculados em tempo real: Total, Linha com mais ocorrências, Motorista com mais ocorrências
- Filtro por período com calendário interativo
- Página de Importação (/importar) com stats e gestão de dados
- Header sticky + Footer institucional TUB
- Design TUB brand (#017cb7, Outfit/Work Sans fonts), responsivo

## Prioritized Backlog
- P0: Concluído - MVP + Dados reais
- P1: Integração Power BI com token service principal ("app owns data")
- P2: Notificações/Avisos internos
- P3: Exportação de relatórios/dados para CSV

## Next Tasks
1. Integrar Power BI com autenticação service principal para embedding seguro
2. Adicionar exportação de dados para CSV
3. Sistema de notificações para limiares de não conformidades
