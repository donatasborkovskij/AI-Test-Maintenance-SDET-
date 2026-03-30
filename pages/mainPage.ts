import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export type NavLabel = "Docs" | "API" | "Community";

export class MainPage extends BasePage {
  readonly docsNavLink: Locator;
  readonly apiNavLink: Locator;
  readonly communityNavLink: Locator;

  constructor(page: Page) {
    super(page);
    this.docsNavLink = page.getByRole("link", { name: "Docs", exact: true });
    this.apiNavLink = page.getByRole("link", { name: "API", exact: true });
    this.communityNavLink = page.getByRole("link", {
      name: "Community",
      exact: true,
    });
  }

  async navigateToMainPage(): Promise<void> {
    await this.goto("https://playwright.dev/");
  }

  navLink(name: NavLabel): Locator {
    switch (name) {
      case "Docs":
        return this.docsNavLink;
      case "API":
        return this.apiNavLink;
      case "Community":
        return this.communityNavLink;
    }
  }

  async assertNavLinkIsAccessible(name: NavLabel): Promise<void> {
    const link = this.navLink(name);

    await expect(link).toBeVisible();
    await expect(link).toHaveAccessibleName(name);
    await expect(link).toHaveRole("link");
  }

  async clickNavLinkAndVerifyDestination(
    name: NavLabel,
    expectedUrl: RegExp,
  ): Promise<void> {
    const link = this.navLink(name);

    await expect(link).toBeVisible();
    await Promise.all([this.page.waitForURL(expectedUrl), link.click()]);
    await expect(this.page).toHaveURL(expectedUrl);
  }
}
