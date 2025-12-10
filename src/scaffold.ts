import path from "path";
import fs from "fs-extra";
import { ProjectConfig } from "./prompts";
import { runCommand } from "./lib/utils";
import chalk from "chalk";
import ora from "ora";
import {
  prismaSchema,
  prismaClient,
  axiosClient,
  queryProvider,
  providersComponent,
} from "./templates/base";
import { exampleApiHandler, examplePage } from "./templates/examples";

export const scaffoldProject = async (
  projectName: string,
  config: ProjectConfig
) => {
  const projectPath = path.resolve(process.cwd(), projectName);

  console.log(
    chalk.blue(`\nInitializing Next.js project in ${projectName}...\n`)
  );

  await runCommand(
    "npx",
    [
      "create-next-app@latest",
      projectName,
      "--typescript",
      "--tailwind",
      "--eslint",
      "--app",
      "--src-dir",
      "--import-alias",
      "@/*",
      "--use-npm",
    ],
    process.cwd()
  );

  await cleanupDefaultFiles(projectPath);

  if (config.prisma) await setupPrisma(projectPath);
  if (config.reactQuery) await setupReactQuery(projectPath);
  if (config.axios) await setupAxios(projectPath);

  await setupUI(projectPath, config.ui);

  if (config.framerMotion) await setupFramerMotion(projectPath);
  if (config.lucide) await setupLucide(projectPath);

  if (config.examples !== "none") {
    await setupExamples(projectPath, config);
  }

  await setupProviders(projectPath, config);

  console.log(chalk.green(`\nSuccessfully created project ${projectName}!\n`));
  console.log(chalk.cyan(`Created by Praboth Charith (https://praboth.me)\n`));
};

async function cleanupDefaultFiles(projectPath: string) {
  const pagePath = path.join(projectPath, "src/app/page.tsx");
  await fs.writeFile(
    pagePath,
    `
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to ${path.basename(
        projectPath
      )}</h1>
    </div>
  );
}
`
  );

  // const cssPath = path.join(projectPath, 'src/app/globals.css');
  // await fs.writeFile(cssPath, `
  // @tailwind base;
  // @tailwind components;
  // @tailwind utilities;
  // `);

  await fs.remove(path.join(projectPath, "public/next.svg"));
  await fs.remove(path.join(projectPath, "public/vercel.svg"));
}

async function setupPrisma(projectPath: string) {
  const spinner = ora("Setting up Prisma...").start();
  await runCommand("npm", ["install", "prisma", "--save-dev"], projectPath);
  await runCommand("npm", ["install", "@prisma/client"], projectPath);
  await runCommand("npx", ["prisma", "init"], projectPath);

  await fs.writeFile(
    path.join(projectPath, "prisma/schema.prisma"),
    prismaSchema
  );
  await fs.ensureDir(path.join(projectPath, "src/lib"));
  await fs.writeFile(path.join(projectPath, "src/lib/prisma.ts"), prismaClient);

  spinner.succeed("Prisma setup complete");
}

async function setupReactQuery(projectPath: string) {
  const spinner = ora("Setting up React Query...").start();
  await runCommand("npm", ["install", "@tanstack/react-query"], projectPath);

  await fs.ensureDir(path.join(projectPath, "src/components/providers"));
  await fs.writeFile(
    path.join(projectPath, "src/components/providers/query-provider.tsx"),
    queryProvider
  );

  spinner.succeed("React Query setup complete");
}

async function setupAxios(projectPath: string) {
  const spinner = ora("Setting up Axios...").start();
  await runCommand("npm", ["install", "axios"], projectPath);

  await fs.ensureDir(path.join(projectPath, "src/lib"));
  await fs.writeFile(path.join(projectPath, "src/lib/axios.ts"), axiosClient);

  spinner.succeed("Axios setup complete");
}

