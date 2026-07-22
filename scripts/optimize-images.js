const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const pub = (f) => path.join(__dirname, "..", "public", f);
const size = (f) => (fs.statSync(f).size / 1024).toFixed(0) + "KB";

async function run() {
  const jobs = [
    // Producto (tiene transparencia, se queda en PNG, solo recompresión)
    {
      in: pub("mascarilla.png"),
      out: pub("mascarilla-opt.png"),
      fn: (img) => img.png({ quality: 90, effort: 10, palette: true }),
    },
    {
      in: pub("mascarilla1.png"),
      out: pub("mascarilla1-opt.png"),
      fn: (img) => img.png({ quality: 90, effort: 10, palette: true }),
    },
    // Foto de testimonio: se reduce a tamaño real de uso (avatar) — sin transparencia forzada, mantiene alpha
    {
      in: pub("retratomujer.png"),
      out: pub("retratomujer-opt.png"),
      fn: (img) => img.resize(320, 320, { fit: "cover" }).png({ compressionLevel: 9 }),
    },
    // Fondo del Hero: foto sin transparencia -> JPEG de alta calidad
    {
      in: pub("radiancelife.png"),
      out: pub("radiancelife-opt.jpg"),
      fn: (img) => img.jpeg({ quality: 82, mozjpeg: true }),
    },
    // Antes/Después: fotos sin transparencia -> JPEG
    {
      in: pub("antes.png"),
      out: pub("antes-opt.jpg"),
      fn: (img) => img.jpeg({ quality: 84, mozjpeg: true }),
    },
    {
      in: pub("despues.png"),
      out: pub("despues-opt.jpg"),
      fn: (img) => img.jpeg({ quality: 84, mozjpeg: true }),
    },
  ];

  for (const job of jobs) {
    const before = size(job.in);
    await job.fn(sharp(job.in)).toFile(job.out);
    const after = size(job.out);
    console.log(`${path.basename(job.in)} (${before}) -> ${path.basename(job.out)} (${after})`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
