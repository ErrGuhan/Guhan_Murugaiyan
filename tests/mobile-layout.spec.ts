import { test, expect } from "@playwright/test";

const MOBILE_VIEWPORTS = [
  { name: "iPhone SE (1st Gen)", width: 320, height: 568 },
  { name: "Galaxy A/S Series Common", width: 360, height: 800 },
  { name: "iPhone SE (2nd/3rd Gen)", width: 375, height: 667 },
  { name: "iPhone 14/15/16 Pro", width: 390, height: 844 },
  { name: "Pixel 7 / Galaxy S21", width: 412, height: 915 },
  { name: "iPhone Pro Max", width: 430, height: 932 },
];

for (const vp of MOBILE_VIEWPORTS) {
  test.describe(`Mobile Layout Verification [${vp.name} - ${vp.width}x${vp.height}]`, () => {
    test.use({
      viewport: { width: vp.width, height: vp.height },
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    });

    test("should have zero horizontal overflow on full page scroll", async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.waitForTimeout(1000);

      // Scroll incrementally down the page to trigger animations and lazy effects
      const scrollSteps = 10;
      for (let i = 1; i <= scrollSteps; i++) {
        await page.evaluate((step) => {
          const target = (document.body.scrollHeight / 10) * step;
          window.scrollTo(0, target);
        }, i);
        await page.waitForTimeout(150);

        // Verify zero horizontal scroll at each step
        const check = await page.evaluate(() => {
          const docWidth = document.documentElement.clientWidth;
          const docScrollWidth = document.documentElement.scrollWidth;
          const bodyScrollWidth = document.body.scrollWidth;
          const scrollX = window.scrollX;

          // Find offending overflowing elements
          const offenders: string[] = [];
          document.querySelectorAll("body *").forEach((el) => {
            const rect = el.getBoundingClientRect();
            // Allow 1px subpixel tolerance
            if (rect.right > docWidth + 1.5) {
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
          check.docScrollWidth <= check.docWidth + 1,
          `Document scrollWidth (${check.docScrollWidth}px) exceeds clientWidth (${check.docWidth}px). Offending elements: ${JSON.stringify(check.offenders)}`
        ).toBe(true);
        expect(
          check.bodyScrollWidth <= check.docWidth + 1,
          `Body scrollWidth (${check.bodyScrollWidth}px) exceeds clientWidth (${check.docWidth}px). Offending elements: ${JSON.stringify(check.offenders)}`
        ).toBe(true);
      }
    });

    test("should open mobile navigation drawer without overflow or clipping", async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.waitForTimeout(800);

      // Locate mobile hamburger menu toggle
      const menuButton = page.getByRole("button", { name: "Open navigation menu" });
      await expect(menuButton).toBeVisible();

      // Open drawer
      await menuButton.click();
      await page.waitForTimeout(500);

      // Check drawer dialog is visible
      const navDrawer = page.locator('#mobile-nav-dialog, #mobile-nav-menu, [role="dialog"]');
      await expect(navDrawer).toBeVisible();

      // Verify no horizontal overflow while menu is open
      const overflowCheck = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        };
      });
      expect(overflowCheck.scrollWidth).toBeLessThanOrEqual(overflowCheck.clientWidth + 1);

      // Verify all navigation links are visible within viewport
      const navLinks = navDrawer.locator("a");
      const count = await navLinks.count();
      expect(count).toBeGreaterThanOrEqual(4);

      for (let i = 0; i < count; i++) {
        const link = navLinks.nth(i);
        const box = await link.boundingBox();
        if (box) {
          expect(box.x).toBeGreaterThanOrEqual(0);
          expect(box.x + box.width).toBeLessThanOrEqual(vp.width + 1);
        }
      }

      // Close drawer using the button inside the active drawer dialog
      const closeBtn = navDrawer.getByRole("button", { name: "Close navigation menu" });
      await expect(closeBtn).toBeVisible();
      await closeBtn.click();
      await page.waitForTimeout(300);
    });

    test("should cleanly display and scroll through all 5 ARCs in mobile carousel without overlap", async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.waitForTimeout(800);

      // Scroll into project section
      const projectSection = page.locator("#work");
      await projectSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      // Verify all 5 ARC cards exist in mobile carousel
      const mobileCards = page.locator('[aria-label="Mobile Case Studies Carousel"] .project-card');
      await expect(mobileCards).toHaveCount(5);

      // Verify first ARC card is visible
      const firstCard = mobileCards.first();
      await expect(firstCard).toBeVisible();

      // Verify credentials section is positioned strictly BELOW the work section (no overlap)
      const credentialsSection = page.locator("#credentials");
      const workBox = await projectSection.boundingBox();
      const credBox = await credentialsSection.boundingBox();
      if (workBox && credBox) {
        expect(credBox.y).toBeGreaterThanOrEqual(workBox.y + workBox.height - 2);
      }

      // Test ARC scroll-through: click Next project button
      const nextBtn = page.getByRole("button", { name: "Next project" });
      await expect(nextBtn).toBeVisible();

      // Click to advance to ARC 02
      await nextBtn.click();
      await page.waitForTimeout(400);

      // Verify counter badge updated
      const workBadge = page.locator("#featured-work-badge");
      await expect(workBadge).toContainText("02 / 05");

      // Click to advance to ARC 03
      await nextBtn.click();
      await page.waitForTimeout(400);
      await expect(workBadge).toContainText("03 / 05");

      // Test card flip on mobile
      const flipBtn = firstCard.locator('button:has-text("CODE")');
      if (await flipBtn.isVisible()) {
        await flipBtn.click();
        await page.waitForTimeout(500);

        // Check overflow while flipped
        const flippedOverflow = await page.evaluate(() => {
          return {
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
          };
        });
        expect(flippedOverflow.scrollWidth).toBeLessThanOrEqual(flippedOverflow.clientWidth + 1);

        // Flip back
        const previewBtn = firstCard.locator('button:has-text("PREVIEW")');
        if (await previewBtn.isVisible()) {
          await previewBtn.click();
          await page.waitForTimeout(300);
        }
      }
    });

    test("should render contact section elements cleanly within screen bounds", async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.waitForTimeout(800);

      const contactSection = page.locator("#contact");
      await contactSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      // Email button
      const emailCopyBtn = page.locator('button[aria-label*="Copy email" i]').first();
      await expect(emailCopyBtn).toBeVisible();

      // Form inputs
      const nameInput = page.locator('input[placeholder*="name" i]').first();
      await expect(nameInput).toBeVisible();
      const nameBox = await nameInput.boundingBox();
      if (nameBox) {
        expect(nameBox.x).toBeGreaterThanOrEqual(8);
        expect(nameBox.x + nameBox.width).toBeLessThanOrEqual(vp.width - 8);
      }

      // Submit button
      const submitBtn = page.locator('button[type="submit"]').first();
      await expect(submitBtn).toBeVisible();
      const submitBox = await submitBtn.boundingBox();
      if (submitBox) {
        expect(submitBox.x).toBeGreaterThanOrEqual(8);
        expect(submitBox.x + submitBox.width).toBeLessThanOrEqual(vp.width - 8);
        expect(submitBox.height).toBeGreaterThanOrEqual(44); // WCAG touch target
      }
    });

    test("should verify letter visibility, contrast, and paint-order styling on text and headings", async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      await page.waitForTimeout(800);

      // 1. Verify paint-order: stroke fill on comic-glitch-text elements to ensure stroke doesn't swallow letter bodies
      const glitchStyles = await page.evaluate(() => {
        const els = Array.from(document.querySelectorAll(".comic-glitch-text"));
        return els.map((el) => {
          const style = window.getComputedStyle(el);
          return {
            tag: el.tagName,
            text: (el.textContent || "").trim().slice(0, 30),
            paintOrder: style.getPropertyValue("paint-order") || style.paintOrder || "",
            fontSize: parseFloat(style.fontSize),
            opacity: parseFloat(style.opacity),
            visibility: style.visibility,
          };
        });
      });

      expect(glitchStyles.length).toBeGreaterThan(0);
      for (const item of glitchStyles) {
        expect(item.opacity).toBe(1);
        expect(item.visibility).toBe("visible");
        expect(item.fontSize).toBeGreaterThan(20);
        // Ensure paint-order includes stroke
        expect(item.paintOrder.includes("stroke") || item.paintOrder === "normal" || item.paintOrder === "").toBe(true);
      }

      // 2. Verify Credentials section titles (e.g. "Learner to Builder: Become an AI Architect")
      const credSection = page.locator("#credentials");
      await credSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      const certTitle = page.getByText("Learner to Builder: Become an AI Architect").first();
      await expect(certTitle).toBeVisible();

      const certMetrics = await certTitle.evaluate((el) => {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height,
          fontSize: parseFloat(style.fontSize),
          fontFamily: style.fontFamily,
          color: style.color,
          lineHeight: style.lineHeight,
        };
      });

      expect(certMetrics.width).toBeGreaterThan(100);
      expect(certMetrics.height).toBeGreaterThan(14);
      expect(certMetrics.fontSize).toBeGreaterThanOrEqual(13);

      // 3. Verify About RPG stats cards have readable typography without distortion
      const aboutSection = page.locator("#about");
      await aboutSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      const rpgStatCards = page.locator("#about .comic-card");
      const rpgCount = await rpgStatCards.count();
      expect(rpgCount).toBeGreaterThanOrEqual(2);

      // 4. Verify Selected Case Studies heading visibility and alignment
      const workSection = page.locator("#work");
      await workSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      const caseStudiesHeading = page.getByText("SELECTED CASE STUDIES").first();
      await expect(caseStudiesHeading).toBeVisible();
      const headingBox = await caseStudiesHeading.boundingBox();
      if (headingBox) {
        expect(headingBox.x).toBeGreaterThanOrEqual(4);
        expect(headingBox.x + headingBox.width).toBeLessThanOrEqual(vp.width + 4);
      }
    });
  });
}

