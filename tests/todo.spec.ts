import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');

    // Quick login
    await page.fill('[formControlName="username"]', 'testuser');
    await page.fill('[formControlName="password"]', 'password');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should add a new todo', async ({ page }) => {
    const title = `Task ${Date.now()}`;
    const description = 'Playwright Test';

    await page.fill('[formControlName="title"]', title);
    await page.fill('[formControlName="description"]', description);
    await page.click('button[type="submit"]');

    // Verify last item contains new title
    await expect(page.locator('mat-list-item').last()).toContainText(title);
  });

});