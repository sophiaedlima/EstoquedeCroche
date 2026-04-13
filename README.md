Aplicação web para gerenciamento de estoque de materiais de crochê, desenvolvida com React + TypeScript + Vite e Bootstrap.
Projeto desenvolvido para a disciplina de Desenvolvimento de Software WEB Prof. Alexandre Almeida.

- Cadastro de materiais (fios, agulhas, acessórios e utensílios)
- Edição e remoção de materiais
- Controle de estoque: usar e repor unidades
- Status automático do estoque: Em estoque, Estoque baixo e Esgotado
- Visão geral com contadores na tela principal
- Filtro por categoria na barra lateral
- Busca por nome
- Dados persistidos no `localStorage`

React  18.3 
TypeScript 5.5 
Vite 5.4 
Bootstrap (CDN)  5 

Instalar dependências
npm install

Iniciar servidor de desenvolvimento
npm run dev

http://localhost:5173



src/
├── components/
│   ├── Navbar.tsx           #Barra de navegação superior
│   ├── FiltroSidebar.tsx    #Barra lateral com filtros por categoria
│   ├── Dashboard.tsx        #Visão geral com contadores de estoque
│   ├── CardMaterial.tsx     #Card individual de cada material
│   ├── ModalAdicionar.tsx   #Modal para adicionar/editar material
│   └── Rodape.tsx           #Rodapé da aplicação
├── data/
│   └── materiaisIniciais.ts  #Dados iniciais de exemplo
├── types/
│   └── tipos.ts             #Interfaces e tipos TypeScript
├── App.tsx                  #Componente principal
└── main.tsx                 #Entrada da aplicação


- Fios — novelos de lã, linha de algodão, etc.
- Agulhas — agulhas de crochê de diversos tamanhos
- Acessórios — marcadores de ponto, botões, fechos, etc.
- Utensílios — tesouras, fita métrica, agulhas de costura, etc.
