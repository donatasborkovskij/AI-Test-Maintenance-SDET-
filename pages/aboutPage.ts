import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class AboutPage extends BasePage {
  readonly aboutHeading: Locator;
  readonly description: Locator;
  readonly backLink: Locator;

  constructor(page: Page) {
    super(page);
    this.aboutHeading = page.getByRole("heading", { level: 1 });
    this.description = page.locator("p").first();
    this.backLink = page.getByRole("link", { name: /back|home/i }).first();
  }

  async navigateToAbout(): Promise<void> {
    await this.goto("/about");
  }

  async getAboutHeadingText(): Promise<string> {
    return (await this.aboutHeading.textContent()) || "";
  }

  async getDescriptionText(): Promise<string> {
    return (await this.description.textContent()) || "";
  }

  async clickBackLink(): Promise<void> {
    await this.backLink.click();
  }

  async isAboutPageLoaded(): Promise<boolean> {
    return await this.aboutHeading.isVisible();
  }
}
