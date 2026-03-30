# Refactor comparisons

## Degreded code

The tests related to navigation were failing after degrading the test related to them.

## AI refactored code

AI recfactored the code and created multiple checks for navigation links, while fixing the digradation introduces in the last step.

## Manual Improvements

I manualy created async `assertNavLinkIsAccessible` and `async clickNavLinkAndVerifyDestination` to remove repeated stems after the AI refactor. AI also did not refactor navigation locators back.
