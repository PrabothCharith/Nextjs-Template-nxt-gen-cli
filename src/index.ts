import { Command } from "commander";
import prompts from "prompts";
import chalk from "chalk";
import path from "path";
import fs from "fs-extra";
import { initialPrompt } from "./prompts";

export async function main() {
  const program = new Command();

  program
    .name("nxt-gen-cli")
    .description("Create Next.js Project with Custom Features")
    .version("1.0.0")
    .argument("[name]", "Project name")
    .option("--prisma", "Install Prisma")
    .option("--react-query", "Install React Query")
    .option("--axios", "Install Axios")
    .option("--ui <type>", "UI Library (shadcn, heroui, both, none)")
    .option("--framer-motion", "Install Framer Motion")
    .option("--lucide", "Install Lucide React")
    .option("--examples <type>", "Examples (crud, auth, both, none)")
    .action(async (name, options) => {
      let projectName = name;

      if (!projectName) {
        const response = await prompts({
          type: "text",
          name: "name",
          message: "What is the name of your project?",
          initial: "my-app",
        });
        projectName = response.name;
      }

      if (!projectName) {
        console.log(chalk.red("Project name is required."));
        process.exit(1);
      }

      const config = await initialPrompt(options);
      console.log(chalk.blue("Selected Configuration:"), config);

      try {
        const { scaffoldProject } = await import("./scaffold");
        await scaffoldProject(projectName, config);
      } catch (error) {
        console.error(chalk.red("Failed to create project:"), error);
        process.exit(1);
      }
    });

  program.parse(process.argv);
}
