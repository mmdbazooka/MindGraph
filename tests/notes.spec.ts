import { test, expect } from "@playwright/test";
test("create, edit, link, search, favorite, reload, and delete a note", async ({
  page,
}) => {
  await page.goto("/dashboard");
  await page.getByRole("button", { name: "New note", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Note title", exact: true })
    .fill("A portfolio thought");
  await page
    .getByRole("textbox", { name: "Markdown content", exact: true })
    .fill(
      "# A real idea\n\nHello **world**. Connected to [[Creative process]] and [[New linked thought]].",
    );
  await page
    .getByRole("textbox", { name: "Tags separated by commas" })
    .fill("portfolio, design");
  await page.getByRole("textbox", { name: "Tags separated by commas" }).blur();
  await page
    .getByRole("button", { name: "Toggle favorite", exact: true })
    .click();
  await page.reload();
  await expect(
    page.getByRole("textbox", { name: "Note title", exact: true }),
  ).toHaveValue("A portfolio thought");
  await expect(
    page.getByRole("button", { name: "Toggle favorite", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".markdown strong")).toHaveText("world");
  await page
    .locator(".markdown")
    .getByRole("link", { name: "Creative process", exact: true })
    .click();
  await expect(
    page.getByRole("textbox", { name: "Note title", exact: true }),
  ).toHaveValue("Creative process");
  await expect(
    page
      .locator(".backlinks")
      .getByRole("link", { name: "A portfolio thought" }),
  ).toBeVisible();
  await page
    .locator(".backlinks")
    .getByRole("link", { name: "A portfolio thought" })
    .click();
  await page
    .locator(".markdown")
    .getByRole("link", { name: "New linked thought" })
    .click();
  await expect(
    page.getByRole("textbox", { name: "Note title", exact: true }),
  ).toHaveValue("New linked thought");
  await page.goto("/dashboard/library");
  await page.getByRole("textbox", { name: "Search library" }).fill("portfolio");
  await expect(page.locator(".note-card")).toHaveCount(1);
  await page
    .locator(".note-card")
    .getByRole("heading", { name: "A portfolio thought" })
    .click();
  await page.getByRole("button", { name: "Delete note", exact: true }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Delete note", exact: true })
    .click();
  await page.goto("/dashboard/library");
  await page
    .getByRole("textbox", { name: "Search library" })
    .fill("A portfolio thought");
  await expect(page.locator(".note-card")).toHaveCount(0);
});
test("graph nodes and command search navigate to the selected note", async ({
  page,
}) => {
  await page.goto("/dashboard/graph");
  await page
    .getByRole("link", { name: "Creative process", exact: true })
    .click();
  await expect(
    page.getByRole("textbox", { name: "Note title", exact: true }),
  ).toHaveValue("Creative process");
  await page.keyboard.press("Control+k");
  await page.getByRole("dialog").getByRole("textbox").fill("Tiny habits");
  await page
    .getByRole("dialog")
    .getByRole("link", { name: /^Tiny habits/ })
    .click();
  await expect(
    page.getByRole("textbox", { name: "Note title", exact: true }),
  ).toHaveValue("Tiny habits");
});

test("edits synchronize between tabs without a reload", async ({
  page,
  context,
}) => {
  await page.goto("/dashboard/notes?id=welcome");
  const other = await context.newPage();
  await other.goto("/dashboard/notes?id=welcome");
  await expect(
    other.getByRole("textbox", { name: "Note title", exact: true }),
  ).toHaveValue("A garden of ideas");
  await page
    .getByRole("textbox", { name: "Note title", exact: true })
    .fill("A shared local thought");
  await expect(
    other.getByRole("textbox", { name: "Note title", exact: true }),
  ).toHaveValue("A shared local thought");
  await other.close();
});
