import { test, expect } from "@playwright/test";

/**
 * Public nursing pathway hubs (English canonical URLs via `/{slug}` → `/seo/{slug}` rewrite).
 * @see next.config.ts programmatic SEO rewrites + `resolveNursingPathwayHubKindFromSlug`.
 */
test.describe("Pathway hub premium module grid", () => {
  test("RN US hub shows ECG tile and hides OSCE deep link when scenarios disabled", async ({ page }) => {
    await page.goto("/nclex-rn-practice-questions", { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("section-exam-pathway-premium-modules")).toBeVisible();
    await expect(page.getByTestId("premium-module-ecg")).toBeVisible();
    await expect(page.getByTestId("premium-module-ngn")).toBeVisible();
    await expect(page.locator('[data-testid="premium-module-osce"]')).toHaveCount(0);
    await expect(page.getByTestId("premium-module-osce-locked")).toBeVisible();
    const hubMarkup = await page.getByTestId("section-exam-pathway-premium-modules").innerHTML();
    expect(hubMarkup).not.toContain("/admin");
    expect(hubMarkup).not.toContain('href="/app/osce"');
  });

  test("RPN Canada hub omits ECG tile", async ({ page }) => {
    await page.goto("/rex-pn-practice-questions", { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("section-exam-pathway-premium-modules")).toBeVisible();
    await expect(page.locator('[data-testid="premium-module-ecg"]')).toHaveCount(0);
    await expect(page.getByTestId("premium-module-labs")).toBeVisible();
  });

  test("NP hub shows ECG and NP clinical cases", async ({ page }) => {
    await page.goto("/np-exam-practice-questions", { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("premium-module-ecg")).toBeVisible();
    await expect(page.getByTestId("premium-module-np-cases")).toBeVisible();
  });

  test("New Grad hub omits ECG tile", async ({ page }) => {
    await page.goto("/new-graduate-nursing-roadmap", { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("section-exam-pathway-premium-modules")).toBeVisible();
    await expect(page.locator('[data-testid="premium-module-ecg"]')).toHaveCount(0);
    await expect(page.locator('[data-testid="premium-module-np-cases"]')).toHaveCount(0);
  });
});
