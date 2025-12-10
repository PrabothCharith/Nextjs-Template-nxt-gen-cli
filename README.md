# nxt-gen-cli: Next.js CLI

![npm version](https://img.shields.io/npm/v/nxt-gen-cli?style=flat-square)
![license](https://img.shields.io/npm/l/nxt-gen-cli?style=flat-square)

A powerful, interactive CLI tool to scaffold production-ready Next.js applications custom features.

Stop copying and pasting boilerplate code. Generate a custom stack in seconds.

## Features

- **Production-Ready Base**: Next.js 14+, TypeScript, Tailwind CSS (v4 compatible), ESLint.
- **Database Ready**: Optional **Prisma ORM** setup for SQLite (default) or PostgreSQL.
- **State Management**: Optional **React Query** (TanStack Query) integration.
- **Networking**: Pre-configured **Axios** instance.
- **UI Libraries**: One-click setup for **Shadcn UI** and **HeroUI** (NextUI).
- **Animations**: Integrated **Framer Motion** support.
- **Icons**: **Lucide React** icons pre-installed.
- **Smart Examples**: Dynamically generates **CRUD** and **Auth** example code based on your selected stack.

## Quick Start

Run the generator directly with `npx`:

```bash
npx nxt-gen-cli@latest my-app
```

Follow the interactive prompts to choose your stack!

## Installation

Alternatively, install it globally:

```bash
npm install -g nxt-gen-cli
```

Then generate a project anywhere:

```bash
cnp my-new-project
```

## Usage

### Interactive Mode

Just run the command without flags:

```bash
npx nxt-gen-cli@latest my-app
```

You will be asked about:

- Prisma ORM
- React Query
- Axios
- UI Library (Shadcn / HeroUI)
- Animations & Icons
- Example Pages

### Non-Interactive (Flags)

Perfect for scripts or power users:

```bash
# Create a full-stack app with all features
npx nxt-gen-cli@latest my-app --prisma --react-query --axios --ui both --framer-motion --lucide --examples both
```

| Flag | Description |
|------|-------------|
| `--prisma` | Install and configure Prisma ORM |
| `--react-query` | Install and configure TanStack Query |
| `--axios` | Install and configure Axios |
| `--ui <type>` | Choose UI: `shadcn`, `heroui`, `both`, or `none` |
| `--framer-motion` | Install Framer Motion |
| `--lucide` | Install Lucide React Icons |
| `--examples <type>` | Generate examples: `crud`, `auth`, `both`, or `none` |

## Generated Structure

Depending on your choices, your project will look like this:

```text
my-app/
├── prisma/               # (If selected) Schema and migrations
├── src/
│   ├── app/
│   │   ├── api/          # (If examples) API Routes
│   │   ├── posts/        # (If examples) CRUD Example Page
│   │   ├── layout.tsx    # Wrapped with Providers automatically
│   │   └── ...
│   ├── components/
│   │   └── providers/    # Query & UI Providers
│   ├── lib/
│   │   ├── prisma.ts     # (If selected) Prisma Client Singleton
│   │   ├── axios.ts      # (If selected) Axios Instance
│   │   └── utils.ts      # CN helper and util functions
│   └── ...
├── tailwind.config.ts    # Auto-configured for HeroUI/Shadcn
└── ...
```

## Contributing

Contributions are welcome! Please verify your changes by running the test command before submitting a PR.

```bash
# Run local test
npm run build
npx . test-app
```

## License

MIT © [Praboth Charith](https://praboth.me)
