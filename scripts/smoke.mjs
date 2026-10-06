// Post-deploy smoke test against the live URL: pages answer 200 and carry the key pieces.
// Usage: node scripts/smoke.mjs https://example.netlify.app
const base = (process.argv[2] || '').replace(/\/$/, '');
if (!base) { console.error('usage: node scripts/smoke.mjs <url>'); process.exit(2); }

const checks = [
  {path: '/', expect: ['<h1', 'id="booking-dialog"', 'cal.com/']},
  {path: '/nosotras/', expect: ['<h1', 'id="booking-dialog"']},
];
const errors = [];
for (const {path, expect} of checks) {
  let response;
  for (let attempt = 1; attempt <= 3; attempt++) {
    response = await fetch(base + path, {redirect: 'follow'}).catch(error => ({ok: false, status: String(error)}));
    if (response.ok) break;
    await new Promise(resolve => setTimeout(resolve, 3000 * attempt));
  }
  if (!response.ok) { errors.push(`${path}: HTTP ${response.status}`); continue; }
  const html = await response.text();
  for (const needle of expect) if (!html.includes(needle)) errors.push(`${path}: missing ${needle}`);
}
if (errors.length) { console.error(`smoke test failed on ${base}:\n- ${errors.join('\n- ')}`); process.exit(1); }
console.log(`smoke test passed on ${base}`);
