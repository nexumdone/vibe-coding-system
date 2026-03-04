#!/usr/bin/env node
import path from "node:path";

export function isPathInsideRoot(rootPath, candidatePath) {
  const resolvedRoot = path.resolve(rootPath);
  const resolvedCandidate = path.isAbsolute(candidatePath)
    ? path.resolve(candidatePath)
    : path.resolve(resolvedRoot, candidatePath);

  const safe = resolvedCandidate === resolvedRoot || resolvedCandidate.startsWith(`${resolvedRoot}${path.sep}`);

  return {
    safe,
    rootPath: resolvedRoot,
    candidatePath,
    resolvedCandidate,
    reason: safe ? "inside-root" : "outside-root"
  };
}

async function main() {
  const args = process.argv.slice(2);
  const rootPath = args[0];
  const candidatePath = args[1];

  if (!rootPath || !candidatePath) {
    console.error("Usage: node scripts/mission-os-boundary-check.mjs <os-root-path> <candidate-path>");
    process.exit(1);
  }

  const result = isPathInsideRoot(rootPath, candidatePath);
  if (result.safe) {
    console.log(`PASS: ${result.resolvedCandidate} is inside ${result.rootPath}`);
    process.exit(0);
  }

  console.error(`FAIL: ${result.resolvedCandidate} escapes ${result.rootPath}`);
  process.exit(2);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
}
