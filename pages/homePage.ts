import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class HomePage extends BasePage {
  readonly heading: Locator;
  readonly exampleLink: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole("heading", { level: 1 });
    this.exampleLink = page
      .getByRole("link", { name: /more information/i })
      .first();
  }

  async navigateToHome(): Promise<void> {
    await this.goto("/");
  }

  async getHeadingText(): Promise<string> {
    return (await this.heading.textContent()) || "";
  }

  async clickExampleLink(): Promise<void> {
    await this.exampleLink.click();
  }

  async isHeadingVisible(): Promise<boolean> {
    return await this.heading.isVisible();
  }
}
