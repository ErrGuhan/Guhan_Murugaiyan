import { test, expect } from "@playwright/test";

test.describe("Resume Download API & Endpoint Verification", () => {
  test("GET /api/download-resume should return PDF file with RFC attachment headers and cache control", async ({
    request,
  }) => {
    const response = await request.get("/api/download-resume");
    expect(response.status()).toBe(200);

    const headers = response.headers();
    expect(headers["content-type"]).toBe("application/pdf");
    expect(headers["content-disposition"]).toContain("attachment");
    expect(headers["content-disposition"]).toContain('filename="Guhan_Murugaiyan_Resume.pdf"');
    expect(headers["cache-control"]).toContain("public");

    const body = await response.body();
    expect(body.length).toBeGreaterThan(400000); // 457KB resume PDF
    // PDF magic bytes %PDF-
    expect(body.subarray(0, 5).toString("utf-8")).toBe("%PDF-");
  });

  test("GET /api/download-resume?view=1 should return PDF with inline disposition for preview", async ({
    request,
  }) => {
    const response = await request.get("/api/download-resume?view=1");
    expect(response.status()).toBe(200);

    const headers = response.headers();
    expect(headers["content-type"]).toBe("application/pdf");
    expect(headers["content-disposition"]).toContain("inline");
    expect(headers["content-disposition"]).toContain('filename="Guhan_Murugaiyan_Resume.pdf"');
  });

  test("GET /resume.pdf should return static PDF with proper headers", async ({
    request,
  }) => {
    const response = await request.get("/resume.pdf");
    expect(response.status()).toBe(200);

    const headers = response.headers();
    expect(headers["content-type"]).toBe("application/pdf");
    const body = await response.body();
    expect(body.subarray(0, 5).toString("utf-8")).toBe("%PDF-");
  });
});

test.describe("Mobile Resume Download & Achievement Verification [iPhone SE]", () => {
  test.use({
    viewport: { width: 375, height: 667 },
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  });

  test("should initiate download and display achievement toast in mobile drawer without popup blocking", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    // Open mobile menu drawer
    const menuBtn = page.getByRole("button", { name: "Open navigation menu" });
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();
    await page.waitForTimeout(400);

    // Verify download link attributes on mobile
    const downloadLink = page.locator('a:has-text("DOWNLOAD RESUME (PDF)")');
    await expect(downloadLink).toBeVisible();
    await expect(downloadLink).toHaveAttribute("href", "/api/download-resume");
    await expect(downloadLink).toHaveAttribute("download", "Guhan_Murugaiyan_Resume.pdf");

    // Must NOT have target="_blank" on download link to avoid WebView / iOS Safari popup blocking
    const targetAttr = await downloadLink.getAttribute("target");
    expect(targetAttr).toBeNull();

    // Verify secondary online preview link exists
    const previewLink = page.locator('a:has-text("Preview Resume Online")');
    await expect(previewLink).toBeVisible();
    await expect(previewLink).toHaveAttribute("href", "/resume.pdf");

    // Click download button
    await downloadLink.click();
    await page.waitForTimeout(500);

    // Verify gamified achievement toast unlocked on mobile
    const toast = page.locator('aside[aria-label="Achievement notification"]');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText("INTEL ACQUIRED");
    await expect(toast).toContainText("+500 XP");
    await expect(toast).toContainText("downloaded to your local drive");
  });

  test("should trigger download and unlock achievement from Hero CTA on mobile", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    const heroResumeBtn = page.locator('#hero a:has-text("RESUME (PDF)")');
    await expect(heroResumeBtn).toBeVisible();
    await expect(heroResumeBtn).toHaveAttribute("href", "/api/download-resume");
    await expect(heroResumeBtn).toHaveAttribute("download", "Guhan_Murugaiyan_Resume.pdf");

    await heroResumeBtn.click();
    await page.waitForTimeout(500);

    const toast = page.locator('aside[aria-label="Achievement notification"]');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText("INTEL ACQUIRED");
  });
});

test.describe("Desktop Resume Download & Achievement Verification [1920x1080]", () => {
  test.use({
    viewport: { width: 1920, height: 1080 },
  });

  test("should trigger download from desktop Navbar and Hero buttons with achievement toast", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    // Navbar desktop resume button
    const navResumeBtn = page.locator('header a:has-text("RESUME")').first();
    await expect(navResumeBtn).toBeVisible();
    await expect(navResumeBtn).toHaveAttribute("href", "/api/download-resume");
    await expect(navResumeBtn).toHaveAttribute("download", "Guhan_Murugaiyan_Resume.pdf");

    await navResumeBtn.click();
    await page.waitForTimeout(500);

    const toast = page.locator('aside[aria-label="Achievement notification"]');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText("INTEL ACQUIRED");
    await expect(toast).toContainText("+500 XP");
  });
});
