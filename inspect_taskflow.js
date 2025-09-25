const { chromium } = require('playwright');

async function inspectTaskFlow() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Wait a moment for any dynamic content to load
    await page.waitForTimeout(2000);

    console.log('Taking initial screenshot...');
    await page.screenshot({
      path: '/home/training/claude-code-subagents/taskflow_initial.png',
      fullPage: true
    });

    console.log('Getting page title and URL...');
    const title = await page.title();
    const url = page.url();
    console.log(`Page title: ${title}`);
    console.log(`Current URL: ${url}`);

    // Get all interactive elements
    console.log('Analyzing interactive elements...');
    const buttons = await page.$$eval('button', elements =>
      elements.map(el => ({
        text: el.textContent?.trim() || '',
        className: el.className,
        id: el.id,
        type: el.type,
        disabled: el.disabled
      }))
    );

    const links = await page.$$eval('a', elements =>
      elements.map(el => ({
        text: el.textContent?.trim() || '',
        href: el.href,
        className: el.className,
        id: el.id
      }))
    );

    const inputs = await page.$$eval('input', elements =>
      elements.map(el => ({
        type: el.type,
        placeholder: el.placeholder || '',
        className: el.className,
        id: el.id,
        name: el.name
      }))
    );

    const forms = await page.$$eval('form', elements =>
      elements.map(el => ({
        action: el.action,
        method: el.method,
        className: el.className,
        id: el.id
      }))
    );

    // Get navigation elements
    const navElements = await page.$$eval('nav, header, [role="navigation"]', elements =>
      elements.map(el => ({
        tagName: el.tagName.toLowerCase(),
        className: el.className,
        id: el.id,
        text: el.textContent?.trim().substring(0, 200) || ''
      }))
    );

    // Get all headings for structure analysis
    const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', elements =>
      elements.map(el => ({
        level: el.tagName.toLowerCase(),
        text: el.textContent?.trim() || '',
        className: el.className,
        id: el.id
      }))
    );

    // Get main content areas
    const mainAreas = await page.$$eval('main, section, article, aside', elements =>
      elements.map(el => ({
        tagName: el.tagName.toLowerCase(),
        className: el.className,
        id: el.id,
        text: el.textContent?.trim().substring(0, 100) || ''
      }))
    );

    console.log('=== ANALYSIS RESULTS ===');
    console.log('Buttons found:', buttons.length);
    console.log('Links found:', links.length);
    console.log('Input fields found:', inputs.length);
    console.log('Forms found:', forms.length);
    console.log('Navigation elements found:', navElements.length);
    console.log('Headings found:', headings.length);
    console.log('Main content areas found:', mainAreas.length);

    // Write detailed analysis to file
    const analysis = {
      pageInfo: { title, url },
      buttons,
      links,
      inputs,
      forms,
      navigation: navElements,
      headings,
      mainAreas,
      timestamp: new Date().toISOString()
    };

    require('fs').writeFileSync(
      '/home/training/claude-code-subagents/taskflow_analysis.json',
      JSON.stringify(analysis, null, 2)
    );

    console.log('Analysis complete! Screenshot and data saved.');

  } catch (error) {
    console.error('Error during inspection:', error);
  } finally {
    await browser.close();
  }
}

inspectTaskFlow();