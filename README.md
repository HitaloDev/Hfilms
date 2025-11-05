# 🎬 HFilms - Seu Portal de Filmes

HFilms é uma aplicação web moderna para descobrir, explorar e gerenciar seus filmes favoritos. Construído com Next.js 14 e integrado com a API do The Movie Database (TMDb).

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8)

## ✨ Funcionalidades

### 🏠 Página Inicial
- **Carrossel Hero Automático** - Slides automáticos a cada 10 segundos com loop infinito
- **Múltiplas Categorias** - Filmes Populares, Em Breve, Melhores Avaliados, Em Cartaz
- **Design Responsivo** - Otimizado para desktop, tablet e mobile
- **Menu Mobile** - Menu hamburger interativo para dispositivos móveis

### 🎯 Detalhes do Filme
- **Informações Completas** - Sinopse, avaliação, duração, data de lançamento, gêneros
- **Elenco Principal** - Fotos e nomes dos atores principais
- **Filmes Similares** - Sugestões baseadas no filme atual
- **Dados Financeiros** - Orçamento e receita quando disponíveis

### ⭐ Favoritos
- **Sistema de Favoritos** - Salve seus filmes preferidos com um clique
- **Persistência Local** - Dados salvos no localStorage do navegador
- **Gerenciamento Fácil** - Adicione ou remova filmes da lista de favoritos

### 🔍 Pesquisa
- **Busca em Tempo Real** - Pesquisa com debounce de 500ms
- **Resultados Dinâmicos** - Visualização instantânea dos resultados
- **Interface Limpa** - Design minimalista e fácil de usar

### 📂 Categorias
- **Navegação por Gêneros** - Explore filmes por Ação, Comédia, Drama, Terror, etc.
- **Paginação Completa** - Navegue entre páginas de resultados
- **Cards Coloridos** - Interface vibrante e atraente para cada categoria

### 🎨 Design
- **Layout Clean** - Interface moderna e minimalista
- **Animações Suaves** - Transições e efeitos hover elegantes
- **Imagens Otimizadas** - Carregamento rápido com Next.js Image
- **Dark Theme** - Design escuro com acentos em vermelho

