# Megatron Informática — Site Institucional

Site institucional da **Megatron Informática e Serviços LTDA**, assistência técnica autorizada em Recife-PE. Desenvolvido com HTML5, CSS3 e JavaScript puro — sem frameworks.

---

## Visão geral

| Item | Detalhe |
|---|---|
| Empresa | Megatron Informática e Serviços LTDA |
| Endereço | R. Ribeiro de Brito, 1002 — Boa Viagem, Recife-PE |
| Atuação desde | 2008 |
| Avaliação Google | ⭐ 5,0 |
| WhatsApp | (81) 99278-9256 |

---

## Stack

- **HTML5** semântico (section, article, header, footer, address)
- **CSS3** com custom properties, Grid e Flexbox
- **JavaScript** vanilla — sem dependências
- **Google Fonts** — Inter (400/500/600/700/800)
- **Font Awesome 6.5** — ícones
- **Google Maps Embed API** — mapa na seção de localização

---

## Estrutura de arquivos

```
megatron-website/
├── index.html
├── README.md
├── .gitignore
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── script.js
    └── images/
        ├── logo.png
        ├── hero-bg.png
        ├── tronzinho.png
        └── brands/
            ├── brother.png
            ├── canon.png
            ├── epson.png
            ├── lexmark.png
            ├── xerox.png
            └── kyocera.png
```

---

## Seções do site

| # | Seção | Descrição |
|---|---|---|
| 1 | **Header** | Logo, navegação, botões Instagram e WhatsApp, menu hamburger mobile |
| 2 | **Hero** | Chamada principal com imagem de fundo e CTA |
| 3 | **Marcas** | Assistência autorizada (Brother, Canon) + serviço especializado (Epson, Lexmark, Xerox, Kyocera) |
| 4 | **Serviços** | 6 cards: Assistência Técnica, Venda, Outsourcing, Contratos, Notebooks, Parcerias |
| 5 | **Sobre** | História da empresa, stats animados (fundação, anos, nota) |
| 6 | **Tronzinho** | Seção do mascote com CTA para WhatsApp |
| 7 | **Diferenciais** | 6 cards: Serviço autorizado, Agilidade, Cobertura, SLA, Preço justo, Nota 5,0 |
| 8 | **Avaliações** | 3 depoimentos de clientes verificados |
| 9 | **Localização** | Endereço, horário e mapa Google Maps embutido |
| 10 | **Footer** | Links rápidos, serviços, contato e rodapé |

---

## Funcionalidades JavaScript

- **Header com sombra no scroll** — IntersectionObserver + classList
- **Menu mobile** — animação hamburger → X, bloqueio de scroll do body
- **Link ativo por scroll** — IntersectionObserver acompanha seção visível
- **Scroll reveal** — elementos entram com fade + translateY ao aparecer na viewport
- **Contadores animados** — números sobem suavemente com easing cúbico ao entrarem na tela
- **Formulário → WhatsApp** — abre conversa direta com mensagem pré-formatada
- **Smooth scroll** — navegação suave entre âncoras

---

## Responsividade

| Breakpoint | Comportamento |
|---|---|
| `≤ 1024px` | Services e Diferenciais passam para 2 colunas |
| `≤ 900px` | Menu mobile ativado, Tronzinho colapsa para 1 coluna, strip de logos vai para 2×2 |
| `≤ 768px` | Hero overlay uniforme, cards de marcas em coluna única, About e Location em 1 coluna, mapa com altura reduzida |
| `≤ 480px` | Tronzinho oculto, hero em coluna única, cards de marcas centralizados |

---

## Como rodar localmente

Não há build step — abra diretamente no navegador:

```bash
# Clonar o repositório
git clone https://github.com/Felipee-Nobrega/megatron-website.git

# Abrir no navegador
open index.html
# ou arraste o arquivo index.html para o navegador
```

Para melhor experiência durante o desenvolvimento, use uma extensão de live server (ex: **Live Server** no VS Code).

---

## Paleta de cores

| Variável | Cor | Uso |
|---|---|---|
| `--blue` | `#4267B2` | Principal, links, badges |
| `--blue-dark` | `#1E2F5C` | Backgrounds escuros, títulos |
| `--blue-light` | `#5FB7E5` | Ícones em fundos escuros |
| `--magenta` | `#C02A8A` | Acentos, gradientes |
| `--yellow` | `#F9C400` | Estrelas de avaliação |
| `--bg` | `#F4F6FB` | Background suave de seções |

---

## Contato comercial

- **WhatsApp:** [(81) 99278-9256](https://wa.me/5581992789256)
- **Instagram:** [@megatron.pe](https://www.instagram.com/megatron.pe/)
- **Endereço:** R. Ribeiro de Brito, 1002 — Boa Viagem, Recife-PE — CEP 51021-310
