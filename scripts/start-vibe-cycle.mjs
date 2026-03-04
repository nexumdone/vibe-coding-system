#!/usr/bin/env node
import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function normalizeSlug(input) {
  return String(input || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createVibeCycle({ slug, title, outDir = "work" }) {
  const normalized = normalizeSlug(slug);
  if (!normalized) {
    throw new Error("Project slug is required.");
  }

  const repoRoot = path.resolve(__dirname, "..");
  const templateDir = path.join(repoRoot, "templates");
  const targetDir = path.resolve(repoRoot, outDir, normalized);

  await mkdir(targetDir, { recursive: true });

  const map = [
    ["CONCEPT_INTAKE.md", "01_CONCEPT_INTAKE.md"],
    ["SPEC_TEMPLATE.md", "02_SPEC.md"],
    ["PLAN_TEMPLATE.md", "03_PLAN.md"],
    ["TASKS_TEMPLATE.md", "04_TASKS.md"],
    ["COMMON_AI_MISTAKES.md", "05_COMMON_AI_MISTAKES.md"]
  ];

  for (const [src, dest] of map) {
    await cp(path.join(templateDir, src), path.join(targetDir, dest), { force: true });
  }

  const metaPath = path.join(targetDir, "00_PROJECT_META.md");
  const displayTitle = title?.trim() || normalized;
  const timestamp = new Date().toISOString();
  const meta = `# Project Meta\n\n- Slug: ${normalized}\n- Title: ${displayTitle}\n- Created: ${timestamp}\n- Status: Intake\n\n## Next\n1. Fill 01_CONCEPT_INTAKE.md\n2. Move to 02_SPEC.md\n3. Continue through plan and tasks\n`;
  await writeFile(metaPath, meta, "utf8");

  return { targetDir, slug: normalized, title: displayTitle };
}

async function main() {
  const args = process.argv.slice(2);
  const slugArg = args[0];
  const outIndex = args.indexOf("--out");
  const titleIndex = args.indexOf("--title");
  const outDir = outIndex >= 0 ? args[outIndex + 1] : "work";
  const title = titleIndex >= 0 ? args[titleIndex + 1] : undefined;

  if (!slugArg) {
    console.error("Usage: node scripts/start-vibe-cycle.mjs <project-slug> [--title \"Project Name\"] [--out work]");
    process.exit(1);
  }

  const result = await createVibeCycle({ slug: slugArg, title, outDir });
  console.log(`Created vibe cycle scaffold: ${result.targetDir}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
}
