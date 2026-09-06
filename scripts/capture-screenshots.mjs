/**
 * Capture live GitHub Pages UI shots for README / portfolio cards.
 * Usage: node scripts/capture-screenshots.mjs
 */
import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const BASE_URL =
  process.env.AQA_BASE_URL ?? 'https://mangeshraut712.github.io/alpha-quant-academy/'
const OUT_DIR = process.env.AQA_SCREENSHOT_DIR
  ? resolve(process.env.AQA_SCREENSHOT_DIR)
  : resolve(ROOT, 'docs/screenshots')

async function waitForAppReady(page) {
  await page.waitForLoadState('networkidle')
  await page.waitForSelector('#home', { timeout: 30_000 })
  await page.waitForTimeout(1200)
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
  })
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: 'light',
  })
  await page.emulateMedia({ reducedMotion: 'reduce' })

  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 })
  await waitForAppReady(page)

  const homePath = resolve(OUT_DIR, '01-home.png')
  await page.screenshot({ path: homePath, type: 'png' })
  console.log(`Wrote ${homePath}`)

  await page.getByRole('button', { name: 'Curriculum', exact: true }).click()
  await page.waitForTimeout(1000)
  await page.evaluate(() => {
    const el = document.getElementById('curriculum')
    if (!el) return
    const navOffset = 80
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset
    window.scrollTo(0, top)
  })
  await page.waitForTimeout(600)

  const featurePath = resolve(OUT_DIR, '02-feature.png')
  await page.screenshot({ path: featurePath, type: 'png' })
  console.log(`Wrote ${featurePath}`)

  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
