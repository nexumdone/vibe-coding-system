import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, readFile, access } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { scaffoldMissionOs, normalizeOsId } from "../scripts/mission-os-scaffold.mjs";
import { isPathInsideRoot } from "../scripts/mission-os-boundary-check.mjs";
import { getMissionOsStatus } from "../scripts/mission-os-status.mjs";

test("normalizeOsId keeps clean uppercase id", () => {
  assert.equal(normalizeOsId(" construction os "), "CONSTRUCTION-OS");
  assert.equal(normalizeOsId("***"), "");
});

test("scaffoldMissionOs creates required structure and metadata", async () => {
  const temp = await mkdtemp(path.join(os.tmpdir(), "mission-os-"));
  try {
    const result = await scaffoldMissionOs({ osId: "construction", baseDir: temp, status: "Active" });

    for (const name of ["memory", "projects", "ops", "logs"]) {
      await access(path.join(result.rootPath, name));
    }

    const meta = JSON.parse(await readFile(path.join(result.rootPath, "os-meta.json"), "utf8"));
    assert.equal(meta.os_id, "CONSTRUCTION");
    assert.equal(meta.status, "Active");
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});

test("boundary checker passes safe path and blocks traversal", () => {
  const root = path.resolve("/tmp/mission-os-root");

  const safe = isPathInsideRoot(root, "projects/PRJ-1");
  assert.equal(safe.safe, true);

  const unsafe = isPathInsideRoot(root, "../NEXUM/secrets");
  assert.equal(unsafe.safe, false);
  assert.equal(unsafe.reason, "outside-root");
});

test("status returns expected fields", async () => {
  const temp = await mkdtemp(path.join(os.tmpdir(), "mission-os-status-"));
  try {
    await scaffoldMissionOs({ osId: "sandbox", baseDir: temp });
    const status = await getMissionOsStatus({ osId: "sandbox", baseDir: temp });

    assert.equal(status.os_id, "SANDBOX");
    assert.equal(status.metadata_found, true);
    assert.equal(status.structure.memory, "ok");
    assert.equal(status.structure.projects, "ok");
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});
