# 🏗️ SmartSyncGest

**Sistema de Gestão Inteligente de Obras, Diários de Engenharia (RDO) e Almoxarifado.**

O **SmartSyncGest** é uma aplicação PWA (Progressive Web App) desenvolvida para digitalizar e otimizar a rotina de engenheiros e técnicos no canteiro de obras. A aplicação permite o lançamento do Relatório Diário de Obra (RDO) diretamente pelo celular, gerando instantaneamente pranchas em PDF corporativas organizadas automaticamente no Google Drive.

## 🚀 Módulos e Funcionalidades
- **📝 Lançamento de RDO em 5 Passos**: Registro rápido de clima, efetivo da equipe, UHs (Unidades Habitacionais) concluídas e ocorrências do dia.
- **📄 Motor de PDF (White-Label)**: Geração automática de pranchas PDF customizáveis com a paleta de cores e logomarca da construtora.
- **📦 Controle de Almoxarifado**: Registro de entradas e saídas de insumos com cálculo automático do saldo atual da obra.
- **📊 Dashboard Preditivo**: Leitura em tempo real do avanço físico, ritmo diário e projeção de cumprimento do prazo contratual.
- **📱 PWA Instalável**: Funciona como um aplicativo nativo no Android/iOS (basta adicionar à tela inicial), com cache offline (Service Worker).

## 🛠️ Arquitetura e Tecnologias
Este projeto adota uma arquitetura *Serverless* dividida em duas camadas:
1. **Frontend (GitHub Pages)**: Interface limpa, responsiva e rápida construída com HTML5, CSS3 e JavaScript (Vanilla). Comunica-se via API (Fetch).
2. **Backend & Database (Google Workspace)**: 
   - **API**: Google Apps Script (`doPost` e `doGet`).
   - **Banco de Dados**: Google Sheets (Planilhas).
   - **Armazenamento**: Google Drive (Estrutura de pastas automática por ano e mês).

## ⚙️ Configuração Inicial
1. Faça o clone ou hospede os arquivos deste repositório no GitHub Pages.
2. Edite o arquivo `config.js` e insira a sua URL oficial de execução do Google Apps Script na constante `API_URL`.
3. No editor do Apps Script, garanta que a permissão da implantação esteja como **"Qualquer pessoa"**.

---
*Desenvolvido para gestão corporativa de engenharia e obras.*