import { z } from "zod";
export const noteSchema = z.object({
  id: z.string().min(1),
  title: z.string().max(200),
  content: z.string().max(200000),
  tags: z.array(z.string().max(40)).max(30),
  favorite: z.boolean(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});
export const workspaceSchema = z
  .object({ version: z.literal(1), notes: z.array(noteSchema).max(2000) })
  .refine(
    (data) => new Set(data.notes.map((n) => n.id)).size === data.notes.length,
    "Duplicate note IDs",
  );
export type Note = z.infer<typeof noteSchema>;
export type Workspace = z.infer<typeof workspaceSchema>;
export function wikiLinks(content: string) {
  return [
    ...new Set(
      Array.from(content.matchAll(/\[\[([^\]\n]+)\]\]/g), (match) =>
        match[1].trim(),
      ).filter(Boolean),
    ),
  ];
}
export function getConnections(notes: Note[]) {
  return notes.flatMap((note) =>
    wikiLinks(note.content).flatMap((title) => {
      const target = notes.find(
        (n) => n.title.trim().toLocaleLowerCase() === title.toLocaleLowerCase(),
      );
      return target && target.id !== note.id
        ? [{ source: note.id, target: target.id }]
        : [];
    }),
  );
}
export function searchNotes(notes: Note[], query: string) {
  const q = query.toLocaleLowerCase().trim();
  return notes.filter((n) =>
    `${n.title} ${n.content} ${n.tags.join(" ")}`
      .toLocaleLowerCase()
      .includes(q),
  );
}
export const initialWorkspace: Workspace = {
  version: 1,
  notes: [
    {
      id: "welcome",
      title: "A garden of ideas",
      content:
        "# A garden of ideas\n\nWelcome to your second brain. This is a place for unfinished thoughts, happy discoveries, and ideas worth keeping.\n\n> You don’t need to know where an idea is going to give it a place to start.\n\n## Make a little connection\n\nTry linking a thought to [[Creative process]] or [[Learning in public]]. Every connection becomes a path in your knowledge graph.\n\n## A few things to try\n\n- [ ] Create your first note\n- [ ] Connect it with a [[wiki link]]\n- [ ] Explore the graph\n- [ ] Export a backup in Settings\n\n**Your notes stay in this browser.** No account, no server, just your ideas.",
      tags: ["getting-started", "ideas"],
      favorite: true,
      createdAt: "2026-11-10T10:00:00.000Z",
      updatedAt: "2026-11-13T09:00:00.000Z",
    },
    {
      id: "creative",
      title: "Creative process",
      content:
        "# Creative process\n\nCreativity is less about waiting for inspiration and more about making room for it.\n\n## Collect → Connect → Create\n\n1. Notice something interesting.\n2. Capture it without judging it.\n3. Connect it to something you already know.\n4. Let the connections surprise you.\n\nRelated: [[A garden of ideas]], [[Design principles]], [[Tiny habits]]\n\n> The best way to have a good idea is to have a lot of ideas.",
      tags: ["creativity", "ideas"],
      favorite: true,
      createdAt: "2026-11-09T10:00:00.000Z",
      updatedAt: "2026-11-12T11:00:00.000Z",
    },
    {
      id: "design",
      title: "Design principles",
      content:
        "# Design principles\n\nGood design makes room for the person using it.\n\n| Principle | In practice |\n| --- | --- |\n| Clarity | One obvious next step |\n| Consistency | Familiar patterns |\n| Feedback | Every action has a response |\n| Care | The details matter |\n\nSee also [[Creative process]] and [[Building with intention]].",
      tags: ["design", "craft"],
      favorite: false,
      createdAt: "2026-11-08T10:00:00.000Z",
      updatedAt: "2026-11-12T08:00:00.000Z",
    },
    {
      id: "learning",
      title: "Learning in public",
      content:
        "# Learning in public\n\nShare the small things you learn. Write the explanation you wish you had found.\n\n```ts\nconst learn = (curiosity: number) => curiosity + 1;\n```\n\n- Write down what surprised you.\n- Explain it in your own words.\n- Invite a different perspective.\n\nA practice connected to [[Tiny habits]] and [[Building with intention]].",
      tags: ["learning", "growth"],
      favorite: false,
      createdAt: "2026-11-08T10:00:00.000Z",
      updatedAt: "2026-11-11T10:00:00.000Z",
    },
    {
      id: "habits",
      title: "Tiny habits",
      content:
        "# Tiny habits\n\nMake it easy enough to do on a busy day.\n\n**Two minutes of writing is still writing.**\n\nMy daily practice:\n- [x] Read something that makes me curious\n- [ ] Capture one thought\n- [ ] Connect it to an existing note\n\nThis is how [[A garden of ideas]] grows. Related: [[Learning in public]].",
      tags: ["growth", "life"],
      favorite: true,
      createdAt: "2026-11-07T10:00:00.000Z",
      updatedAt: "2026-11-10T10:00:00.000Z",
    },
    {
      id: "building",
      title: "Building with intention",
      content:
        "# Building with intention\n\nBuild small. Understand deeply. Make it useful.\n\n## A question to return to\n\nWho is this for, and what becomes easier for them?\n\nLet [[Design principles]] guide the decisions. Let [[Creative process]] make room for exploration.",
      tags: ["craft", "ideas"],
      favorite: false,
      createdAt: "2026-11-06T10:00:00.000Z",
      updatedAt: "2026-11-09T10:00:00.000Z",
    },
  ],
};
