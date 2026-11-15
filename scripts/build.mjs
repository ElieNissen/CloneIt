import { readFile, mkdir, writeFile, readdir, rm } from "node:fs/promises";
import path from "node:path";

await rm("dist", { recursive: true, force: true });
const assets = {};
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".webmanifest": "application/manifest+json" };
async function add(file, target = `/${file}`) {
  assets[target] = { data: (await readFile(file)).toString("base64"), type: types[path.extname(file)] || "application/octet-stream" };
}
for (const file of ["index.html", "setup.html", "sw.js", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png", "apple-touch-icon.png"]) await add(file);
for (const file of ["app.js", "setup.js", "library.js", "sharing.js", "game-rules.js", "styles.css"]) await add(`src/${file}`);
for (const file of await readdir("public/cards")) await add(`public/cards/${file}`, `/cards/${file}`);
const rules = await readFile("src/game-rules.js", "utf8");
const setup = await readFile("worker/setup.mjs", "utf8");
const handler = (await readFile("worker/index.mjs", "utf8")).replace(/^import .+;\n/gm, "").replace("export default createWorker();", `export default createWorker(${JSON.stringify(assets)});`);
await mkdir("dist/server", { recursive: true });
await writeFile("dist/server/index.js", `${rules}\n${setup}\n${handler}`);
await mkdir("dist/.openai", { recursive: true });
await writeFile("dist/.openai/hosting.json", await readFile(".openai/hosting.json"));
console.log(`Built Worker with ${Object.keys(assets).length} embedded assets.`);
