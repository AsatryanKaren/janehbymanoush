import { test, expect } from "@playwright/test";

test.describe("Admin panel flow", () => {
  test("should open admin products page", async ({ page }) => {
    await page.goto("/admin/products");
    await expect(
      page.getByRole("heading", { name: "Products" }),
    ).toBeVisible();
    await expect(page.locator("table")).toBeVisible();
  });

  test("should open admin orders page", async ({ page }) => {
    await page.goto("/admin/orders");
    await expect(page.getByRole("heading", { name: "Orders" })).toBeVisible();
    await expect(page.locator("table")).toBeVisible();
  });

  test("should have sidebar navigation", async ({ page }) => {
    await page.goto("/admin/products");
    await expect(page.locator("text=Admin Panel")).toBeVisible();
    await expect(page.getByRole("menu").getByText("Products")).toBeVisible();
    await expect(page.getByRole("menu").getByText("Orders")).toBeVisible();
  });

  test("should navigate between admin pages", async ({ page }) => {
    await page.goto("/admin/products");
    await page.click(".ant-menu >> text=Orders");
    await expect(page).toHaveURL("/admin/orders");
  });
});