async function setupUI(projectPath: string, ui: string) {
  if (ui === "none") return;
  const spinner = ora(`Setting up UI (${ui})...`).start();

  if (ui === "shadcn" || ui === "both") {
    await runCommand(
      "npm",
      [
        "install",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
        "lucide-react",
      ],
      projectPath
    );

    await fs.ensureDir(path.join(projectPath, "src/lib"));
    await fs.writeFile(
      path.join(projectPath, "src/lib/utils.ts"),
      `
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
    );
  }

  if (ui === "heroui" || ui === "both") {
    const installArgs = ["install", "@heroui/react", "framer-motion"];
    await runCommand("npm", installArgs, projectPath);

    // Handle Tailwind Config (v4 might not include it)
    const tailwindConfigPath = path.join(projectPath, "tailwind.config.ts");
    const configExists = await fs.pathExists(tailwindConfigPath);

    if (!configExists) {
      // Create a fresh config compatible with HeroUI
      await fs.writeFile(
        tailwindConfigPath,
        `
import type { Config } from "tailwindcss";
import {heroui} from '@heroui/react';

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
};
export default config;
`
      );
    } else {
      let tailwindConfig = await fs.readFile(tailwindConfigPath, "utf-8");

      // Add import
      if (!tailwindConfig.includes("@heroui/react")) {
        tailwindConfig =
          "import {heroui} from '@heroui/react';\n" + tailwindConfig;
      }

      // Add plugin
      if (tailwindConfig.includes("plugins: [")) {
        if (!tailwindConfig.includes("heroui()")) {
          tailwindConfig = tailwindConfig.replace(
            "plugins: [",
            "plugins: [heroui(),"
          );
        }
      } else {
        console.warn(
          "Could not inject HeroUI plugin into tailwind.config.ts automatically. Please check manually."
        );
      }

      // Add content
      if (tailwindConfig.includes("content: [")) {
        if (!tailwindConfig.includes("@heroui/theme")) {
          tailwindConfig = tailwindConfig.replace(
            "content: [",
            'content: [\n    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",'
          );
        }
      }

      await fs.writeFile(tailwindConfigPath, tailwindConfig);
    }
  }
  spinner.succeed("UI setup complete");
}

async function setupFramerMotion(projectPath: string) {
  await runCommand("npm", ["install", "framer-motion"], projectPath);
}

async function setupLucide(projectPath: string) {
  await runCommand("npm", ["install", "lucide-react"], projectPath);
}

async function setupExamples(projectPath: string, config: ProjectConfig) {
  // If CRUD example
  if (config.examples === "crud" || config.examples === "both") {
    // API Route
    await fs.ensureDir(path.join(projectPath, "src/app/api/posts"));
    await fs.writeFile(
      path.join(projectPath, "src/app/api/posts/route.ts"),
      exampleApiHandler(config.prisma)
    );

    // Page
    await fs.ensureDir(path.join(projectPath, "src/app/posts"));
    await fs.writeFile(
      path.join(projectPath, "src/app/posts/page.tsx"),
      examplePage(config.reactQuery, config.axios)
    );
  }

  // Auth example (Basic skeleton)
  if (config.examples === "auth" || config.examples === "both") {
    // Just a placeholder page
    await fs.ensureDir(path.join(projectPath, "src/app/auth"));
    await fs.writeFile(
      path.join(projectPath, "src/app/auth/page.tsx"),
      `
export default function AuthPage() {
    return <div>Auth Page Placeholder (Extend with NextAuth/Clerk)</div>
}
`
    );
  }
}

async function setupProviders(projectPath: string, config: ProjectConfig) {
  // 1. Write providers component
  await fs.ensureDir(path.join(projectPath, "src/components"));
  await fs.writeFile(
    path.join(projectPath, "src/components/providers.tsx"),
    providersComponent(config)
  );

  // 2. Wrap layout
  const layoutPath = path.join(projectPath, "src/app/layout.tsx");
  let layoutContent = await fs.readFile(layoutPath, "utf-8");

  // Add import
  layoutContent =
    "import { Providers } from '@/components/providers';\n" + layoutContent;

  // Wrap children
  // This is simple string replacement. A valid layout usually has {children} inside body.
  layoutContent = layoutContent.replace(
    "{children}",
    "<Providers>{children}</Providers>"
  );

  await fs.writeFile(layoutPath, layoutContent);
}
