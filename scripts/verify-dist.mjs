// Post-build check: every page exists and every local file a page references is in dist/.
// Fails the pipeline before anything is deployed.
import {readFile, readdir, stat} from 'node:fs/promises';
import {join, dirname, relative} from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const requiredPages = ['index.html', 'nosotras/index.html'];
const errors = [];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, {withFileTypes: true})) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(path));
    else out.push(path);
  }
  return out;
}
const exists = path => stat(path).then(() => true, () => false);

for (const page of requiredPages) if (!await exists(join(dist, page))) errors.push(`missing page ${page}`);

const pages = (await walk(dist)).filter(file => file.endsWith('.html'));
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const page = relative(dist, file);
  if (html.includes('="/_astro/')) errors.push(`${page}: absolute /_astro/ path (portable.mjs did not run)`);
  // Pages may set <base href="../">; local references resolve against it.
  const base = html.match(/<base href="([^"]+)"/)?.[1] ?? '';
  const body = html.replace(/<base [^>]*>/, '');
  const refs = [...body.matchAll(/(?:src|href|srcset)="([^"]+)"/g)].flatMap(match => match[1].split(',').map(part => part.trim().split(/\s+/)[0]));
  for (const ref of new Set(refs)) {
    if (!ref || /^(https?:|mailto:|tel:|#|data:)/.test(ref)) continue;
    const clean = ref.split(/[?#]/)[0];
    if (!clean) continue;
    const target = join(dirname(file), base, clean);
    const resolved = clean.endsWith('/') ? join(target, 'index.html') : target;
    if (!await exists(resolved)) errors.push(`${page}: broken reference ${ref}`);
  }
}

if (errors.length) {
  console.error(`dist check failed (${errors.length}):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`dist check passed: ${pages.length} pages, all local references resolve.`);
