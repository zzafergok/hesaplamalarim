import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const appDir = join(process.cwd(), 'src/app');

function walkPages(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);

    if (entry.isDirectory()) return walkPages(path);
    if (entry.isFile() && entry.name === 'page.tsx') return [path];
    return [];
  });
}

const missingMetadata = walkPages(appDir).filter((file) => {
  const source = readFileSync(file, 'utf8');
  return !/\b(generateMetadata|metadata)\b/.test(source);
});

if (missingMetadata.length > 0) {
  console.error('Missing route metadata exports:');
  for (const file of missingMetadata) {
    console.error(`- ${relative(process.cwd(), file)}`);
  }
  console.error(
    'Add `export const generateMetadata = createStaticMetadata(...)` or `createDynamicMetadata(...)`.',
  );
  process.exit(1);
}

console.log('All app routes expose metadata.');
