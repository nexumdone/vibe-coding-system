#!/usr/bin/env node
import { access, readFile } from "node:fs/promises";
import path from "node:path";

const REQUIRED_DIRS = ["memory", "projects", "ops", "logs"];

export async function getMissionOsStatus({ osId, baseDir = "work/mission-os-build/os" }) {
  const normalized = String(osId || "").trim().toUpperCase();
  if (!normalized) {
    throw new Error("OS id is required.");
  }

  const rootPath = path.resolve(baseDir, normalized);
  const metaPath = path.join(rootPath, "os-meta.json");

  const structure = {};
  for (const dir of REQUIRED_DIRS) {
    try {
      await access(path.join(rootPath, dir));
      structure[dir] = "ok";
    } catch {
      structure[dir] = "missing";
    }
  }

  let meta = null;
  try {
    const raw = await readFile(metaPath, "utf8");
    meta = JSON.parse(raw);
  } catch {
    meta = null;
  }

  return {
    os_id: normalized,
    root_path: rootPath,
    metadata_found: Boolean(meta),
    status: meta?.status || "unknown",
    structure
  };
}

async function main() {
  const args = process.argv.slice(2);
  const osId = args[0];
  const baseIndex = args.indexOf("--base");
  const baseDir = baseIndex >= 0 ? args[baseIndex + 1] : "work/mission-os-build/os";

  if (!osId) {
    console.error("Usage: node scripts/mission-os-status.mjs <OS_ID> [--base work/mission-os-build/os]");
    process.exit(1);
  }

  const result = await getMissionOsStatus({ osId, baseDir });
  console.log(JSON.stringify(result, null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
}