## 🚀 Tecnologias Utilizadas

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI**: 
  - [Radix UI](https://www.radix-ui.com/)
  - [Embla Carousel](https://www.embla-carousel.com/)
  - [React Slick](https://react-slick.neostack.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **API**: [The Movie Database (TMDb)](https://www.themoviedb.org/)
- **Ícones**: [React Icons](https://react-icons.github.io/react-icons/)

## 📋 Pré-requisitos

- Node.js 18.x ou superior
- Yarn (recomendado) ou npm
- Chave API do TMDb ([Obtenha aqui](https://www.themoviedb.org/settings/api))

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/hfilms.git
cd hfilms
```

2. **Instale as dependências**
```bash
yarn install
# ou
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto:
```env
NEXT_PUBLIC_API_KEY=sua_chave_api_tmdb
NEXT_PUBLIC_BASE_URL=https://api.themoviedb.org/3/movie/
NEXT_PUBLIC_BASE_URL_IMAGE=https://image.tmdb.org/t/p/original
NEXT_PUBLIC_SEARCH=https://api.themoviedb.org/3/search/movie?query
```

4. **Execute o servidor de desenvolvimento**
```bash
yarn dev
# ou
npm run dev
```

5. **Abra no navegador**
```
http://localhost:3000
```

## 📁 Estrutura do Projeto

```
HFilms/
├── app/                       # Next.js App Router
│   ├── (home)/                # Página inicial
│   ├── categorias/            # Páginas de categorias
│   ├── favoritos/             # Página de favoritos
│   ├── filme/                 # Páginas de filmes
│   ├── pesquisar/             # Página de pesquisa
│   └── globals.css            # Estilos globais
├── components/                # Componentes React
│   ├── Footer/                # Rodapé
│   ├── GenreCard/             # Card de gênero
│   ├── Header/                # Cabeçalho
│   ├── HeroCarousel/          # Carrossel principal
│   ├── Loading/               # Componentes de loading
│   ├── MovieCard/             # Card de filme reutilizável
│   ├── MovieCategory/         # Categoria de filmes
│   ├── MovieSlider/           # Slider de filmes
│   ├── SectionBackground/     # Background de seção
│   └── ui/                    # Componentes UI base (shadcn/ui)
├── hooks/                     # Custom Hooks
│   ├── useFavorites.ts        # Gerenciamento de favoritos
│   ├── useGenres.ts           # Busca de gêneros
│   ├── useMovieSearch.ts      # Busca de filmes
│   └── useMovies.ts           # Busca de listas de filmes
├── lib/                       # Bibliotecas e utilitários
│   ├── constants/             # Constantes do projeto
│   │   ├── api.ts             # Configurações da API
│   │   └── slider.ts          # Configurações do slider
│   ├── services/              # Camada de serviço
│   │   └── movieService.ts    # Serviço de filmes (API)
│   └── utils/                 # Funções utilitárias
│       ├── movie.ts            # Utilitários de filmes
│       └── text.ts             # Utilitários de texto
└── types/                     # Tipos TypeScript
    ├── movie.ts                # Tipos relacionados a filmes
    └── react-slick.d.ts        # Declarações de tipos
```

> 📖 Para mais detalhes sobre a arquitetura, consulte [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🎯 Funcionalidades Detalhadas

### Sistema de Favoritos

O sistema de favoritos utiliza localStorage para persistir os dados:

```typescript
import { useFavorites } from '@/hooks/useFavorites';

const { favorites, isFavorite, toggleFavorite } = useFavorites();

// Adicionar aos favoritos
toggleFavorite(movie);

// Verificar se está nos favoritos
isFavorite(movieId);

// Listar todos os favoritos
favorites;
```

### Service Layer

Toda comunicação com API está centralizada em serviços:

```typescript
import { movieService } from '@/lib/services/movieService';

// Buscar filmes populares
const movies = await movieService.getPopularMovies();

// Buscar detalhes de um filme
const details = await movieService.getMovieDetails(movieId);

// Buscar filmes por categoria
const movies = await movieService.getMoviesByCategory('upcoming');
```

### Custom Hooks

Hooks customizados encapsulam lógica complexa:

```typescript
import { useMovies } from '@/hooks/useMovies';
import { useMovieSearch } from '@/hooks/useMovieSearch';

// Buscar filmes
const { movies, loading, error } = useMovies({ endpoint: 'popular' });

// Buscar com debounce automático
const { movies, loading } = useMovieSearch();
```

### Componentes Reutilizáveis

Componentes focados em responsabilidade única:

```typescript
import { MovieCard } from '@/components/MovieCard/MovieCard';
import { LoadingSpinner } from '@/components/Loading/LoadingSpinner';
import { SectionBackground } from '@/components/SectionBackground/SectionBackground';
```

### Carrossel Automático

O carrossel principal possui:
- Transição suave de 10 segundos
- Loop infinito (volta ao início automaticamente)
- Navegação por teclado (setas esquerda/direita)

### Categorias de Filmes

As seguintes categorias estão disponíveis:
- **Populares**: Filmes mais populares no momento
- **Em Breve**: Próximos lançamentos
- **Melhores Avaliados**: Filmes com melhores avaliações
- **Em Cartaz**: Filmes atualmente nos cinemas

## 🌐 Deploy

### Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Acesse [Vercel](https://vercel.com)
3. Importe o repositório
4. Configure as variáveis de ambiente
5. Deploy!

### Outras Plataformas

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 🏗️ Arquitetura

O projeto segue uma arquitetura limpa e bem organizada:

- **Service Layer**: Toda comunicação com API centralizada
- **Custom Hooks**: Lógica de estado e efeitos colaterais encapsulada
- **Componentes Reutilizáveis**: Componentes focados em responsabilidade única
- **Type Safety**: TypeScript em todo o projeto
- **Separação de Responsabilidades**: Código organizado por função

Para mais detalhes, consulte [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🤝 Contribuindo

Contribuições são bem-vindas! Consulte [CONTRIBUTING.md](./CONTRIBUTING.md) para diretrizes detalhadas.

Resumo rápido:
1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Hitalo**

- GitHub: [@hitalo](https://github.com/hitalo)

## 🙏 Agradecimentos

- [The Movie Database (TMDb)](https://www.themoviedb.org/) - Por fornecer a API
- [Next.js](https://nextjs.org/) - Framework incrível
- [Vercel](https://vercel.com/) - Plataforma de deploy

---

⭐ Se você gostou do projeto, considere dar uma estrela no GitHub!
