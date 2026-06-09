#!/usr/bin/env node
// One-off PNG/JPEG re-encoder. Keeps filenames so markdown references stay
// valid. Re-runnable but only rewrites a file when the new bytes are smaller.
import { readdir, stat, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const TARGET_DIR = process.argv[2] ?? 'public/images';
const MIN_BYTES = 150 * 1024; // skip anything already small enough

const optimizers = {
  '.png':  (buf) => sharp(buf).png({ quality: 80, compressionLevel: 9, palette: true, effort: 10 }).toBuffer(),
  '.jpeg': (buf) => sharp(buf).jpeg({ quality: 78, mozjpeg: true, progressive: true }).toBuffer(),
  '.jpg':  (buf) => sharp(buf).jpeg({ quality: 78, mozjpeg: true, progressive: true }).toBuffer(),
};

const files = await readdir(TARGET_DIR);
let savedBytes = 0;
for (const name of files) {
  const ext = extname(name).toLowerCase();
  const opt = optimizers[ext];
  if (!opt) continue;
  const path = join(TARGET_DIR, name);
  const { size } = await stat(path);
  if (size < MIN_BYTES) continue;
  const buf = await readFile(path);
  const out = await opt(buf);
  if (out.length < size) {
    await writeFile(path, out);
    const delta = size - out.length;
    savedBytes += delta;
    console.log(`${name}: ${(size / 1024).toFixed(0)}KB → ${(out.length / 1024).toFixed(0)}KB (-${(delta / 1024).toFixed(0)}KB)`);
  } else {
    console.log(`${name}: skipped (no gain)`);
  }
}
console.log(`\nTotal saved: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);
