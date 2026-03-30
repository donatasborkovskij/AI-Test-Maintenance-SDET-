import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/homePage";

test.describe("Home Page Tests", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test("should load home page with a non-empty title", async () => {
    const title = await homePage.getTitle();
    expect(title).not.toBe("");
  });

  test("should display a visible h1 heading on home page", async () => {
    await expect(homePage.heading).toBeVisible();
  });
});
