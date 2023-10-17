const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "js_files");
const targetDir = path.join(__dirname, "dist");

const copyFiles = (source, target) => {
  fs.readdirSync(source).forEach((file) => {
    const sourceFile = path.join(source, file);
    const targetFile = path.join(target, file);
    fs.copyFileSync(sourceFile, targetFile);
  });
};

copyFiles(sourceDir, targetDir);
