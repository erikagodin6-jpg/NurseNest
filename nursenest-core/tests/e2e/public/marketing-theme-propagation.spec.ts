import { test, expect } from "@playwright/test";

const TRIO = ["ocean", "blush", "midnight"] as const;

function themeLabel(id: (typeof TRIO)[number]): string {
  if (id === "blush") return "Blush";
  if (id === "midnight") return "Midnight";
  return "Ocean";
}

async function openThemeMenu(page: import("@playwright/test").Page) {
  const trigger = page.getByTestId("theme-picker-trigger").first();
  await expect(trigger).toBeVisible({ timeout: 20_000 });
  await trigger.click();
}

async function pickTheme(page: import("@playwright/test").Page, label: string) {
  await page.getByRole("option", { name: label, exact: true }).click();
}

test.describe("Marketing theme propagation @theme", () => {
  test("pricing: data-theme + surfaces differ ocean vs midnight; layout stable", async ({ page }, testInfo) => {
    await page.goto("/pricing", { waitUntil: "domcontentloaded" });

    const main = page.getByTestId("marketing-pricing-root");
    await expect(main).toBeVisible();
    const box0 = await main.boundingBox();
    expect(box0?.width).toBeGreaterThan(200);

    type Sample = { id: string; pbg: string; cbg: string; htc: string };
    const samples: Sample[] = [];

    for (const id of TRIO) {
      await openThemeMenu(page);
      await pickTheme(page, themeLabel(id));
      await page.waitForTimeout(150);

      await expect(page.locator("html")).toHaveAttribute("data-theme", id);

      const shell = page.locator(".nn-marketing-surface").first();
      const card = page.locator(".nn-card").first();
      const h1 = page.locator("h1").first();
      const pbg = await shell.evaluate((el) => getComputedStyle(el).backgroundColor);
      const cbg = await card.evaluate((el) => getComputedStyle(el).backgroundColor);
      const htc = await h1.evaluate((el) => getComputedStyle(el).color);
      samples.push({ id, pbg, cbg, htc });

      await page.screenshot({ path: testInfo.outputPath(`pricing-${id}.png`), fullPage: true });

      const box = await main.boundingBox();
      expect(Math.abs((box?.width ?? 0) - (box0?.width ?? 0))).toBeLessThanOrEqual(8);
      expect(Math.abs((box?.height ?? 0) - (box0?.height ?? 0))).toBeLessThanOrEqual(120);
    }

    const ocean = samples.find((s) => s.id === "ocean");
    const blush = samples.find((s) => s.id === "blush");
    const midnight = samples.find((s) => s.id === "midnight");
    expect(ocean).toBeTruthy();
    expect(blush).toBeTruthy();
    expect(midnight).toBeTruthy();

    expect(midnight!.pbg).not.toBe(ocean!.pbg);
    expect(midnight!.cbg).not.toBe(ocean!.cbg);
    expect(midnight!.htc).not.toBe(ocean!.htc);

    expect(blush!.pbg).not.toBe(ocean!.pbg);

    // eslint-disable-next-line no-console -- artifact paths in CI
    console.log(
      "screenshots",
      TRIO.map((id) => `${id}: ${testInfo.outputPath(`pricing-${id}.png`)}`).join(" | "),
    );
  });

  test("blog + RN hub: theme attribute updates", async ({ page }, testInfo) => {
    await page.goto("/blog", { waitUntil: "domcontentloaded" });
    await openThemeMenu(page);
    await pickTheme(page, "Blush");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "blush");
    await page.screenshot({ path: testInfo.outputPath("blog-blush.png"), fullPage: true });

    await openThemeMenu(page);
    await pickTheme(page, "Midnight");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "midnight");
    await page.screenshot({ path: testInfo.outputPath("blog-midnight.png"), fullPage: true });

    await page.goto("/nclex-rn-practice-questions", { waitUntil: "domcontentloaded" });
    await openThemeMenu(page);
    await pickTheme(page, "Ocean");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "ocean");
    await page.screenshot({ path: testInfo.outputPath("hub-rn-ocean.png"), fullPage: true });
  });
});
