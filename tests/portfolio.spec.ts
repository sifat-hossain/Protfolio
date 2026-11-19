import { expect, test } from '@playwright/test'

test('profile renders without browser errors or horizontal overflow', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page).toHaveTitle('MD. Sifat Hossain | Software Engineer')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('MD. Sifat Hossain.')
  await expect(page.locator('.hero-greeting')).toHaveText("Hi, I'm")
  await expect(page.locator('.hero-intro')).toHaveText('Software Engineer')
  await expect(page.getByRole('link', { name: 'View my projects' })).toHaveAttribute('href', '#work')
  await expect(page.getByRole('link', { name: 'Get in touch' })).toHaveAttribute('href', '#contact')
  await expect(page.locator('.project-card')).toHaveCount(5)
  await expect(page.locator('.timeline-item')).toHaveCount(4)
  for (const width of [320, 390, 640, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `Overflow at ${width}px`).toBe(true)
    expect(await page.locator('.hero-name').evaluate((heading) => heading.scrollWidth <= heading.clientWidth), `Name clipping at ${width}px`).toBe(true)
  }
  expect(errors).toEqual([])
})

test('project filters and expandable descriptions work', async ({ page }) => {
  await page.goto('/#work')
  await page.getByRole('button', { name: 'Backend & cloud' }).click()
  await expect(page.locator('.project-card')).toHaveCount(2)
  await page.getByRole('button', { name: 'Enterprise apps' }).click()
  await expect(page.locator('.project-card')).toHaveCount(3)
  const erp = page.locator('.project-card').filter({ has: page.getByRole('heading', { name: 'GDN ERP', exact: true }) })
  await erp.locator('summary').click()
  await expect(erp.getByText('Accounting and financial management software developed at Golden Infotech.')).toBeVisible()
  await erp.locator('summary').click()
  await expect(erp.getByText('Accounting and financial management software developed at Golden Infotech.')).toBeHidden()
  await page.getByRole('button', { name: 'All projects' }).click()
  await expect(page.locator('.project-card')).toHaveCount(5)
  const xcalibur = page.locator('.project-card').filter({ has: page.getByRole('heading', { name: 'Xcalibur Connect', exact: true }) })
  await expect(xcalibur.locator('.tags')).toContainText('Azure App Service')
  await expect(xcalibur.locator('.tags')).toContainText('Azure Pipelines (CI/CD)')
  await expect(xcalibur.locator('.tags')).toContainText('Azure Service Bus')
  await xcalibur.locator('summary').click()
  await expect(xcalibur.locator('.project-details')).toContainText('Azure Service Bus queues, topics and subscriptions')
  const ital = page.locator('.project-card').filter({ has: page.getByRole('heading', { name: 'ITAL', exact: true }) })
  await expect(ital.locator('.project-body > p')).toContainText('Revenue protection and penalty notices')
  await ital.locator('summary').click()
  await expect(ital.locator('.project-details')).toContainText('government and private train, tram, and bus operators')
  await expect(ital.locator('.project-details')).toContainText('offline notice issuance and postcode validation')
  await expect(ital.locator('.project-details')).toContainText('I contributed as a .NET developer')
  await expect(ital).not.toContainText('fare calculation')
  await expect(page.getByText(/React \(learning\)/)).toBeVisible()
})

test('project text stays readable without clipping at responsive widths', async ({ page }) => {
  await page.goto('/#work')
  await page.locator('.project-details').evaluateAll((details) => {
    details.forEach((detail) => detail.setAttribute('open', ''))
  })
  for (const width of [320, 390, 640, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    const violations = await page.locator('.work-section').evaluate((section) => {
      const minimumSizes = [
        ['.project-body h3', 22],
        ['.project-body > p, .project-details > div', 16],
        ['.project-filters button, .project-details summary', 14],
        ['.tags > span, .project-type, .work-note', 12],
      ] as const
      return minimumSizes.flatMap(([selector, minimum]) =>
        Array.from(section.querySelectorAll<HTMLElement>(selector)).flatMap((element) => {
          const errors = []
          if (parseFloat(getComputedStyle(element).fontSize) < minimum) errors.push(`Small text: ${element.textContent}`)
          if (element.scrollWidth > element.clientWidth) errors.push(`Clipped text: ${element.textContent}`)
          return errors
        }),
      )
    })
    expect(violations, `Project readability at ${width}px`).toEqual([])
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
})

test('navigation works and mobile menu closes on selection and Escape', async ({ page }, testInfo) => {
  await page.goto('/')
  const mobile = testInfo.project.name === 'mobile'
  if (mobile) {
    await page.getByRole('button', { name: 'Open menu' }).click()
    await expect(page.getByRole('navigation')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('navigation')).toBeHidden()
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()
    await page.getByRole('button', { name: 'Open menu' }).click()
  }
  await page.getByRole('navigation').getByRole('link', { name: 'Contact', exact: true }).click()
  await expect(page).toHaveURL(/#contact$/)
  await expect(page.getByRole('heading', { name: 'Have something worth building?' })).toBeInViewport()
  if (mobile) await expect(page.getByRole('navigation')).toBeHidden()
  await page.getByRole('link', { name: 'Back to top' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toBeInViewport()
})

test('CV download is a real PDF and social/contact links use the profile details', async ({ page, request }) => {
  await page.goto('/')
  const response = await request.get('/MD-Sifat-Hossain-CV.pdf')
  expect(response.ok()).toBe(true)
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-')
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('link', { name: 'Resume', exact: true }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toBe('MD-Sifat-Hossain-CV.pdf')
  await expect(page.getByRole('link', { name: 'Say hello' })).toHaveAttribute('href', 'mailto:sifat.hossain3152@gmail.com')
  await expect(page.getByRole('link', { name: 'sifat.hossain3152@gmail.com', exact: true })).toHaveAttribute('href', 'mailto:sifat.hossain3152@gmail.com')
  await expect(page.getByRole('link', { name: 'GitHub (opens in new tab)', exact: true }).first()).toHaveAttribute('href', 'https://github.com/sifat-hossain')
  await expect(page.getByRole('link', { name: 'LinkedIn (opens in new tab)', exact: true }).first()).toHaveAttribute('href', 'https://www.linkedin.com/in/md-sifat-hossain-a8b534211/')
})

test('copy email reports success and clipboard failures honestly', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (text: string) => {
      document.documentElement.dataset.copiedEmail = text
    } } })
  })
  await page.getByRole('button', { name: 'Copy email address' }).click()
  await expect(page.getByRole('status')).toHaveText('Email address copied.')
  expect(await page.locator('html').getAttribute('data-copied-email')).toBe('sifat.hossain3152@gmail.com')
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => {
      throw new Error('Clipboard unavailable')
    } } })
  })
  await page.getByRole('button', { name: 'Copy email address' }).click()
  await expect(page.getByRole('status')).toContainText("Couldn't copy automatically.")
})
