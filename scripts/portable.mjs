// Relative asset URLs let the exported homepage work from a folder as well as a host.
import {readFile,writeFile} from 'node:fs/promises';
const file=new URL('../dist/index.html',import.meta.url);
const html=await readFile(file,'utf8');
await writeFile(file,html.replaceAll('="/_astro/','="./_astro/'));
