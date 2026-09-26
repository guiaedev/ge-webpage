// Resolve generated bundles against each page's base (root or ../).
import {readFile,writeFile,readdir} from 'node:fs/promises';
async function rewrite(dir){
 for(const item of await readdir(dir,{withFileTypes:true})){
  const path=new URL(item.name+(item.isDirectory()?'/':''),dir);
  if(item.isDirectory()) await rewrite(path);
  else if(item.name.endsWith('.html')){
   const html=await readFile(path,'utf8');
   await writeFile(path,html.replaceAll('="/_astro/','="./_astro/'));
  }
 }
}
await rewrite(new URL('../dist/',import.meta.url));
