# Estoque de Croche

Aplicação web de gerenciamento de estoque de materiais de crochê, feita com React, TypeScript, Vite e Bootstrap.

Trabalho 2 da disciplina de Desenvolvimento de Software WEB - Prof. Alexandre Almeida.

---

## Funcionalidades

- Cadastro de materiais (fios, agulhas, acessórios e utensílios)
- Edição e remoção de materiais
- Controle de estoque com as ações de usar e repor unidades
- Status do estoque atualizado automaticamente: Em estoque, Estoque baixo e Esgotado
- Dashboard com contadores na tela principal
- Filtro por categoria na barra lateral
- Busca por nome
- Dados salvos no localStorage

---

## Tecnologias utilizadas

- React 18.3
- TypeScript 5.5
- Vite 5.4
- Bootstrap 5 via CDN

---

## Como rodar o projeto

Precisa ter o Node.js instalado na máquina.

```bash
npm install
npm run dev
```

Abrir no navegador: http://localhost:5173

---

## Estrutura de pastas

```
src/
├── components/
│   ├── Navbar.tsx           # Barra de navegação superior
│   ├── FiltroSidebar.tsx    # Barra lateral com filtros por categoria
│   ├── Dashboard.tsx        # Contadores de estoque
│   ├── CardMaterial.tsx     # Card de cada material
│   ├── ModalAdicionar.tsx   # Modal para adicionar ou editar material
│   └── Rodape.tsx           # Rodapé da aplicação
├── data/
│   └── materiaisIniciais.ts # Dados de exemplo
├── types/
│   └── tipos.ts             # Interfaces e tipos TypeScript
├── App.tsx                  # Componente principal
└── main.tsx                 # Entrada da aplicação
```

---

## Arquitetura

Optei por deixar todo o estado da aplicação centralizado no App.tsx usando useState, passando os dados para os componentes filhos via props e usando callbacks para as ações do usuário. Isso evita que os componentes fiquem acoplados entre si e facilita a manutenção.

Cada componente tem uma função bem definida:

- FiltroSidebar: só cuida dos filtros, não tem estado próprio
- Dashboard: só exibe os contadores, recebe tudo via props
- CardMaterial: exibe um material e chama os callbacks de ação
- ModalAdicionar: tem estado local apenas para os campos do formulário

---

## Categorias de materiais

- Fios: novelos.
- Agulhas: agulhas de crochê de diferentes tamanhos.
- Acessórios: marcadores de ponto, botões, fechos, etc.
- Utensílios: tesouras, fita métrica, agulhas de costura, etc.

---

Desenvolvido por Sophia Eduarda Lima - Desenvolvimento de Software WEB - Prof. Alexandre Almeida 
