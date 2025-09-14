import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[formControlName="username"]', 'testuser');
  await page.fill('input[formControlName="password"]', '123456');
  await page.click('button[type="submit"]');

  // assert redirect
  await expect(page).toHaveURL(/dashboard/);
});
