import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, access, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { createVibeCycle, normalizeSlug } from "../scripts/start-vibe-cycle.mjs";

test("normalizeSlug formats friendly slugs", () => {
  assert.equal(normalizeSlug(" My Cool App! "), "my-cool-app");
  assert.equal(normalizeSlug("***"), "");
});

test("createVibeCycle creates all expected files", async () => {
  const temp = await mkdtemp(path.join(os.tmpdir(), "vibe-cycle-"));
  try {
    const result = await createVibeCycle({ slug: "Pilot App", outDir: temp, title: "Pilot App" });

    const expected = [
      "00_PROJECT_META.md",
      "01_CONCEPT_INTAKE.md",
      "02_SPEC.md",
      "03_PLAN.md",
      "04_TASKS.md",
      "05_COMMON_AI_MISTAKES.md"
    ];

    for (const name of expected) {
      await access(path.join(result.targetDir, name));
    }

    const meta = await readFile(path.join(result.targetDir, "00_PROJECT_META.md"), "utf8");
    assert.match(meta, /Title: Pilot App/);
    assert.match(meta, /Status: Intake/);
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});
