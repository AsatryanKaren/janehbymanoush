import { test, expect } from "@playwright/test";

test.describe("Public pages flow", () => {
  test("should load the home page", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Janeh by Manoush" }),
    ).toBeVisible();
    await expect(page.locator("text=Featured Pieces")).toBeVisible();
  });

  test("should navigate to Women catalog", async ({ page }) => {
    await page.goto("/");
    await page.click("text=Women");
    await expect(page).toHaveURL("/women");
    await expect(page.locator("text=Women's Collection")).toBeVisible();
  });

  test("should navigate to Men catalog", async ({ page }) => {
    await page.goto("/");
    await page.click("text=/^Men$/");
    await expect(page).toHaveURL("/men");
    await expect(page.locator("text=Men's Collection")).toBeVisible();
  });

  test("should open a product page by slug", async ({ page }) => {
    await page.goto("/products/test-slug");
    await expect(page).toHaveURL("/products/test-slug");
  });

  test("should navigate to About page", async ({ page }) => {
    await page.goto("/");
    await page.click("text=About");
    await expect(page).toHaveURL("/about");
    await expect(
      page.locator("text=About Janeh by Manoush"),
    ).toBeVisible();
  });

  test("should navigate to Contact page", async ({ page }) => {
    await page.goto("/");
    await page.click("text=Contact");
    await expect(page).toHaveURL("/contact");
    await expect(page.locator("text=Contact Us")).toBeVisible();
  });

  test("should show 404 for unknown routes", async ({ page }) => {
    await page.goto("/nonexistent-page");
    await expect(page.locator("text=404")).toBeVisible();
  });
});
