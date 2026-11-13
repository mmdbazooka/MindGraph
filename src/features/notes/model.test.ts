import { describe, it, expect } from "vitest";
import {
  initialWorkspace,
  workspaceSchema,
  wikiLinks,
  getConnections,
  searchNotes,
} from "./model";
describe("knowledge model", () => {
  it("extracts unique wiki titles and ignores malformed links", () => {
    expect(
      wikiLinks("[[ A thought ]] [[A thought]] [[Another]] [[broken\nline]]"),
    ).toEqual(["A thought", "Another"]);
  });
  it("resolves connections case-insensitively without self-links or missing targets", () => {
    const a = {
      ...initialWorkspace.notes[0],
      id: "a",
      title: "Alpha",
      content: "[[BETA]] [[Alpha]] [[Missing]]",
    };
    const b = { ...a, id: "b", title: "Beta", content: "" };
    expect(getConnections([a, b])).toEqual([{ source: "a", target: "b" }]);
  });
  it("searches content, tags, and Persian text", () => {
    const n = {
      ...initialWorkspace.notes[0],
      title: "یک ایده تازه",
      tags: ["خلاقیت"],
      content: "A tiny seed",
    };
    expect(searchNotes([n], "ایده")).toHaveLength(1);
    expect(searchNotes([n], "خلاقیت")).toHaveLength(1);
    expect(searchNotes([n], "SEED")).toHaveLength(1);
    expect(searchNotes([n], "missing")).toHaveLength(0);
  });
  it("accepts complete backups and rejects corrupt versions and duplicate IDs", () => {
    expect(workspaceSchema.safeParse(initialWorkspace).success).toBe(true);
    expect(
      workspaceSchema.safeParse({ ...initialWorkspace, version: 2 }).success,
    ).toBe(false);
    expect(
      workspaceSchema.safeParse({
        ...initialWorkspace,
        notes: [initialWorkspace.notes[0], initialWorkspace.notes[0]],
      }).success,
    ).toBe(false);
  });
});
