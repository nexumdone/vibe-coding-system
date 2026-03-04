#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export function normalizeOsId(input) {
  return String(input || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function scaffoldMissionOs({ osId, baseDir = "work/mission-os-build/os", status = "Draft" }) {
  const normalized = normalizeOsId(osId);
  if (!normalized) {
    throw new Error("OS id is required.");
  }

  const rootPath = path.resolve(baseDir, normalized);
  const requiredDirs = ["memory", "projects", "ops", "logs"];

  await mkdir(rootPath, { recursive: true });
  for (const dir of requiredDirs) {
    await mkdir(path.join(rootPath, dir), { recursive: true });
  }

  const meta = {
    os_id: normalized,
    created_at: new Date().toISOString(),
    status,
    root_path: rootPath
  };

  await writeFile(path.join(rootPath, "os-meta.json"), `${JSON.stringify(meta, null, 2)}\n`, "utf8");

  return { rootPath, osId: normalized, meta };
}

async function main() {
  const args = process.argv.slice(2);
  const osId = args[0];
  const baseIndex = args.indexOf("--base");
  const statusIndex = args.indexOf("--status");
  const baseDir = baseIndex >= 0 ? args[baseIndex + 1] : "work/mission-os-build/os";
  const status = statusIndex >= 0 ? args[statusIndex + 1] : "Draft";

  if (!osId) {
    console.error("Usage: node scripts/mission-os-scaffold.mjs <OS_ID> [--base work/mission-os-build/os] [--status Draft]");
    process.exit(1);
  }

  const result = await scaffoldMissionOs({ osId, baseDir, status });
  console.log(`OS scaffold ready: ${result.osId} at ${result.rootPath}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
}
