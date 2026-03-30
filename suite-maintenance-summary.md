# suite-maintenance-summary.md

## Scope Reviewed

- tests/about.spec.ts
- tests/home.spec.ts
- tests/main.navigation.spec.ts
- tests/main.navigation.refactored.spec.ts
- tests/main.navigation.professional.spec.ts

## Findings (Prioritized)

1. High: Legacy navigation spec contains obsolete synchronization and overlaps newer suites.

- File/lines: tests/main.navigation.spec.ts:17-33
- Issue: uses fixed wait (`waitForTimeout(2000)`) and repeats navigation scenarios already covered by newer specs.
- Impact: higher flakiness risk and duplicate maintenance effort.

2. High: Navigation coverage is split across two modern files with overlapping Docs checks.

- Files/lines: tests/main.navigation.refactored.spec.ts:33-50 and tests/main.navigation.professional.spec.ts:5-25
- Issue: both validate Docs navigation behavior in different styles.
- Impact: duplication and inconsistent evolution when requirements change.

3. Medium: Home/About tests are weak smoke checks and not aligned with meaningful behavior.

- Files/lines: tests/home.spec.ts:12-20 and tests/about.spec.ts:12-20
- Issue: assertions mostly check `title is defined` or a generic heading visibility boolean.
- Impact: low signal tests that may pass while behavior regresses.

4. Medium: Selector strategy in Home/About page objects is generic and potentially brittle.

- Files/lines: pages/homePage.ts:10-12, pages/aboutPage.ts:11-13
- Issue: broad selectors like `h1`, first paragraph, first matching link.
- Impact: accidental matches and fragile intent when markup changes.

5. Low: MainPage has helper duplication that is no longer needed by modern suite.

- File/lines: pages/mainPage.ts:55-65
- Issue: `openDocs/openApi/openCommunity` duplicates behavior already abstracted by `clickNavLinkAndVerifyDestination`.
- Impact: extra API surface and future drift risk.

## Consolidation Plan

1. Keep tests/main.navigation.refactored.spec.ts as the canonical navigation suite.
2. Merge the edge assertion from tests/main.navigation.professional.spec.ts into refactored suite as an additional test block, then retire professional file.
3. Retire tests/main.navigation.spec.ts (legacy) by skipping/deprecating first, then deleting once CI is green for one cycle.
4. Strengthen Home/About assertions to check specific behavior/content, not only existence booleans.
5. Gradually migrate Home/About locators to role/name-anchored selectors in their page objects.
6. Remove unused MainPage methods (`openDocs/openApi/openCommunity`) once no spec references remain.

## Representative Cleanup Diff

Target file: tests/main.navigation.spec.ts

```diff
--- a/tests/main.navigation.spec.ts
+++ b/tests/main.navigation.spec.ts
@@
-import { expect, test } from "@playwright/test";
-import { MainPage } from "../pages/mainPage";
-
-test.describe("Main page navigation", () => {
-  test("should display navigation buttons: Docs, API, Community", async ({
-    page,
-  }) => {
-    const mainPage = new MainPage(page);
-
-    await mainPage.navigateToMainPage();
-
-    await expect(mainPage.docsNavLink).toBeVisible();
-    await expect(mainPage.apiNavLink).toBeVisible();
-    await expect(mainPage.communityNavLink).toBeVisible();
-  });
-
-  test("should open correct pages from navigation links", async ({ page }) => {
-    const mainPage = new MainPage(page);
-
-    await mainPage.navigateToMainPage();
-
-    await mainPage.openDocs();
-    await page.waitForTimeout(2000);
-
-    await mainPage.openApi();
-    await expect(page).toHaveURL(/\/docs\/api\//);
-
-    await Promise.all([
-      page.waitForURL(/\/community\//),
-      mainPage.openCommunity(),
-    ]);
-    await expect(page).toHaveURL(/\/community\//);
-  });
-});
+import { test } from "@playwright/test";
+
+test.describe.skip("DEPRECATED: replaced by main.navigation.refactored.spec.ts", () => {
+  test("legacy navigation suite has been superseded", async () => {
+    // Intentionally skipped to avoid duplicate coverage and fixed-timeout flakiness.
+  });
+});
```
