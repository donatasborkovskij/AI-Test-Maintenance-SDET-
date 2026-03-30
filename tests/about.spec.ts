import { expect, test } from "@playwright/test";
import { AboutPage } from "../pages/aboutPage";

test.describe("About Page Tests", () => {
  let aboutPage: AboutPage;

  test.beforeEach(async ({ page }) => {
    aboutPage = new AboutPage(page);
    await aboutPage.navigateToAbout();
  });

  test("should load about page with a non-empty title", async () => {
    const title = await aboutPage.getTitle();
    expect(title).not.toBe("");
  });

  test("should display a visible h1 heading on the about page", async () => {
    await expect(aboutPage.aboutHeading).toBeVisible();
  });
});
