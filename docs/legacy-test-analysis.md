# Legacy Test Analysis: main.navigation.spec.ts

## Prioritized Findings

1. High: Fixed timeout introduces nondeterministic timing and avoidable flakiness

- Category: synchronization
- Evidence: tests/main.navigation.spec.ts line with waitForTimeout(2000)
- Why it matters: a hard sleep can be too short on slow runs or unnecessarily slow on fast runs, and does not guarantee the app reached the expected state.

2. High: Docs navigation target is not validated

- Category: coverage
- Evidence: tests/main.navigation.spec.ts docs click step does not assert destination
- Why it matters: the manual case says links should navigate correctly, but Docs click has no URL/content assertion afterward.

3. High: Locator strategy violates role+name expectation and weakens accessibility alignment

- Category: selector quality, accessibility
- Evidence: pages/mainPage.ts uses #docs, #api, #community
- Why it matters: ID and CSS selectors can pass even if accessible name and role are wrong, so they do not verify that the controls are discoverable as Docs/API/Community links.

4. Medium: Navigation assertions are partial and asymmetric across links

- Category: coverage, readability/reuse
- Evidence: API and Community validate URL, Docs does not; mixed assertion pattern
- Why it matters: mixed patterns increase maintenance cost and make intent less uniform.

5. Medium: Sequential flow couples checks to prior page state

- Category: duplication risks, flakiness
- Evidence: single test clicks Docs then API then Community in sequence
- Why it matters: failures can cascade and mask root cause, because later checks depend on previous transitions.

6. Medium: Visible checks do not confirm accessible link names or semantics

- Category: accessibility, coverage
- Evidence: visibility checks are done on locators, but no role+name assertions
- Why it matters: visibility alone does not prove elements are accessible as links named Docs/API/Community.

7. Low: URL regex checks are broad and can allow false positives

- Category: coverage
- Evidence: partial regex path checks
- Why it matters: broad regex can match unintended routes; tighter target checks reduce false positives.

## Recommended Fix Categories

1. Selector quality

- Migrate nav locators to role+name based selectors for Docs/API/Community.

2. Synchronization

- Replace fixed sleeps with state-based waiting tied to deterministic outcomes.

3. Coverage

- Assert all three links both exist and navigate correctly, including Docs target validation.

4. Accessibility

- Add assertions that links are discoverable by semantic role and accessible name.

5. Readability/reuse

- Standardize one navigation assertion pattern per link and reduce inter-step coupling.

6. Duplication risk control

- Encapsulate repeated navigation verification logic in POM helper methods.

## Additional Issues AI Missed

1. Missing explicit check for same-tab behavior vs opening a new tab/window.
2. Lack of post-navigation page-identity assertions beyond URL can miss redirects or wrong content on a matching path.
3. Brittle selectors in pages/mainPage.ts may silently break during frontend ID renames.

No code changes applied in Chapter 2.
