# Desafio Técnico - App de Gerenciamento de Tarefas 📱✅

Este desafio foi criado para avaliar suas habilidades em desenvolvimento frontend/mobile, consumo de APIs e criação de interfaces modernas.

## 🎯 Objetivo

Desenvolver uma aplicação web ou mobile que permita aos usuários gerenciar suas tarefas diárias, com integração a uma API de produtividade que sugere o melhor horário para realizar cada tarefa.

## 📋 Pré-requisitos

- Conhecimento em:
  - React/React Native ou Flutter
  - TypeScript/JavaScript
  - Consumo de APIs REST
  - Gerenciamento de estado
  - UI/UX
  - Git

## 🧩 O que você deve fazer

1. Criar uma aplicação web ou mobile (escolha uma das opções):
   - Web: React + TypeScript
   - Mobile: React Native + TypeScript ou Flutter

2. Implementar as seguintes funcionalidades:
   - Dashboard com visão geral das tarefas
   - Lista de tarefas com filtros e ordenação
   - Formulário de criação/edição de tarefas
   - Integração com a API de produtividade

3. Consumir a API de produtividade:
   - Endpoint: `/suggest-time`
   - Método: POST
   - Payload:
     ```json
     {
       "task": {
         "title": "Reunião com equipe",
         "priority": "high",
         "estimated_duration": 60,
         "deadline": "2024-03-20T15:00:00Z",
         "category": "work"
       },
       "user_preferences": {
         "working_hours": {
           "start": "09:00",
           "end": "18:00"
         },
         "preferred_categories": ["work", "personal"]
       }
     }
     ```

4. Implementar uma interface moderna e responsiva:
   - Design system consistente
   - Animações suaves
   - Feedback visual para ações do usuário
   - Tratamento de estados de loading e erro

## 📁 Estrutura do Projeto

```
.
├── src/
│   ├── components/
│   │   ├── TaskCard/
│   │   ├── PriorityBadge/
│   │   ├── CategoryFilter/
│   │   └── TimeSuggestions/
│   ├── screens/
│   │   ├── Dashboard/
│   │   ├── TaskList/
│   │   └── TaskForm/
│   ├── services/
│   │   └── api.ts
│   ├── hooks/
│   │   └── useTasks.ts
│   ├── contexts/
│   │   └── TaskContext.tsx
│   └── styles/
│       └── theme.ts
├── public/
├── tests/
├── package.json
└── README.md
```

## 🎨 Design

### Cores
- Primária: #6366F1 (Indigo)
- Secundária: #10B981 (Emerald)
- Fundo: #F9FAFB
- Texto: #1F2937

### Tipografia
- Fonte principal: Inter
- Tamanhos: 12px - 24px
- Pesos: Regular (400), Medium (500), Bold (700)

## 📱 Telas

### 1. Dashboard
- Resumo do dia
- Tarefas prioritárias
- Gráfico de produtividade
- Sugestões de horários

### 2. Lista de Tarefas
- Cards de tarefas com:
  - Título
  - Prioridade
  - Categoria
  - Horário sugerido
  - Status
- Filtros por:
  - Categoria
  - Prioridade
  - Status
- Ordenação por:
  - Data
  - Prioridade
  - Nome

### 3. Formulário de Tarefa
- Campos:
  - Título
  - Descrição
  - Categoria
  - Prioridade
  - Duração estimada
  - Prazo
  - Lembretes
- Sugestões de horário
- Preview da tarefa

## 🔧 Considerações Técnicas

### Simulação da API

Para desenvolvimento, você pode simular a API usando o JSON Server. Siga os passos abaixo:

1. Instale o JSON Server:
```bash
npm install -g json-server
```

2. Crie um arquivo `db.json` na raiz do projeto:
```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Reunião com equipe",
      "description": "Discussão sobre o novo projeto",
      "priority": "high",
      "category": "work",
      "estimated_duration": 60,
      "deadline": "2024-03-20T15:00:00Z",
      "status": "pending"
    }
  ],
  "suggestions": [
    {
      "task_id": 1,
      "suggested_times": [
        {
          "start": "2024-03-20T10:00:00Z",
          "end": "2024-03-20T11:00:00Z",
          "score": 0.9
        },
        {
          "start": "2024-03-20T14:00:00Z",
          "end": "2024-03-20T15:00:00Z",
          "score": 0.8
        }
      ]
    }
  ]
}
```

3. Inicie o servidor:
```bash
json-server --watch db.json --port 3001
```

4. Endpoints disponíveis:
- `GET /tasks` - Lista todas as tarefas
- `GET /tasks/:id` - Obtém uma tarefa específica
- `POST /tasks` - Cria uma nova tarefa
- `PUT /tasks/:id` - Atualiza uma tarefa
- `DELETE /tasks/:id` - Remove uma tarefa
- `POST /suggest-time` - Simula a sugestão de horário

5. Exemplo de uso da API de sugestão de horário:
```typescript
// services/api.ts
const API_URL = 'http://localhost:3001';

export const suggestTime = async (taskData: TaskData) => {
  const response = await fetch(`${API_URL}/suggest-time`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  
  return response.json();
};
```

6. Para simular diferentes cenários, você pode modificar o `db.json` com diferentes dados de teste.

### Versões Recomendadas
- React 18+ ou React Native 0.70+
- TypeScript 4.5+
- Styled Components ou Tailwind CSS
- React Query ou SWR para gerenciamento de estado
- Jest e React Testing Library para testes

### Performance
- Lazy loading de componentes
- Code splitting
- Otimização de bundle
- Cache de requisições
- Offline support

### Acessibilidade
- Suporte a leitores de tela
- Navegação por teclado
- Contraste adequado
- Textos alternativos
- Suporte a modo escuro

## 🚀 Como entregar

1. Faça um **fork** deste repositório
2. Realize o desafio no seu fork
3. Ao finalizar, envie um **Pull Request** para este repositório com a sua solução

### 📱 Entrega do APK (Desenvolvedores Mobile)

Se você escolheu desenvolver a versão mobile (React Native ou Flutter), além do código fonte, você deve:

1. Gerar um APK de release:
   - Para React Native:
     ```bash
     cd android
     ./gradlew assembleRelease
     ```
   - Para Flutter:
     ```bash
     flutter build apk --release
     ```

2. O APK gerado estará localizado em:
   - React Native: `android/app/build/outputs/apk/release/app-release.apk`
   - Flutter: `build/app/outputs/flutter-apk/app-release.apk`

3. Adicione o APK ao repositório em uma pasta chamada `release/`

4. Inclua no README:
   - Link para download do APK
   - Versão mínima do Android suportada
   - Permissões necessárias
   - Instruções de instalação

## ✅ Critérios de Avaliação

- Qualidade do código e organização
- Fidelidade ao design proposto
- Experiência do usuário
- Tratamento de erros e estados
- Performance e otimizações
- Testes implementados
- Documentação do projeto
- Implementação de funcionalidades extras (diferencial)

---

Boa sorte e divirta-se desenvolvendo! 🚀

## 📚 Referências

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Flutter Documentation](https://flutter.dev/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Styled Components Documentation](https://styled-components.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Material Design Guidelines](https://material.io/design)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) 