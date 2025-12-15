# nxt-gen-cli

A command-line tool for scaffolding Next.js projects with a customizable tech stack. Skip the repetitive setup and get straight to building.

## Overview

nxt-gen-cli streamlines Next.js project creation by automating the installation and configuration of commonly used libraries. Instead of manually installing and wiring up Prisma, React Query, Axios, and UI frameworks, this CLI handles it for you through an interactive prompt or command-line flags.

## Installation

With npx **(Recommended)**:
```bash
npx nxt-gen-cli my-project
```

Or install globally **(Beta)**:

```bash
npm install -g nxt-gen-cli
```

## Quick Start

### Interactive Mode

Run the CLI without arguments to use the interactive prompt:

```bash
nxt-gen-cli
```

You will be guided through selecting your project name and preferred stack options.

### Command-Line Mode

Specify options directly for non-interactive usage:

```bash
nxt-gen-cli my-project --prisma --react-query --axios --ui shadcn --framer-motion --lucide
```

## Features

### Database

| Feature | Description                                                         |
| ------- | ------------------------------------------------------------------- |
| Prisma  | Full Prisma ORM setup with schema template and client configuration |

### State Management and API

| Feature     | Description                                         |
| ----------- | --------------------------------------------------- |
| React Query | TanStack Query with provider component ready to use |
| Axios       | Pre-configured Axios client instance                |

### UI Libraries

| Option | Description                                                             |
| ------ | ----------------------------------------------------------------------- |
| shadcn | Tailwind CSS utilities with class-variance-authority and tailwind-merge |
| HeroUI | Complete HeroUI setup with Tailwind configuration                       |
| Both   | Install both shadcn utilities and HeroUI                                |
| None   | Skip UI library installation                                            |

### Additional Libraries

| Feature       | Description                           |
| ------------- | ------------------------------------- |
| Framer Motion | Animation library for React           |
| Lucide React  | Icon library with tree-shakable icons |

### Example Templates

| Option | Description                                                          |
| ------ | -------------------------------------------------------------------- |
| CRUD   | Sample API route and page demonstrating create/read operations       |
| Auth   | Authentication page placeholder for extending with NextAuth or Clerk |
| Both   | Include both example templates                                       |
| None   | Skip example generation                                              |

## CLI Options

```
Usage: nxt-gen-cli [name] [options]

Arguments:
  name                    Project name (prompted if not provided)

Options:
  --prisma                Install Prisma ORM
  --react-query           Install React Query (TanStack Query)
  --axios                 Install Axios HTTP client
  --ui <type>             UI library: shadcn, heroui, both, none
  --framer-motion         Install Framer Motion
  --lucide                Install Lucide React icons
  --examples <type>       Example templates: crud, auth, both, none
  -V, --version           Output version number
  -h, --help              Display help information
```

## Project Structure

After scaffolding, your project will have the following structure based on selected options:

```
my-project/
├── prisma/
│   └── schema.prisma          # Prisma schema (if --prisma)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── posts/
│   │   │       └── route.ts   # Example API route (if --examples crud)
│   │   ├── auth/
│   │   │   └── page.tsx       # Auth page placeholder (if --examples auth)
│   │   ├── posts/
│   │   │   └── page.tsx       # Example page (if --examples crud)
│   │   ├── layout.tsx         # Root layout with Providers wrapper
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   ├── providers/
│   │   │   └── query-provider.tsx  # React Query provider (if --react-query)
│   │   └── providers.tsx      # Combined providers component
│   └── lib/
│       ├── axios.ts           # Axios client (if --axios)
│       ├── prisma.ts          # Prisma client (if --prisma)
│       └── utils.ts           # Utility functions (if --ui shadcn)
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Base Stack

Every project created with nxt-gen-cli includes:

- Next.js with App Router
- TypeScript
- Tailwind CSS
- ESLint
- `src/` directory structure
- `@/*` import alias

## Examples

### Full Stack Project

```bash
nxt-gen-cli my-app --prisma --react-query --axios --ui both --framer-motion --lucide --examples both
```

### Minimal API Project

```bash
nxt-gen-cli api-service --prisma --axios
```

### Frontend-Only Project

```bash
nxt-gen-cli landing-page --ui shadcn --framer-motion --lucide
```

## Requirements

- Node.js 18.17.0 or later
- npm 9.0.0 or later

## Contributing

Contributions are welcome. Please open an issue to discuss proposed changes before submitting a pull request.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License. See [LICENSE.md](LICENSE.md) for details.

## Author

Praboth Charith - [praboth.me](https://praboth.me)

## Links

- [Website](https://praboth.me/nxt-gen-cli)
- [GitHub Repository](https://github.com/PrabothCharith/nxt-gen-cli)
- [Issue Tracker](https://github.com/PrabothCharith/nxt-gen-cli/issues)
- [npm Package](https://www.npmjs.com/package/nxt-gen-cli)
