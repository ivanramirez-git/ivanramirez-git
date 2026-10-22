// Genera las variantes responsivas (AVIF + WebP) de la foto y de las capturas de proyectos.
// Se ejecuta a mano (npm run imagenes) cuando cambian las imágenes; el resultado se versiona en site/img.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { PROYECTOS } from '../site/datos.mjs';

const OUT = fileURLToPath(new URL('../site/img/', import.meta.url));
await mkdir(OUT + 'proyectos', { recursive: true });

for (const w of [240, 360, 480, 640]) {
  const base = sharp('site/fuentes/foto-ivan.jpg').resize(w, w);
  await base.clone().avif({ quality: 52, effort: 6 }).toFile(`${OUT}foto-ivan-${w}.avif`);
  await base.clone().webp({ quality: 74 }).toFile(`${OUT}foto-ivan-${w}.webp`);
}

for (const p of PROYECTOS) {
  const src = `public/images/projects/${p.img}`;
  const meta = await sharp(src).metadata();
  // Las capturas de página completa son muy altas: se recorta la parte superior a 16:10.
  const h = Math.min(meta.height, Math.round(meta.width * 10 / 16));
  const recorte = sharp(src).extract({ left: 0, top: 0, width: meta.width, height: h });
  for (const w of [480, 640, 960, 1440]) {
    if (w > meta.width && w !== 480) continue;
    const r = recorte.clone().resize(Math.min(w, meta.width));
    await r.clone().avif({ quality: 50, effort: 6 }).toFile(`${OUT}proyectos/${p.slug}-${w}.avif`);
    await r.clone().webp({ quality: 72 }).toFile(`${OUT}proyectos/${p.slug}-${w}.webp`);
  }
  console.log(p.slug, meta.width + 'x' + meta.height, '→ 16:10');
}
