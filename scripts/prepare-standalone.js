const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const copies = [
  [path.join(root, ".next", "static"), path.join(root, ".next", "standalone", ".next", "static")],
  [path.join(root, "public"), path.join(root, ".next", "standalone", "public")],
];

for (const [source, destination] of copies) {
  if (!fs.existsSync(source)) {
    throw new Error(`Required build output is missing: ${source}`);
  }

  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.cpSync(source, destination, { recursive: true, force: true });
}
