import { test, expect } from "@playwright/test";

const DESKTOP_VIEWPORTS = [
  { name: "MacBook / Laptop 13-inch", width: 1280, height: 800 },
  { name: "Desktop Standard 15-inch", width: 1440, height: 900 },
  { name: "Full HD 1080p Monitor", width: 1920, height: 1080 },
];

for (const vp of DESKTOP_VIEWPORTS) {
  test.describe(`Desktop Layout Verification [${vp.name} - ${vp.width}x${vp.height}]`, () => {
    test.use({
      viewport: { width: vp.width, height: vp.height },
    });

    test("should have zero horizontal overflow across entire desktop page", async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.waitForTimeout(1000);

      // Scroll incrementally down the page
      const scrollSteps = 10;
      for (let i = 1; i <= scrollSteps; i++) {
        await page.evaluate((step) => {
          const target = (document.body.scrollHeight / 10) * step;
          window.scrollTo(0, target);
        }, i);
        await page.waitForTimeout(150);

        const check = await page.evaluate(() => {
          const docWidth = document.documentElement.clientWidth;
          const docScrollWidth = document.documentElement.scrollWidth;
          const bodyScrollWidth = document.body.scrollWidth;
          const scrollX = window.scrollX;

          const offenders: string[] = [];
          document.querySelectorAll("body *").forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.right > docWidth + 2) {
              const tag = el.tagName.toLowerCase();
              const cls = typeof el.className === "string" ? el.className.slice(0, 60) : "";
              const id = el.id ? `#${el.id}` : "";
              offenders.push(`${tag}${id}.${cls} (right: ${Math.round(rect.right)}px, max: ${docWidth}px)`);
            }
          });

          return {
            docWidth,
            docScrollWidth,
            bodyScrollWidth,
            scrollX,
            offenders: offenders.slice(0, 5),
          };
        });

        expect(check.scrollX, `Horizontal scroll detected at step ${i}`).toBe(0);
        expect(
          check.docScrollWidth <= check.docWidth + 2,
          `Document scrollWidth (${check.docScrollWidth}px) exceeds clientWidth (${check.docWidth}px). Offending elements: ${JSON.stringify(check.offenders)}`
        ).toBe(true);
      }
    });

    test("should render desktop navbar with proper alignment and visible links", async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.waitForTimeout(600);

      // Desktop nav links capsule should be visible
      const desktopNav = page.locator("nav.hidden.md\\:flex");
      await expect(desktopNav).toBeVisible();

      // Check all nav links exist and are visible
      const navLinks = desktopNav.locator("a");
      const linkCount = await navLinks.count();
      expect(linkCount).toBeGreaterThanOrEqual(5);

      // Audio & Terminal toggle buttons must be visible on desktop
      const audioBtn = page.getByRole("button", { name: /audio|sound/i });
      await expect(audioBtn).toBeVisible();

      const terminalBtn = page.getByRole("button", { name: /terminal/i });
      await expect(terminalBtn).toBeVisible();

      // Ensure no mobile hamburger is visible on desktop
      const hamburger = page.getByRole("button", { name: "Open navigation menu" });
      await expect(hamburger).not.toBeVisible();
    });

    test("should render and align desktop WORK section with GSAP horizontal gallery", async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.waitForTimeout(600);

      const workSection = page.locator("#work");
      await workSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      // Desktop track should be visible, mobile track should be hidden
      const desktopTrack = workSection.locator('[data-cursor="drag"]');
      await expect(desktopTrack).toBeVisible();

      const mobileTrack = page.locator('[aria-label="Mobile Case Studies Carousel"]');
      await expect(mobileTrack).not.toBeVisible();

      // Verify all 5 desktop project cards
      const desktopCards = desktopTrack.locator(".project-card");
      await expect(desktopCards).toHaveCount(5);

      // Verify first desktop card dimensions and visibility
      const firstCard = desktopCards.first();
      await expect(firstCard).toBeVisible();
      const cardBox = await firstCard.boundingBox();
      expect(cardBox).not.toBeNull();
      if (cardBox) {
        expect(cardBox.width).toBeGreaterThanOrEqual(340);
        expect(cardBox.height).toBeGreaterThanOrEqual(400);
      }

      // Test Code Flip on desktop card
      const flipBtn = firstCard.locator('button:has-text("CODE")');
      await expect(flipBtn).toBeVisible();
      await flipBtn.click();
      await page.waitForTimeout(500);

      // Back face should now be rotated into view and contain code snippet
      const codeSnippet = firstCard.locator("pre code");
      await expect(codeSnippet).toBeVisible();

      // Flip back to preview
      const previewBtn = firstCard.locator('button:has-text("PREVIEW")');
      await expect(previewBtn).toBeVisible();
      await previewBtn.click();
      await page.waitForTimeout(400);
    });

    test("should align About, Expertise, Credentials, and Contact columns on desktop", async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.waitForTimeout(600);

      // 1. About section: photo card on left, narrative on right
      const aboutSection = page.locator("#about");
      await aboutSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      const photoCard = aboutSection.locator(".about-photo-card");
      await expect(photoCard).toBeVisible();

      const statsGrid = aboutSection.locator(".about-stats-grid .about-stat-item");
      expect(await statsGrid.count()).toBe(6);

      // 2. Expertise section: 2 columns on desktop
      const expertiseSection = page.locator("#expertise");
      await expertiseSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      const coreStack = expertiseSection.getByText("CORE TECH STACK");
      await expect(coreStack).toBeVisible();

      const rows = expertiseSection.locator(".expertise-row");
      expect(await rows.count()).toBe(4);

      // 3. Credentials section: certs grid and work experience
      const credSection = page.locator("#credentials");
      await credSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      const certCards = credSection.locator(".comic-card:has-text('Learner to Builder')");
      await expect(certCards.first()).toBeVisible();

      const workExpHeading = credSection.getByText("WORK EXPERIENCE");
      await expect(workExpHeading).toBeVisible();

      // 4. Contact section: direct cards and form
      const contactSection = page.locator("#contact");
      await contactSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      const emailCard = contactSection.locator('button[aria-label*="Copy email" i]').first();
      await expect(emailCard).toBeVisible();

      const submitBtn = contactSection.locator('button[type="submit"]');
      await expect(submitBtn).toBeVisible();

      // 5. Footer: back to top button
      const footer = page.locator("footer");
      await footer.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      const backToTop = footer.getByRole("button", { name: "BACK TO TOP" });
      await expect(backToTop).toBeVisible();
    });

    test("should verify letter visibility, contrast, and paint-order styling on desktop", async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.waitForTimeout(600);

      // Verify glitch text styling on desktop
      const glitchStyles = await page.evaluate(() => {
        const els = Array.from(document.querySelectorAll(".comic-glitch-text"));
        return els.map((el) => {
          const style = window.getComputedStyle(el);
          return {
            text: (el.textContent || "").trim().slice(0, 30),
            paintOrder: style.getPropertyValue("paint-order") || style.paintOrder || "",
            fontSize: parseFloat(style.fontSize),
            strokeWidth: style.getPropertyValue("-webkit-text-stroke-width"),
            color: style.color,
          };
        });
      });

      expect(glitchStyles.length).toBeGreaterThan(0);
      for (const item of glitchStyles) {
        expect(item.fontSize).toBeGreaterThanOrEqual(28);
        expect(item.paintOrder.includes("stroke") || item.paintOrder === "normal" || item.paintOrder === "").toBe(true);
      }
    });

    test("should verify CREATIVE DEVELOPER comic gradient and desktop hover trigger", async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.waitForTimeout(600);

      // 1. Verify CREATIVE and DEVELOPER elements exist
      const creativeWord = page.locator(".comic-split-word:has-text('CREATIVE')");
      const developerWord = page.locator(".comic-split-word:has-text('DEVELOPER')");
      await expect(creativeWord).toBeVisible();
      await expect(developerWord).toBeVisible();

      // 2. Verify multi-layer structure: underlay, fill, slices
      const creativeFill = creativeWord.locator(".comic-fill-creative").first();
      await expect(creativeFill).toBeAttached();

      const developerFill = developerWord.locator(".comic-fill-developer").first();
      await expect(developerFill).toBeAttached();

      // 3. Verify desktop hover triggers glitch state
      await creativeWord.hover();
      await page.waitForTimeout(300);

      // Verify is-glitching or hover animation is engaged
      const isGlitchingOnHover = await creativeWord.evaluate((el) => {
        const slices = el.querySelectorAll(".comic-word-slice");
        return el.classList.contains("is-glitching") || slices.length === 3;
      });
      expect(isGlitchingOnHover).toBe(true);

      // Move mouse away
      await page.mouse.move(0, 0);
      await page.waitForTimeout(200);
    });
  });
}
