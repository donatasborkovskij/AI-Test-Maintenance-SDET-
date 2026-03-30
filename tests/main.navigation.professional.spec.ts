import { expect, test } from "@playwright/test";
import { MainPage, NavLabel } from "../pages/mainPage";

const navigationCases: Array<{
  label: NavLabel;
  expectedUrl: RegExp;
}> = [
  { label: "Docs", expectedUrl: /https:\/\/playwright\.dev\/docs(\/|$)/ },
  { label: "API", expectedUrl: /https:\/\/playwright\.dev\/docs\/api(\/|$)/ },
  {
    label: "Community",
    expectedUrl: /https:\/\/playwright\.dev\/community(\/|$)/,
  },
];

test.describe("Main Page Navigation Buttons", () => {
  test("should display Docs, API, and Community as accessible links", async ({
    page,
  }) => {
    const mainPage = new MainPage(page);

    await test.step("Open Playwright main page", async () => {
      await mainPage.navigateToMainPage();
    });

    await test.step("Assert Docs, API, and Community links are visible", async () => {
      await mainPage.assertNavLinkIsAccessible("Docs");
      await mainPage.assertNavLinkIsAccessible("API");
      await mainPage.assertNavLinkIsAccessible("Community");
    });
  });

  for (const navigationCase of navigationCases) {
    test(`should navigate correctly when clicking ${navigationCase.label}`, async ({
      page,
    }) => {
      const mainPage = new MainPage(page);

      await test.step("Open Playwright main page", async () => {
        await mainPage.navigateToMainPage();
      });

      await test.step(`Click ${navigationCase.label} link and verify destination`, async () => {
        await mainPage.clickNavLinkAndVerifyDestination(
          navigationCase.label,
          navigationCase.expectedUrl,
        );
      });
    });
  }

  test("TC-NAV-001 edge: Docs link should not navigate to an incorrect section URL", async ({
    page,
  }) => {
    const mainPage = new MainPage(page);

    await test.step("Open the main page", async () => {
      await mainPage.navigateToMainPage();
    });

    await test.step("Click Docs via POM and verify it routes to the correct URL", async () => {
      await mainPage.clickNavLinkAndVerifyDestination(
        "Docs",
        /https:\/\/playwright\.dev\/docs(\/|$)/,
      );
    });

    await test.step("Assert Docs did not route to any other section", async () => {
      await expect(page).not.toHaveURL(/\/community(\/|$)/);
      await expect(page).not.toHaveURL(/\/docs\/api(\/|$)/);
    });
  });
});
